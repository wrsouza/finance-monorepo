import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '../providers/jwt/jwt.service';
import { ValidateResponseDto } from '../providers';

interface PayloadInterface {
  sub: string;
  email: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

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

    const payload = this.jwtService.verifyToken(accessToken);
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

  validateUser(payload: PayloadInterface): Promise<ValidateResponseDto> {
    return this.jwtService.validate({
      id: payload.sub,
      email: payload.email,
    });
  }
}
