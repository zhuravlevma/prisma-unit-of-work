// user.service.ts
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserRepository } from '../dal/user.repository';
import { UnitOfWork as UnitOfWork } from 'src/lib/unit-of-work';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async createUser(
    userId: number,
    userData: Prisma.UserCreateInput,
  ): Promise<void> {
    return this.unitOfWork
      .runInTransaction(async () => {
        await this.userRepository.update(userId, userData);
        return this.userRepository.create(userData);
      })
      .catch((err) => console.log(err));
  }
}
