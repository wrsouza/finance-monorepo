import { UserEntity } from '@app/shared/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { sign, verify } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { ValidateResponseDto } from './dto/validate-response.dto';

interface IPayload {
  email: string;
  sub: string;
}

@Injectable()
export class JwtService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

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

  sign(payload: IPayload): string {
    return sign(payload, this.configService.get<string>('JWT_SECRET'), {
      expiresIn: this.configService.get<string>('JWT_EXPIRES'),
    });
  }

  async validate(data: {
    id: string;
    email: string;
  }): Promise<ValidateResponseDto> {
    const user = await this.repository.findOneBy(data);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return new ValidateResponseDto(user);
  }
}
