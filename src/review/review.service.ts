import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/create-review';

class Leak {

}


const leaks = []

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(ReviewModel) private readonly reviewModel: ReturnModelType<typeof ReviewModel>,
    ) {}

    async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
        return this.reviewModel.create(dto);
    }

    async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }

    async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
        leaks.push(new Leak())
        return this.reviewModel.find({ productId }).exec();
    }

    async deleteByProductId(productId: string) {
        return this.reviewModel.deleteMany({ productId }).exec();
    }
}
