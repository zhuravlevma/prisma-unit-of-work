import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Get,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { UserService } from './domain/user.service';

class UserEntity {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    try {
      const user = await this.userService.getUser();
      return user;
    } catch (error) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/create1')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserEntity })
  async createUser(@Body() userData: Prisma.UserCreateInput) {
    try {
      const user = await this.userService.createUser(userData);
      return user;
    } catch (error) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/create2')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserEntity })
  async createUser2(@Body() userData: Prisma.UserCreateInput) {
    try {
      const user = await this.userService.createUser2(userData);
      return user;
    } catch (error) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
