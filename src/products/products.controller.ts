import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

// something.com/products
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string): Product {
    return this.productsService.getSingleProduct(prodId);
  }
}
