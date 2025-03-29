import type { TaskStatus } from "./enums/TaskStatus";

export interface TaskDto {
  id: number;
  name: string;
  steps?: Array<TaskDto>;
  status: TaskStatus;
  userEmail?: string;
  dueDate?: Date;
  updatedAt: Date;
  createdAt: Date;
}
