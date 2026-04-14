// src/modules/products/index.ts
import * as productController from './products.controller';
import * as productValidation from './products.validation';
import * as productService from './products.service';
import Product from './products.model';

export { productController, productValidation, productService, Product };