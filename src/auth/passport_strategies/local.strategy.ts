import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'Email',
      passwordField: 'Password',
    });
  }

  async validate(Email: string, Password: string) {
    return await this.authService.getAuthenticatedUser({ Email, Password });
  }
}
