import { Prisma } from '@prisma/client';
import { PRISMA_CLIENT_KEY } from './prisma-transactional-scope';
import * as cls from 'cls-hooked';
import { CLSService } from './cls.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaCustomClient {
  private readonly transactionContext: cls.Namespace;
  constructor(
    private readonly prisma: PrismaService,
    private readonly clsService: CLSService,
  ) {
    this.transactionContext = this.clsService.getContext();
  }

  getInstance(): Prisma.TransactionClient {
    const prisma = this.transactionContext.get(
      PRISMA_CLIENT_KEY,
    ) as Prisma.TransactionClient;
    if (prisma) {
      return prisma;
    } else {
      return this.prisma;
    }
  }
}
