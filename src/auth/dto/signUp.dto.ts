import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name;

  @IsNotEmpty()
  @IsEmail()
  readonly email;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Za-z]).*$/, { message: 'Password must have atleast one letter, one number and one special character!' })
  readonly password;
}