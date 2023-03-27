import { IsString, IsInt, IsBoolean, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDriverDto {
  @IsString()
  name: string;
  @IsInt()
  documentIP: number;
  @IsBoolean()
  available: boolean;
  @IsArray()
  coordinates: [number];
  
}
