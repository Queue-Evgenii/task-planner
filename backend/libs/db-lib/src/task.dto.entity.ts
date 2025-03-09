import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  dueDate?: Date;

  @Column()
  userEmail: string;
}
