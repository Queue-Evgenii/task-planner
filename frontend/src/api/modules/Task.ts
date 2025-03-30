import { Api } from "@/api/Api";
import type { TaskDto } from "@/models/entities/TaskDto";
import type { AxiosInstance } from "axios";
import type { _DeepPartial } from "pinia";

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

  createStep = (payload: _DeepPartial<TaskDto>) => {
    return this.postRequest<TaskDto, _DeepPartial<TaskDto>>("steps/", payload);
  };

  updateTask = (payload: Partial<TaskDto>) => {
    return this.putRequest<TaskDto, Partial<TaskDto>>("", payload);
  };

  deleteTask = (taskId: number) => {
    return this.deleteRequest<Array<TaskDto>>(taskId.toString());
  };
}
