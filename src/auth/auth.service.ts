import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from '../users/dto/create-user.input';
import { UpdateUserInput } from '../users/dto/update-user.input';
import { UsersService } from 'src/users/users.service';
import SerializeGQLInput from 'src/Libs/serializeGQL';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from '../Database/PostgresErrors.enum';
import { LoginUserInput } from '../users/dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserInput: CreateUserInput) {
    const input = SerializeGQLInput(createUserInput) as CreateUserInput;
    const { Password } = input;
    const hashedPassword = await bcrypt.hash(Password, 10);
    input.Password = hashedPassword;
    try {
      const user = await this.usersService.create(input);
      delete user.Password;
      return user;
    } catch (error) {
      if (error?.parent?.code == PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'test.validation.emailExist',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Some thing went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(loginUserInput: LoginUserInput) {
    try {
      const { Email, Password } = loginUserInput;
      const user = await this.usersService.findByEmail(Email);
      await this.compareUserPassword(Password, user.Password);
      delete user.Password;
      return user;
    } catch (error) {
      // throw new HttpException('Wrong Credentials', HttpStatus.UNAUTHORIZED);
      throw new UnauthorizedException('test.validation.login')
    }
  }

  async compareUserPassword(loginPassword: string, DBPassword: string) {
    const isPasswordMatched = await bcrypt.compare(loginPassword, DBPassword);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('test.validation.login');
    }
  }

  async login(user: User) {
    const { Email, ID } = user;
    const payload = { Email, ID };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      user
    };
  }

  async me() {}
}
