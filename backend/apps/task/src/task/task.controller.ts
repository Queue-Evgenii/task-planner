import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskPayload } from '@app/dto-lib/task/task-payload.dto';
import { DeleteTaskPayload } from '@app/dto-lib/task/delete-task-payload.dto';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern({ cmd: 'create_task' })
  create(@Payload() data: TaskPayload) {
    const { email, task } = data;
    return this.taskService.create(email, task);
  }

  @MessagePattern({ cmd: 'update_task' })
  update(@Payload() data: TaskPayload) {
    const { email, task } = data;
    return this.taskService.update(email, task);
  }

  @MessagePattern({ cmd: 'delete_task' })
  delete(@Payload() data: DeleteTaskPayload) {
    const { email, id } = data;
    return this.taskService.delete(email, id);
  }

  @MessagePattern({ cmd: 'get_tasks' })
  getAll(email: string) {
    return this.taskService.getAll(email);
  }
}
