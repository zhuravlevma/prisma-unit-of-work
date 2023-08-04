import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaTransactionScope } from 'src/prisma/prisma-transactional-scope';

@Injectable()
export class UserRepository {
  constructor(private readonly service: PrismaTransactionScope) {}

  async create(user: Prisma.UserCreateInput): Promise<User> {
    return this.service.manager.user.create({
      data: user,
    });
  }

  async getUsers(): Promise<User[]> {
    return this.service.manager.user.findMany();
  }

  async update(userId: number, userData: Prisma.UserUpdateInput): Promise<any> {
    return this.service.manager.user.update({
      where: { id: userId },
      data: userData,
    });
  }
}
