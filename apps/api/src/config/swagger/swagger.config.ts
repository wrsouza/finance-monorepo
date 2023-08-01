import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Finance')
  .setDescription('Finance Api')
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('Users')
  .addTag('Roles')
  .addTag('Permissions')
  .addBearerAuth()
  .build();
