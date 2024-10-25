import { ProductService } from './product.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import {
  PRODUCT_ALREADY_EXISTS_ERROR,
  PRODUCT_DELETE_ERROR,
  PRODUCT_NOT_FOUND_ERROR,
  PRODUCT_UPDATE_ERROR,
} from './constants/product.constants';
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    const newProduct = await this.productService.create(dto);
    if (!newProduct) {
      throw new BadRequestException(PRODUCT_ALREADY_EXISTS_ERROR);
    }
    return newProduct;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-single-product/:id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete-single-product/:id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedProduct = await this.productService.delete(id);
    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_DELETE_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update-single-product/:id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateProductDto,
  ) {
    const updatedProduct = await this.productService.update(id, dto);
    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_UPDATE_ERROR);
    }
    return updatedProduct;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/find-product-with-reviews')
  async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto);
  }
}
