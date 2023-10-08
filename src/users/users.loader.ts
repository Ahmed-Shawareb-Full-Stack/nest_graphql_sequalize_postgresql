import { Injectable, Scope } from '@nestjs/common';
import { UsersService } from './users.service';
import * as DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ImagesLoader {
  constructor(private readonly userImagesService: UsersService) {}

  public readonly findById = new DataLoader(async (ids) => {
    try {
      const images = await this.userImagesService.getUsersImages(ids);
      return ids.map((id) =>
        images.filter((image) => image.dataValues.UserID === id),
      );
    } catch (error) {
      throw error;
    }
  });
}
