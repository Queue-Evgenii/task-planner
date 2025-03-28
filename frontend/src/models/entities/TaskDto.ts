import type { TaskStatus } from "./enums/TaskStatus";

export interface TaskDto {
  name: string;
  steps?: Array<TaskDto>;
  completed: TaskStatus;
}
