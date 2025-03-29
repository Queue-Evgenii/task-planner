import { Task } from '@app/db-lib/task.dto.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(email: string, task: Partial<Task>): Promise<Task> {
    this.throwIfTaskUndefined(task);
    task.userEmail = email;
    task = this.taskRepository.create(task);
    return this.taskRepository.save(task);
  }

  async createStep(email: string, task: Partial<Task>): Promise<Task> {
    const taskExists = await this.getExistingTask(email, task);

    if (task.steps && task.steps.length > 0) {
      const childs = task.steps
        .filter((step) => !step.id)
        .map((step) => this.taskRepository.create(step));
      await this.taskRepository.save(childs);
      taskExists.steps = [...(taskExists.steps || []), ...childs];
    }
    return this.taskRepository.save(taskExists);
  }

  async update(email: string, task: Partial<Task>): Promise<Task> {
    const taskExists = await this.getExistingTask(email, task);

    this.taskRepository.merge(taskExists, { ...task, steps: [] });
    return await this.taskRepository.save(taskExists);
  }

  async delete(email: string, id: number): Promise<number> {
    const taskExists = await this.getById(id);
    this.throwIfWrongEmail(email, taskExists.userEmail);
    await this.taskRepository.delete(id);
    return id;
  }

  async getAll(email: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { userEmail: email },
      relations: ['steps'],
    });
  }

  async getById(id: number): Promise<Task> {
    const taskExists = await this.taskRepository.findOne({
      where: { id },
      relations: ['steps'],
    });
    if (!taskExists) {
      throw new RpcException(
        new HttpException('Task not exists!', HttpStatus.NOT_FOUND),
      );
    }
    return taskExists;
  }

  private throwIfTaskUndefined(task: Partial<Task>) {
    if (task === undefined) {
      throw new RpcException(
        new HttpException(
          'Task payload is not provided!',
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
  }

  private throwIfTaskIdUndefined(task: Partial<Task>) {
    if (task.id === undefined) {
      throw new RpcException(
        new HttpException('Task ID is not provided!', HttpStatus.BAD_REQUEST),
      );
    }
  }

  private throwIfWrongEmail(decodedEmail: string, realEmail: string) {
    if (decodedEmail !== realEmail) {
      throw new RpcException(
        new HttpException(
          'Access denied! Not owner person!',
          HttpStatus.FORBIDDEN,
        ),
      );
    }
  }

  private async getExistingTask(
    email: string,
    task: Partial<Task>,
  ): Promise<Task> {
    this.throwIfTaskUndefined(task);
    this.throwIfTaskIdUndefined(task);
    const taskExists = await this.getById(task.id as number);
    this.throwIfWrongEmail(email, taskExists.userEmail);

    return taskExists;
  }
}
