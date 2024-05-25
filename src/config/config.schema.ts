import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    MONGODB_URI: Joi.string().required(),
    JWT_SECRET_KEY: Joi.string().required(),
    JWT_EXPIRE_LIMIT: Joi.string().required(),
    JWT_PASSWORD_KEY: Joi.string().required(),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required()
});
