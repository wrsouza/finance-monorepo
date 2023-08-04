import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '../providers/jwt/jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database';
import { Repository } from 'typeorm';
import { ValidateResponseDto } from '../dto';

interface PayloadInterface {
  sub: string;
  email: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
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

  async validateUser(payload: PayloadInterface): Promise<ValidateResponseDto> {
    const user = await this.repository.findOneBy({
      id: payload.sub,
      email: payload.email,
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return new ValidateResponseDto(user);
  }
}
