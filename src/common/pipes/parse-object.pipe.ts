import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseObjectPipe implements PipeTransform {
  transform(value: string | undefined) {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    try {
      return JSON.parse(value);
    } catch {
      throw new BadRequestException('El parámetro debe ser un JSON válido');
    }
  }
}
