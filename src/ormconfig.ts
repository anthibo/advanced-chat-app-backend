import { SnakeNamingStrategy } from './modules/database/snake_naming.strategy';

const dbConfig = {
  cli: {
    migrationsDir: 'src/migrations',
  },
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + '/**/*.entity.ts'],
  host: process.env.MYSQL_HOST,
  logger: 'simple-console',
  logging: true,
  migrations: [__dirname + '/migrations/*.ts'],
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
  password: process.env.MYSQL_PASSWORD,
  port: parseInt(process.env.MYSQL_PORT),
  synchronize: true,
  type: 'mysql',
  username: process.env.MYSQL_USERNAME,
};

export = dbConfig;
