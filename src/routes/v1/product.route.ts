import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import * as productController from '../../modules/product/products.controller';
import * as productValidation from '../../modules/product/products.validation';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageProducts'), validate(productValidation.createProduct), productController.createProduct)
  .get(auth('getProducts'), validate(productValidation.getProducts), productController.getProducts);

router
  .route('/:productId')
  .get(auth('getProducts'), validate(productValidation.getProducts), productController.getProducts)
  .patch(auth('manageProducts'), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(auth('manageProducts'), validate(productValidation.deleteProduct), productController.deleteProduct);

export default router;
