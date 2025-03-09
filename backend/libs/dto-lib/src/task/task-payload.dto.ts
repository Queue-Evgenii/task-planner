import { Task } from '@app/db-lib/task.dto.entity';

export interface TaskPayload {
  email: string;
  task: Partial<Task>;
}
