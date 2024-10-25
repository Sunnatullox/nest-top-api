import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel)
    private readonly topPageModel: ModelType<TopPageModel>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async findById(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.topPageModel
      .aggregate([
        { $match: { firstCategory } },
        { $group: { _id: '$category', pages: { $push: '$$ROOT' } } },
      ])
      .exec();
  }

  async update(id: string, dto: TopPageModel) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async findByText(text: string) {
    return this.topPageModel
      .find({
        $or: [
          { title: { $regex: text, $options: 'i' } },
          { seoText: { $regex: text, $options: 'i' } },
          { 'advantages.title': { $regex: text, $options: 'i' } },
          { 'advantages.description': { $regex: text, $options: 'i' } }
        ]
      })
      .exec();
  }
}
