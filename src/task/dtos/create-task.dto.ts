import { Prisma } from '@prisma/client';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
