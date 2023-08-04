import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

interface IPayload {
  email: string;
  sub: string;
}

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  verifyToken(accessToken: string): IPayload {
    try {
      return verify(
        accessToken.split(' ')[1],
        this.configService.get<string>('JWT_SECRET'),
      ) as IPayload;
    } catch (err) {
      return { sub: null, email: null };
    }
  }

  generateToken(payload: IPayload): string {
    return sign(payload, this.configService.get<string>('JWT_SECRET'), {
      expiresIn: this.configService.get<string>('JWT_EXPIRES'),
    });
  }
}
