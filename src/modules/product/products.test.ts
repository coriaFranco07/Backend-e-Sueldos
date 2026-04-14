import mongoose from 'mongoose';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import moment from 'moment';
import config from '../../config/config';
import tokenTypes from '../token/token.types';
import * as tokenService from '../token/token.service';
import app from '../../app';
import setupTestDB from '../jest/setupTestDB';
import Product from './products.model';
import { IProduct } from './products.interfaces';

setupTestDB();

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');

// Creamos un admin para poder testear los permisos
const adminId = new mongoose.Types.ObjectId();
const adminAccessToken = tokenService.generateToken(adminId, accessTokenExpires, tokenTypes.ACCESS);

const productOne = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: 100,
  stock: 10,
  category: 'Electrónica', // <--- Agrégalo aquí
};

const insertProducts = async (products: Record<string, any>[]) => {
  await Product.insertMany(products);
};

describe('Product routes', () => {
  describe('POST /v1/products', () => {
    let newProduct: IProduct;

    beforeEach(() => {
      newProduct = {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: 200,
        stock: 5,
        category: 'Hogar',
      };
    });

    test('should return 201 and successfully create new product if data is ok', async () => {
      const res = await request(app)
        .post('/v1/products')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        stock: newProduct.stock,
        category: newProduct.category,
      });

      const dbProduct = await Product.findById(res.body.id);
      expect(dbProduct).toBeDefined();
    });

    test('should return 400 error if price is not a number', async () => {
      (newProduct as any).price = 'no-es-precio';
      await request(app)
        .post('/v1/products')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /v1/products', () => {
    test('should return 200 and list all products', async () => {
      await insertProducts([productOne]);

      const res = await request(app)
        .get('/v1/products')
        .send()
        .expect(httpStatus.OK);

      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(productOne._id.toHexString());
    });
  });
});