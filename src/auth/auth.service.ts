import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { compare } from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { LoginPayloadDto } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  public async login(
    loginDto: LoginDto,
    userData: Users,
  ): Promise<{ accessToken: string }> {
    const { password } = loginDto;
    const isMatch = await compare(password, userData?.password || '');
    if (!isMatch) throw new NotFoundException('Email or password invalid');

    return {
      accessToken: this.jwtService.sign({
        ...new LoginPayloadDto(userData?.id),
      }),
    };
  }
}
