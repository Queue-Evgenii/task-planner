import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './entity';

export enum TaskStatus {
  COMPLETED = 'completed',
  ACTIVE = 'active',
  OVERDUE = 'overdued',
}

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.ACTIVE })
  status: TaskStatus;

  @Column({ type: 'timestamp', nullable: true })
  dueDate?: Date;

  @Column({ nullable: true })
  userEmail: string;

  @ManyToOne(() => Task, (task) => task.steps, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parentTask?: Task;

  @OneToMany(() => Task, (task) => task.parentTask)
  steps: Task[];
}
