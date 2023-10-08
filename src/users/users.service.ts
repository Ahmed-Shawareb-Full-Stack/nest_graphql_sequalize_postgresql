import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import SerializeGQLInput from '../Libs/serializeGQL';
import * as path from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import * as Upload from 'graphql-upload/Upload.js';
import * as sharp from 'sharp';
import { ImageProcessing } from '../Libs/ImageProcessing';
import { UserImages } from './model/user-image.model';
import * as crypto from 'crypto';
import { TranslateService } from '../Libs/Translate';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(UserImages) private userImagesModel: typeof UserImages,
    private readonly imageProcess: ImageProcessing,
    private readonly translateService: TranslateService,
  ) {}

  async local(lang, data) {
    return this.translateService.translate('test.HELLO', lang);
  }

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

  async getUserImages(userId: string) {
    const images = await this.userImagesModel.findAll({
      where: { UserID: userId },
    });
    return images;
  }

  async addUserImage(userId: string, imageURL: string) {
    await this.userImagesModel.create({ UserID: userId, URL: imageURL });
  }

  async uploadUserImage(userId: string, files: Promise<Upload>[]) {
    const dirPath = 'dist/uploads';
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }

    const operation = await Promise.all(
      files.map(async (file) => {
        const { filename, createReadStream } = await file;
        const fileExt = path.extname(filename);
        const randomFileName = await crypto.randomUUID();
        const stream = createReadStream();
        const fileDestination = `dist/uploads/${randomFileName}.${fileExt}`;
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
        await this.addUserImage(userId, fileDestination);
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
