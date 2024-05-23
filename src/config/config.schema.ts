import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    MONGODB_URI: Joi.string().required(),
    JWT_SECRET_KEY: Joi.string().required(),
    JWT_EXPIRE_LIMIT: Joi.string().required()
});
