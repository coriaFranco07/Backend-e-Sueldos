import Product from './products.model';
import { IProduct } from './products.interfaces';

/* Crear un nuevo producto */
export const createProduct = async (productBody: IProduct) => {
  return Product.create(productBody);
};

/* Obtener todos los productos (con paginación) */
export const queryProducts = async (filter: Record<string, any>, options: Record<string, any>) => {
  return Product.paginate(filter, options);
};

/* Obtener un producto por ID */
export const getProductById = async (id: string) => {
  return Product.findById(id);
};

/* Actualizar producto */
export const updateProductById = async (productId: string, updateBody: Partial<IProduct>) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/* Eliminar producto */
export const deleteProductById = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  await product.deleteOne();
  return product;
};