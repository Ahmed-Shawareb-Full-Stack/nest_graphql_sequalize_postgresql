import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport_strategies/local.strategy';
import { JwtStrategy } from './passport_strategies/jwt.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
