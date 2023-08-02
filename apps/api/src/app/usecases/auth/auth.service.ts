import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto, LoginResponseDto, ValidateResponseDto } from './dto';
import { UserRepository } from '../../repositories/user.repository';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';

const DEFAULT_VALIDATION_MESSAGE = 'email or password invalid';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async doLogin(data: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = data;
    const user = await this.repository.findOne({ email });
    if (!user) {
      throw new BadRequestException(DEFAULT_VALIDATION_MESSAGE);
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException(DEFAULT_VALIDATION_MESSAGE);
    }
    const payload = { email: user.email, sub: user.id };
    const accessToken = sign(
      payload,
      this.configService.get<string>('JWT_SECRET'),
      {
        expiresIn: this.configService.get<string>('JWT_EXPIRES'),
      },
    );
    return new LoginResponseDto({ ...user, accessToken });
  }

  async validate(data: {
    id: string;
    email: string;
  }): Promise<ValidateResponseDto> {
    const user = await this.repository.findOne(data);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return new ValidateResponseDto(user);
  }
}
