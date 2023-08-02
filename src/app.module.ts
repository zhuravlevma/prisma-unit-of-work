import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './lib/prisma.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/domain/user.service';
import { UserRepository } from './user/dal/user.repository';
import { PrismaTransactionScope } from './lib/prisma-transactional-scope';
import { UnitOfWork } from './lib/unit-of-work';
import { CLSService } from './lib/cls.service';
import { PrismaCustomClient } from './lib/prisma-custom';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    PrismaTransactionScope,
    PrismaCustomClient,
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
