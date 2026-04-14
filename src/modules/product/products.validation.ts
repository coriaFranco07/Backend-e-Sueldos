import Joi from 'joi';

export const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().integer().min(0).required(),
    category: Joi.string().required(),
  }),
};

export const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    stock: Joi.number(),
    category: Joi.string(),
  }).min(1),
};

export const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
};