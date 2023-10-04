import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { ImageProcessing } from '../Libs/ImageProcessing';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersResolver, UsersService, ImageProcessing],
  exports: [SequelizeModule, UsersService],
})
export class UsersModule {}
