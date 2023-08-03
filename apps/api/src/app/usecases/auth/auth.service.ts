import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto, LoginResponseDto } from './dto';
import { UserRepository } from '../../repositories';
import { Encrypt } from '@app/shared';
import { JwtService } from '@app/shared/providers/jwt/jwt.service';

const DEFAULT_VALIDATION_MESSAGE = 'email or password invalid';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async doLogin(data: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = data;

    const user = await this.repository.findOne({ email });
    if (!user) {
      throw new BadRequestException(DEFAULT_VALIDATION_MESSAGE);
    }

    if (!Encrypt.compare(password, user.password)) {
      throw new BadRequestException(DEFAULT_VALIDATION_MESSAGE);
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return new LoginResponseDto({ ...user, accessToken });
  }
}
