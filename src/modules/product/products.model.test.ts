import { faker } from '@faker-js/faker';
import Product from './products.model';
import { IProduct } from './products.interfaces';

describe('Product model', () => {
  describe('Product validation', () => {
    let newProduct: IProduct;
    beforeEach(() => {
      newProduct = {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: 100,
        stock: 10,
        category: 'Electrónica',
      };
    });

    test('should correctly validate a valid product', async () => {
      await expect(new Product(newProduct).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if price is not a number', async () => {
      (newProduct as any).price = 'invalid-price';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if stock is negative', async () => {
      newProduct.stock = -5;
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if name is missing', async () => {
      (newProduct as any).name = undefined;
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });
  });

  describe('Product toJSON()', () => {
    test('should work correctly and return standard object', () => {
      const newProduct = {
        name: 'Teclado',
        description: 'Mecánico',
        price: 50,
        stock: 5,
        category: 'Hogar',
      };
      const productDoc = new Product(newProduct);
      expect(productDoc.toJSON()).toHaveProperty('id');
      expect(productDoc.toJSON()).not.toHaveProperty('_id');
      expect(productDoc.toJSON()).not.toHaveProperty('__v');
    });
  });
});