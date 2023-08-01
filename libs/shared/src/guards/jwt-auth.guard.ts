import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'apps/api/src/app/usecases/auth/auth.service';
import { ValidateResponseDto } from 'apps/api/src/app/usecases/auth/dto';
import { verify } from 'jsonwebtoken';

interface PayloadInterface {
  sub: string;
  email: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly service: AuthService,
  ) {}

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const prefix = 'Bearer ';
    const accessToken = request.get('Authorization');
    if (!accessToken || !accessToken.includes(prefix)) {
      return false;
    }

    const payload = this.verifyToken(accessToken);
    if (!payload.sub || !payload.email) {
      return false;
    }

    const user = await this.validateUser(payload);
    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }

  verifyToken(accessToken: string): PayloadInterface {
    try {
      return verify(
        accessToken.split(' ')[1],
        this.configService.get<string>('JWT_SECRET'),
      ) as PayloadInterface;
    } catch (err) {
      return { sub: null, email: null };
    }
  }

  validateUser(payload: PayloadInterface): Promise<ValidateResponseDto> {
    return this.service.validate({
      id: payload.sub,
      email: payload.email,
    });
  }
}
