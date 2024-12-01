import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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

  async changeHasProblems(id: number): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (user) {
      if (user.hasProblems === true) {
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            hasProblems: false,
          },
        });
      }
    }

    const count = await this.prisma.user.count({
      where: { hasProblems: true },
    });

    return {
      message: 'Number of users with problems',
      count: count,
    };
  }
}
