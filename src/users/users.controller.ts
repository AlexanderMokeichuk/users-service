import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
  ) {
    return this.userService.findUsers(page, limit);
  }

  @Get(':id')
  async changeHasProblems(@Param('id', ParseIntPipe) id: number) {
    return this.userService.changeHasProblems(id);
  }
}
