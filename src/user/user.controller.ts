import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  public async show(@Param('id') id: string): Promise<Users> {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Post()
  public async store(@Body() createUser: CreateUserDto): Promise<Users> {
    console.log(createUser);
    if (!createUser?.name || !createUser?.email || !createUser?.password)
      throw new BadRequestException('Name, email and password is required!');

    const userByEmail = await this.userService.findByEmail(createUser?.email);

    if (userByEmail)
      throw new BadRequestException('This e-mail is not available');

    const newUser = await this.userService.create(createUser);
    return newUser;
  }
}
