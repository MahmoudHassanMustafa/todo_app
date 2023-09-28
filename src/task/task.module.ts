import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';

@Module({
  providers: [PrismaService, TaskRepository],
  controllers: [TaskController],
})
export class TaskModule {}
