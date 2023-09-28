import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserRepository, PrismaService],
  exports: [UserRepository],
})
export class UserModule {}
