import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post('create')
  async createUser(@Body() userData) {
    return await this.userRepository.createUser(userData);
  }

  @Get(':email')
  async findUser(@Param('email') email) {
    return await this.userRepository.findUser(email);
  }
}
