import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { MessagePattern } from '@nestjs/microservices';
import { Task } from '@app/db-lib/task.dto.entity';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern({ cmd: 'create_task' })
  create(email: string, task: Partial<Task>) {
    return this.taskService.create(email, task);
  }

  @MessagePattern({ cmd: 'update_task' })
  update(email: string, task: Partial<Task>) {
    return this.taskService.update(email, task);
  }

  @MessagePattern({ cmd: 'delete_task' })
  delete(email: string, id: number) {
    return this.taskService.delete(email, id);
  }

  @MessagePattern({ cmd: 'get_tasks' })
  getAll(email: string) {
    return this.taskService.getAll(email);
  }
}
