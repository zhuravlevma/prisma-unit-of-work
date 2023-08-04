import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/domain/user.service';
import { UserRepository } from './user/dal/user.repository';
import { PrismaTransactionScope } from './prisma/prisma-transactional-scope';
import { UnitOfWork } from './prisma/unit-of-work';
import { CLSService } from './prisma/cls.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    AppService,
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
