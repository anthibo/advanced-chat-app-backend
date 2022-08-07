import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { RedisClientOptions } from 'redis';

import configurations from './config/config';
import { configSchemaValidation } from './config/config.schema';
import { DatabaseModule } from './modules/database/database.module';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { ChatModule } from './modules/chat/chat.module';
import { RoomModule } from './modules/room/room.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      validationSchema: configSchemaValidation,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          url: configService.get('redis.url'),
        };
      },
      inject: [ConfigService],
    }),

    DatabaseModule,
    AuthModule,
    ChatModule,
    RoomModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
