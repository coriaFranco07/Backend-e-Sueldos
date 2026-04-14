import { Request, Response } from 'express';
import httpStatus from 'http-status';
import * as productService from './products.service';
import catchAsync from '../utils/catchAsync';

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(product);
});

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.queryProducts({}, req.query);
  res.send(result);
});

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.updateProductById(req.params['productId'] as string, req.body);
  res.send(product);
});

export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  await productService.deleteProductById(req.params['productId'] as string);
  res.status(httpStatus.NO_CONTENT).send();
});