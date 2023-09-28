import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async createTask(data): Promise<Task> {
    try {
      return await this.prisma.task.create({
        data: {
          title: data.title,
          description: data.description,
          owner: {
            connect: {
              id: data.owner,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      if (error.code === 'P2002')
        throw new ForbiddenException('Task already exist with this title');
    }
  }

  async findTask(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
  ): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: taskWhereUniqueInput });
  }

  async findTasksByUserId(userId: string): Promise<Task[] | null> {
    return this.prisma.task.findMany({ where: { userId: { equals: userId } } });
  }

  async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { where, data } = params;
    return await this.prisma.task.update({
      where,
      data,
    });
  }

  async deleteTask(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return await this.prisma.task.delete({
      where,
    });
  }
}
