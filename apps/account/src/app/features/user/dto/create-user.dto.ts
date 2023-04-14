import { IsEmail, IsString, Length } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  email: Email;

  @IsString()
  @Length(8, 64)
  password: SomeString;

  @IsString()
  @Length(3, 10)
  nickname: UniqueString;
}
