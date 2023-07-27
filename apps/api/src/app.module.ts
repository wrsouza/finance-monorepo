import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersModule } from './app/usecases/users/users.module';
import { DatabaseModule } from '@app/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        CONNECTION_TYPE: Joi.string().required(),
        CONNECTION_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
