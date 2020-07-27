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
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.desc = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  private findProduct(prodId: string): [Product, number] {
    //const product = this.products.find(prod => prod.id == prodId);
    const productIndex = this.products.findIndex(prod => prod.id == prodId);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException();
    }

    return [product, productIndex];
  }
}
