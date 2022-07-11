import * as Joi from 'joi';

export const configSchemaValidation = Joi.object({
  server: {
    port: Joi.string().required(),
  },
  database: {
    database: Joi.string().required(),
    host: Joi.string().required(),
    password: Joi.string().required(),
    port: Joi.number().required(),
    ssl: Joi.boolean().required(),
    username: Joi.string().required(),
  },
  redis: {
    host: Joi.string().required(),
    port: Joi.string().required(),
  },
});
