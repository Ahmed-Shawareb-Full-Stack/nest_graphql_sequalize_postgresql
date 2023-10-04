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
        .pipe(sharp().resize(sharpOptions))
        .toFile(fileDestination, (error, info) => {
          if (error) reject('error');
          resolve('done');
        });
    });

    return operation;
  }
}
