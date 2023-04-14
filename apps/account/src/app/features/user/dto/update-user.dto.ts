import { IsEmail, IsString, IsUUID, Length } from 'class-validator';

export class UserUpdateDto {
  @IsUUID()
  id: Uuid;

  @IsEmail()
  email: Email;

  @IsString()
  @Length(8, 64)
  password: SomeString;

  @IsString()
  @Length(3, 10)
  nickname: UniqueString;
}
