import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ fullName, email, password, age }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const newUser = await this.usersService.create({
      fullName,
      email,
      age,
      password: await bcryptjs.hash(password, 10),
    });
    delete newUser.password;
    const payload = { ...newUser };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      user: newUser,
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    delete user.password;
    const payload = { ...user };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user,
    };
  }
}
