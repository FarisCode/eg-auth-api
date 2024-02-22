import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schemas';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  private logger: Logger;
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger();
  }


  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    if (!email || !password || !name) throw new BadRequestException();

    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new ConflictException("Email already exists!");
    }

    const hashedPwd = bcrypt.hashSync(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPwd,
    });

    const token = this.jwtService.sign({
      id: user._id,
      email,
    });

    return { token };
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string, email: string, name: string }> {
    const { email, password } = signInDto;
    if (!email || !password) throw new BadRequestException();
    const user = await this.userModel.findOne({ email });
    if (!user) {
      this.logger.error("User not found");
      throw new UnauthorizedException('Invalid Email or Password!');
    }
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      this.logger.error("Incorrect Password!");
      throw new UnauthorizedException('Invalid Email or Password!');
    }

    const token = this.jwtService.sign({
      id: user._id,
      email,
    })
    this.logger.log("Logged In Successfully");
    return {
      email: user.email,
      name: user.name,
      token,
    };
  }

}
