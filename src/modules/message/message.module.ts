import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Room } from '../room/entities/chat-room.entity';
import { User } from '../user/user.entity';
import { MessageProcessor } from './queue/message.processor.service';
import { MessageProducer } from './queue/message.producer.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { MessageSearchService } from './message-search.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, User, Room]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'messages-queue',
    }),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MessageController],
  providers: [
    MessageService,
    MessageProcessor,
    MessageProducer,
    MessageSearchService,
  ],
  exports: [MessageService, MessageProcessor, MessageProducer],
})
export class MessageModule {}
