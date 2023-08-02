import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaCustomClient } from 'src/lib/prisma-custom';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaCustomClient) {}

  async create(user: Prisma.UserCreateInput): Promise<void> {
    await this.prisma.getInstance().user.create({
      data: user,
    });
    return;
  }

  async update(userId: number, userData: Prisma.UserUpdateInput): Promise<any> {
    return this.prisma.getInstance().user.update({
      where: { id: userId },
      data: userData,
    });
  }
}
