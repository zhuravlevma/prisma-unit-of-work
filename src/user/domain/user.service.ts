// user.service.ts
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../dal/user.repository';
import { UnitOfWork as UnitOfWork } from 'src/prisma/unit-of-work';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async getUser(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async createUser(userData: Prisma.UserCreateInput): Promise<User> {
    try {
      const res = await this.unitOfWork.runInTransaction(async () => {
        await this.userRepository.update(1, { age: 555 });
        return this.userRepository.create(userData);
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
