import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../dal/user.repository';
import { UnitOfWork as UnitOfWork } from 'src/prisma/unit-of-work';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly unitOfWork: UnitOfWork<Prisma.TransactionClient>,
  ) {}

  async getUser(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async createUser(userData: Prisma.UserCreateInput): Promise<any> {
    try {
      const res = this.unitOfWork.runInTransaction(async (tx) => {
        await this.userRepository.create(userData, { tx });
        return this.userRepository.update(
          1,
          {
            age: 1000,
          },
          { tx },
        );
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
