export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  db: {
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    logging: process.env.MYSQL_LOGGING ? true : false,
    synchronize: false,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
});
