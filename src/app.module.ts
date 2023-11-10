import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/domain/user.service';
import { UserRepository } from './user/dal/user.repository';
import { PrismaTransactionScope } from './prisma/prisma-transactional-scope';
import { UnitOfWork } from './prisma/unit-of-work';
import { CLSService } from './prisma/cls.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaTransactionScope,
    UserRepository,
    CLSService,
    PrismaService,
    {
      provide: UnitOfWork,
      useClass: PrismaTransactionScope,
    },
  ],
})
export class AppModule {}
