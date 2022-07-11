import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../../common/interfaces';
import { SnakeNamingStrategy } from './snake_naming.strategy';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          autoLoadEntities: true,
          cli: { migrationsDir: __dirname + '/migrations' },
          entities: [__dirname + '/../**/*.entity.ts'],
          migrations: [__dirname + '/../../migrations/*.ts'],
          namingStrategy: new SnakeNamingStrategy(),
          type: 'mysql',
          ...configService.get<DatabaseConfig>('db'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
