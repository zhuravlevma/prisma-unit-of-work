import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(
    body: Prisma.UserCreateInput,
    params: { tx: Prisma.TransactionClient },
  ): Promise<User> {
    return params.tx.user.create({
      data: body,
    });
  }

  async update(
    userId: number,
    userData: Prisma.UserUpdateInput,
    params: { tx: Prisma.TransactionClient },
  ): Promise<any> {
    return params.tx.user.update({
      where: { id: userId },
      data: userData,
    });
  }
}
