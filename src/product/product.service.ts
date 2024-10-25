import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from './product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from 'src/review/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: ModelType<ProductModel>,
  ) {}

  async create(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithReviews(dto: FindProductDto) {
    return this.productModel
      .aggregate([
        { $match: { categories: dto.category } },
        { $sort: { _id: 1 } },
        { $limit: dto.limit },
        {
          $lookup: {
            from: 'Review',
            localField: '_id',
            foreignField: 'productId',
            as: 'review',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$review' },
            reviewAvg: { $avg: '$review.rating' },
          },
        },
        { $unwind: { path: '$review', preserveNullAndEmptyArrays: true } },
        { $sort: { 'review.createdAt': -1 } },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            image: { $first: '$image' },
            price: { $first: '$price' },
            oldPrice: { $first: '$oldPrice' },
            credit: { $first: '$credit' },
            calculatedRating: { $first: '$calculatedRating' },
            description: { $first: '$description' },
            advantages: { $first: '$advantages' },
            disAdvantages: { $first: '$disAdvantages' },
            categories: { $first: '$categories' },
            tags: { $first: '$tags' },
            characteristics: { $first: '$characteristics' },
            reviews: { $push: '$review' },
            reviewCount: { $first: '$reviewCount' },
            reviewAvg: { $first: '$reviewAvg' },
          },
        },
      ])
      .exec() as Promise<
      (ProductModel & {
        reviews: ReviewModel[];
        reviewCount: number;
        reviewAvg: number;
      })[]
    >;
  }
}
