import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { Users } from '@prisma/client';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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
