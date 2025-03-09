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

  async create(email: string, task: Partial<Task>): Promise<Task> {
    task.userEmail = email;
    task = this.taskRepository.create(task);
    return this.taskRepository.save(task);
  }

  async update(email: string, task: Partial<Task>): Promise<Task> {
    const taskExists = await this.getById(task.id as number);
    this.checkTaskOwner(email, taskExists);
    this.taskRepository.merge(taskExists, task);
    return this.taskRepository.save(taskExists);
  }

  async delete(email: string, id: number): Promise<void> {
    const taskExists = await this.getById(id);
    this.checkTaskOwner(email, taskExists);
    await this.taskRepository.delete(id);
  }

  async getAll(email: string): Promise<Task[]> {
    return this.taskRepository.find({ where: { userEmail: email } });
  }

  async getById(id: number): Promise<Task> {
    const taskExists = await this.taskRepository.findOneBy({ id });
    if (!taskExists) {
      throw new RpcException(
        new HttpException('Task not exists!', HttpStatus.NOT_FOUND),
      );
    }
    return taskExists;
  }

  checkTaskOwner(email: string, task: Task): void {
    if (task.userEmail !== email) {
      throw new RpcException(
        new HttpException(
          'Access denied! Not owner person!',
          HttpStatus.FORBIDDEN,
        ),
      );
    }
  }
}
