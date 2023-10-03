import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import SerializeGQLInput from '../Libs/serializeGQL';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
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

  async uploadUserImage(file: GraphQLUpload) {
    const dirPath = join(__dirname, '/uploads');
    console.log(dirPath);
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
    const createPromise = new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(createWriteStream(`dist/uploads/${file.filename}`))
        .on('finish', () => {
          return resolve(true);
        })
        .on('error', (error) => {
          reject(false);
        });
    });

    return createPromise;
  }
}
