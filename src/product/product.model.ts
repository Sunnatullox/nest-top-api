import { prop } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";

export interface ProductModel extends Base {}

class ProductCharacteristic {
  @prop()
  name: string;

  @prop()
  value: string;
}

export class ProductModel extends TimeStamps {
  @prop()
  image: string;

  @prop()
  title: string;

  @prop()
  price: number;

  @prop({default: 0})
  oldPrice?: number;

  @prop({default: 0})
  credit?: number;

  @prop({default: 0})
  calculatedRating: number;

  @prop()
  description: string;

  @prop()
  advantages: string;

  @prop()
  disAdvantages: string;

  @prop({type: () => [String]})
  categories: string[];

  @prop({type: () => [String]})
  tags: string[];
  
  @prop({type: () => [ProductCharacteristic], _id: false})
  characteristics: ProductCharacteristic[];
  
}
