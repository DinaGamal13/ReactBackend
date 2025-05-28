import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(username:string, email: string, password: string) {
    console.log('Registering new user:', email, password);
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already registered');
    }

    return this.usersService.createUser(username, email, password);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      userId: user._id,
    };
  }

  async validateUser(email: string, password: string) {
    return this.usersService.validateUser(email, password);
  }
}
