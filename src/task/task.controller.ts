import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TaskRepository } from "./task.repository";
import { CreateTaskDTO } from "./dtos/create-task.dto";
import { UpdateTaskDTO } from "./dtos/update-task.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "@prisma/client";

@Controller("task")
export class TaskController {
  constructor(private readonly taskRepository: TaskRepository) {}

  @Get("feed")
  async getAllTasks(@CurrentUser() user: User) {
    return await this.taskRepository.findTasksByUserId(user.id);
  }

  @Post("new")
  async createNewTask(
    @CurrentUser() user: User,
    @Body() taskData: CreateTaskDTO
  ) {
    return await this.taskRepository.createTask({
      owner: user.id,
      ...taskData,
    });
  }

  @Patch(":id")
  async updateTask(@Param("id") id: string, @Body() taskData: UpdateTaskDTO) {
    return await this.taskRepository.updateTask({
      where: { id: id },
      data: taskData,
    });
  }

  @Delete(":id")
  async deleteTask(@Param("id") id: string) {
    return await this.taskRepository.deleteTask({ id: id });
  }
}
