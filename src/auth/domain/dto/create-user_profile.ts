import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserProfile {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  last_name: string;
  constructor(name: string, last_name: string) {
    this.name = name;
    this.last_name = last_name;
  }
}
