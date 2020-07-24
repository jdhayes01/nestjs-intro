import { Controller, Post } from "@nestjs/common";

// something.com/products
@Controller('products')
export class ProductsController {
    @Post()
    addProduct(): any{
        
    }
}