import { Api } from "@/api/Api";
import type { TaskDto } from "@/models/entities/TaskDto";
import type { AxiosInstance } from "axios";

export class TaskApi extends Api {
  constructor(apiClient: AxiosInstance) {
    super(apiClient, "task/");
  }

  getAllTasks = () => {
    return this.getRequest<Array<TaskDto>>("all/");
  };

  createTask = (payload: Partial<TaskDto>) => {
    return this.postRequest<TaskDto, Partial<TaskDto>>("", payload);
  };

  createStep = (payload: Partial<TaskDto>) => {
    return this.postRequest<TaskDto, Partial<TaskDto>>("steps/", payload);
  };

  updateTask = (payload: Partial<TaskDto>) => {
    return this.putRequest<TaskDto, Partial<TaskDto>>("", payload);
  };

  deleteTask = (taskId: number) => {
    return this.deleteRequest(taskId.toString());
  };
}
