import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UserImages } from '../users/entities/user-images.entity';
import { UsersService } from '../users/users.service';

export interface IDataloaders {
  userImagesLoader;
}

declare global {
  interface IGraphQLContext {
    loaders: IDataloaders;
  }
}

@Injectable()
export class DataloaderService {
  constructor(private readonly userService: UsersService) {}

  createLoaders(): IDataloaders {
    const userImagesLoader = new DataLoader(async (ids) => {
      try {
        const images = await this.userService.getUsersImages(ids);
        return ids.map((id) =>
          images.filter((image) => image.dataValues.UserID === id),
        );
      } catch (error) {
        throw error;
      }
    });

    return {
      userImagesLoader,
    };
  }
}
