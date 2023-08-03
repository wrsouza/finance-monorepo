import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/shared';
import { JwtService } from './jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
