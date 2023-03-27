import { IsArray, IsNumber, IsString, IsOptional, IsMongoId, isArray, IsInt } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Driver } from '../../driver/entities/driver.entity';
import { User } from '../../user/entities/user.entity';

export class CreateTravelDto {
  @IsNumber()
  @IsOptional()
  cost: number;

  @IsArray()
  start: [number, number];

  @IsArray()
  end: [number, number];

  @IsString()
  @IsOptional()
  state: string[];

  @IsMongoId()
  @IsOptional()
  driver: Driver;

  @IsMongoId()
  user: User;
}

export class FinishTavelDto{
  @IsArray()
  end: [number, number];

  @IsInt()
  driver: ObjectId;
}