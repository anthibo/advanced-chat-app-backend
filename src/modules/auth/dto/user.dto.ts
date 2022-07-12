import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class UserInputDTO {
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
