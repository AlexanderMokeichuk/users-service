import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  async findUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const take = Number(limit);

    const totalUsers = await this.prisma.user.count();

    const lastPage = Math.ceil(totalUsers / limit);

    const users = await this.prisma.user.findMany({
      skip,
      take,
    });

    return {
      users,
      currentPage: page,
      lastPage,
      totalUsers,
    };
  }
}