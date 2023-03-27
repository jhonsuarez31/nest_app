import { IsString, IsInt, IsPositive, Min,MinLength} from "class-validator";



export class CreateUserDto {
    @IsString()
    @MinLength(1)
    name:string;

    @IsInt()
    @IsPositive()
    @Min(1)
    documentIP : number;
}
