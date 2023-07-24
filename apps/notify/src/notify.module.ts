import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';

@Module({
  imports: [],
  controllers: [NotifyController],
  providers: [NotifyService],
})
export class NotifyModule {}
