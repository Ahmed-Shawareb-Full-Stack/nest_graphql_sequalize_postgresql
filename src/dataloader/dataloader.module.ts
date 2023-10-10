import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [DataloaderService],
  imports: [UsersModule],
  exports: [DataloaderService],
})
export class DataloaderModule {}
