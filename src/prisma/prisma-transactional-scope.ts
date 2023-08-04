import { Prisma } from '@prisma/client';
import * as cls from 'cls-hooked';
import { UnitOfWork } from './unit-of-work';
import { PrismaService } from './prisma.service';
import { CLSService } from './cls.service';
import { Injectable, Scope } from '@nestjs/common';

export const PRISMA_CLIENT_KEY = 'prisma';

@Injectable({ scope: Scope.REQUEST })
export class PrismaTransactionScope implements UnitOfWork {
  public manager: Prisma.TransactionClient;
  constructor(private readonly prisma: PrismaService) {
    this.manager = prisma;
  }

  async runInTransaction<T>(fn: (manager: any) => Promise<T>): Promise<T> {
    return await this.prisma.$transaction(async (manager) => {
      this.manager = manager;
      const res = await fn(manager);
      this.manager = null;
      return res;
    });
  }
}
