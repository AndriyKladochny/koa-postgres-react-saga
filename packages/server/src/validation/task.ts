import * as Joi from '@hapi/joi';

export const addTaskSchema = Joi.object({
  request: Joi.object({
    body: Joi.object({
      title: Joi.string().required(),
    }),
  }).unknown(true),
}).unknown(true);

export const updateTaskSchema = Joi.object({
  request: Joi.object({
    body: Joi.object({
      title: Joi.string().required(),
      isDone: Joi.bool().strict().required(),
    }),
  }).unknown(true),
  params: Joi.object({
    id: Joi.number().required(),
  }),
}).unknown(true);
