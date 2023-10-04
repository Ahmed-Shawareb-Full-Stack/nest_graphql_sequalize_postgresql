import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import SerializeGQLInput from '../Libs/serializeGQL';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import * as Upload from 'graphql-upload/Upload.js';
import * as concat from 'concat-stream';
import * as sharp from 'sharp';
import { ImageProcessing } from '../Libs/ImageProcessing';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly imageProcess: ImageProcessing,
  ) {}
  async create(createUserInput: CreateUserInput) {
    try {
      const user = this.userModel.create(SerializeGQLInput(createUserInput));
      return user;
    } catch (error) {}
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { Email: email },
    });
    if (user) return user;
    throw new HttpException(
      `Can't find a user associated with this email`,
      HttpStatus.NOT_FOUND,
    );
  }

  async uploadUserImage(files: Promise<Upload>[]) {
    const dirPath = join('dist', '/uploads');
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
    const operation = await Promise.all(
      files.map(async (file) => {
        const { filename, createReadStream } = await file;
        const stream = createReadStream();
        const fileDestination = `dist/uploads/${filename}`;
        const sharpOptions: sharp.ResizeOptions = {
          width: 300,
          height: 300,
          fit: sharp.fit.cover,
        };
        await this.imageProcess.processImage(
          stream,
          fileDestination,
          sharpOptions,
        );
      }),
    );
    // const dirPath = join(__dirname, '/uploads');
    // console.log(dirPath);
    // if (!existsSync(dirPath)) {
    //   mkdirSync(dirPath, { recursive: true });
    // }
    // const createPromise = new Promise((resolve, reject) => {
    //   file
    //     .createReadStream()
    //     .pipe(createWriteStream(`dist/uploads/${file.filename}`))
    //     .on('finish', () => {
    //       return resolve(true);
    //     })
    //     .on('error', (error) => {
    //       reject(false);
    //     });
    // });
    return true;
  }
}
