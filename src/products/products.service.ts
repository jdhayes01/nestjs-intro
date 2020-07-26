import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts(): Product[] {
    return this.products.slice();
  }

  getSingleProduct(productId: string): Product {
    const product = this.products.find(prod => prod.id == productId);
    if (!product) {
      throw new NotFoundException();
    }
    return { ...product };
  }
}
