import { IsString, IsNumber, Max, Min } from 'class-validator'

export class CreateReviewDto {
  @IsString()
  name: string;
  
  @IsString()
  title: string;
  
  @IsString()
  description: string;

  @IsNumber()
  @Max(5)
  @Min(1, { message: 'rating 1 dan kichkina bo\'lmasligi kerak' })
  rating: number;
  
  @IsString()
  productId: string;
}
