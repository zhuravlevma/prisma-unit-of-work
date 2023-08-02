import { Prisma } from '@prisma/client';
import * as cls from 'cls-hooked';
import { UnitOfWork } from './unit-of-work';
import { PrismaService } from './prisma.service';
import { CLSService } from './cls.service';
import { Injectable, Scope } from '@nestjs/common';

export const PRISMA_CLIENT_KEY = 'prisma';

@Injectable({ scope: Scope.REQUEST })
export class PrismaTransactionScope implements UnitOfWork {
  private readonly transactionContext: cls.Namespace;
  constructor(private readonly prisma: PrismaService, clsService: CLSService) {
    this.transactionContext = clsService.getContext();
  }

  async runInTransaction(fn: () => Promise<void>): Promise<void> {
    const prisma = this.transactionContext.get(
      PRISMA_CLIENT_KEY,
    ) as Prisma.TransactionClient;

    if (prisma) {
      await fn();
    } else {
      await this.prisma.$transaction(async (prisma) => {
        await this.transactionContext.runPromise(async () => {
          this.transactionContext.set(PRISMA_CLIENT_KEY, prisma);
          try {
            await fn();
          } catch (err) {
            this.transactionContext.set(PRISMA_CLIENT_KEY, null);
            throw err;
          }
        });
      });
    }
  }
}
