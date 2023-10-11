import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import * as path from 'path';

import {
  AcceptLanguageResolver,
  GraphQLWebsocketResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { PubsubModule } from './pubsub/pubsub.module';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { DataloaderModule } from './dataloader/dataloader.module';
import { DataloaderService } from './dataloader/dataloader.service';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { TranslateService } from './Libs/Translate';
interface CustomGqlError extends GraphQLFormattedError {
  statusCode?: number;
}
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          port: configService.get('REDIS_PORT'),
          host: configService.get('REDIS_HOST'),
        },
      }),
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE'),
        autoLoadModels: true,
        logging: true,
      }),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [DataloaderModule, UsersModule],
      inject: [DataloaderService, TranslateService],
      driver: ApolloDriver,
      useFactory: (
        dataloaderService: DataloaderService,
        translateService: TranslateService,
      ) => {
        return {
          autoSchemaFile: join(process.cwd(), '../schema.gql'),
          buildSchemaOptions: {
            dateScalarMode: 'isoDate',
          },
          introspection: true,
          csrfPrevention: true,
          installSubscriptionHandlers: true,
          subscriptions: {
            'graphql-ws': true,
            'subscriptions-transport-ws': true,
          },
          context: () => ({
            loaders: dataloaderService.createLoaders(),
          }),
          formatError: (error: GraphQLError) => {
            const statusCode = (error?.extensions?.originalError as any)
              ?.statusCode;
            let errorMessage;
            if (
              Array.isArray((error?.extensions?.originalError as any)?.message)
            ) {
              errorMessage =
                (error?.extensions?.originalError as any)?.message[0] ||
                error.message;
            } else {
              errorMessage =
                (error?.extensions?.originalError as any)?.message ||
                error.message;
            }
            const translatedMessage = translateService.translate(errorMessage);

            const formattedError: CustomGqlError = {
              message:
                translatedMessage ||
                translateService.translate(
                  'test.validation.internalServerError',
                ),
              statusCode: statusCode || 500,
            };
            return formattedError;
          },
        };
      },
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES'),
          },
          secret: configService.get('JWT_SECRET'),
        };
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        GraphQLWebsocketResolver,
        new HeaderResolver(['lang']),
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    AuthModule,
    UsersModule,
    PubsubModule,
    EmailModule,
    DataloaderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
      .forRoutes('graphql');
  }
}
