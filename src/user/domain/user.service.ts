import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../dal/user.repository';
import { UnitOfWork as UnitOfWork } from 'src/prisma/unit-of-work';
import { PrismaTransactionScope } from 'src/prisma/prisma-transactional-scope';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly unitOfWork: UnitOfWork<
      PrismaTransactionScope,
      Prisma.TransactionClient
    >,
  ) {}

  async getUser(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async createUser(userData: Prisma.UserCreateInput): Promise<any> {
    try {
      const res = this.unitOfWork.runInTransaction(async () => {
        await this.userRepository.create(userData);
        return this.userRepository.update(1, { age: 1000 });
      });

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async createUser2(userData: Prisma.UserCreateInput): Promise<any> {
    try {
      const unitOfWork = this.unitOfWork.create();
      const res = unitOfWork.runInTransaction(async () => {
        await this.userRepository.create2(unitOfWork.getClient(), userData);
        return this.userRepository.update2(unitOfWork.getClient(), 1, {
          age: 1000,
        });
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
