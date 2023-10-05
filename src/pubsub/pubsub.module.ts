import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const PUB_SUB = 'PUB_SUB';
@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new RedisPubSub({
          connection: {
            host: 'localhost',
            port: 6379,
            maxRetriesPerRequest: null,
          },
        }),
    },
  ],
  exports: [PUB_SUB],
})
export class PubsubModule {}
