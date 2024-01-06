import { Prisma } from '@prisma/client';
import { UnitOfWork } from './unit-of-work';
import { PrismaService } from './prisma.service';
export const PRISMA_CLIENT_KEY = 'prisma';

class Transaction implements UnitOfWork<Prisma.TransactionClient> {
  private manager: Prisma.TransactionClient;

  constructor(private readonly prisma: PrismaService) {
    this.manager = this.manager;
  }

  async runInTransaction<T>(
    fn: (manager: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    return this.prisma.$transaction(async (manager) => {
      this.manager = manager;
      const res = await fn(manager);
      this.manager = null;
      return res;
    });
  }
}

export class PrismaTransactionScope
  implements UnitOfWork<Prisma.TransactionClient>
{
  constructor(private readonly prisma: PrismaService) {}
  create(): UnitOfWork<Prisma.TransactionClient> {
    return new PrismaTransactionScope(new PrismaService());
  }

  async runInTransaction<T>(
    fn: (manager: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    const transaction = new Transaction(this.prisma);
    return await transaction.runInTransaction(fn);
  }
}
