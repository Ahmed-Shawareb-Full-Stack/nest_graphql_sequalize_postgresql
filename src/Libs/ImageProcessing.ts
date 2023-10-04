import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageProcessing {
  async processImage(
    fileStream: NodeJS.ReadableStream,
    fileDestination: string,
    sharpOptions: sharp.ResizeOptions,
  ) {
    const operation = await new Promise((resolve, reject) => {
      fileStream
        .pipe(sharp().toFormat('webp'))
        .resize(sharpOptions)
        .flatten(false)
        .webp({ quality: 5, force: true })
        .toFile(fileDestination, (error, info) => {
          if (error) reject('error');
          resolve('done');
        });
    });

    return operation;
  }
}
