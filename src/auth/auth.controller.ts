import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() logInDto: SignInDto): Promise<{ token: string, email: string, name: string }> {
    return this.authService.signIn(logInDto);
  }
}
