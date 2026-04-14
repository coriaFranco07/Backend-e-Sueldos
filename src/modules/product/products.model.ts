import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IProductDoc, IProductModel } from './products.interfaces';

const productSchema = new mongoose.Schema<IProductDoc, IProductModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// Añadimos los plugins para limpiar el JSON y permitir paginación
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

productSchema.set('toJSON', {
  transform: (doc: any, ret: any) => {
    ret.category = doc.category;
    return ret;
  }
});

const Product = mongoose.model<IProductDoc, IProductModel>('Product', productSchema);

export default Product;