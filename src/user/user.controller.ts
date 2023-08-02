// user.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Prisma, User } from '@prisma/client';
import { UserService } from './domain/user.service';

class UserEntity {
  username: string;
  email: string;
  name: string;
  age: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserEntity })
  async createUser(@Body() userData: Prisma.UserCreateInput) {
    try {
      const user = await this.userService.createUser(1, userData);
      return user;
    } catch (error) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
