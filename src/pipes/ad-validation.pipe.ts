import {
  PipeTransform,
  BadRequestException,
  ArgumentMetadata,
  Injectable,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ID_VALIDATION_ERROR } from './ad-validation.sessions';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type != 'param') {
      return value;
    }
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ID_VALIDATION_ERROR);
    }
    return value;
  }
}
