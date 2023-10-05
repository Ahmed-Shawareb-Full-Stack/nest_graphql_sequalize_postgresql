import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { ImageProcessing } from '../Libs/ImageProcessing';
import { UserImages } from './model/user-image.model';
import { TranslateService } from '../Libs/Translate';

@Module({
  imports: [SequelizeModule.forFeature([User, UserImages])],
  providers: [UsersResolver, UsersService, ImageProcessing, TranslateService],
  exports: [SequelizeModule, UsersService],
})
export class UsersModule {}
