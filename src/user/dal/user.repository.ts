import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaCustomClient } from 'src/prisma/prisma-custom';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaCustomClient) {}

  async create(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.getInstance().user.create({
      data: user,
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.getInstance().user.findMany();
  }

  async update(userId: number, userData: Prisma.UserUpdateInput): Promise<any> {
    return this.prisma.getInstance().user.update({
      where: { id: userId },
      data: userData,
    });
  }
}
