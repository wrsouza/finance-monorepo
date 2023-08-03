import { JwtModule, UserEntity } from '@app/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserRepository } from '../../repositories/user.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule],
  controllers: [AuthController],
  providers: [UserRepository, AuthService],
})
export class AuthModule {}
