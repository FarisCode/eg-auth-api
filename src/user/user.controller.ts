import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@Req() request) {
    const { email, name, _id, createdAt, updatedAt } = request.user;
    return { _id, email, name, createdAt, updatedAt };
  }
}
