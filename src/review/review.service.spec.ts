import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getModelToken } from 'nestjs-typegoose';
import { Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review';

describe('ReviewService', () => {
  let service: ReviewService;
  let reviewRepository: any;
  
  const exec = { exec: jest.fn() };
  const reviewRepositoryFactory = () => ({
    find: () => exec,
    create: jest.fn(),
    findByIdAndDelete: () => exec,
    deleteMany: () => exec,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          useFactory: reviewRepositoryFactory,
          provide: getModelToken('ReviewModel'),
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    reviewRepository = module.get(getModelToken('ReviewModel'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByProductId working', async () => {
    const id = new Types.ObjectId().toHexString();
    reviewRepository.find().exec.mockReturnValueOnce([{ productId: id }]);
    const res = await service.findByProductId(id);
    expect(res[0].productId).toBe(id);
  });

  it('create working', async () => {
    const dto: CreateReviewDto = {
      name: 'Test',
      title: 'Test',
      description: 'Test',
      rating: 5,
      productId: new Types.ObjectId().toHexString(),
    };
    reviewRepository.create.mockReturnValueOnce(dto);
    const res = await service.create(dto);
    expect(res).toEqual(dto);
  });

  it('delete working', async () => {
    const id = new Types.ObjectId().toHexString();
    reviewRepository.findByIdAndDelete().exec.mockReturnValueOnce({ _id: id });
    const res = await service.delete(id);
    expect(res._id).toBe(id);
  });

  it('deleteByProductId working', async () => {
    const productId = new Types.ObjectId().toHexString();
    reviewRepository.deleteMany().exec.mockReturnValueOnce({ deletedCount: 1 });
    const res = await service.deleteByProductId(productId);
    expect(res.deletedCount).toBe(1);
  });
});
