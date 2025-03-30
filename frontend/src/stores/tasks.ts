import { defineStore } from 'pinia';
import type { TaskDto } from '@/models/entities/TaskDto';
import { TaskStatus } from '@/models/entities/enums/TaskStatus';
import { inject } from 'vue';
import type { TaskApi } from '@/api/modules/Task';
import type { HttpError } from '@/models/utils/browser/http/HttpError';

export interface TaskStore {
  _taskList: Array<TaskDto>;
}

export const useTaskListStore = defineStore('taskList', {
  state: (): TaskStore => ({
    _taskList: [] as Array<TaskDto>,
  }),
  getters: {
    taskList(): Array<TaskDto> {
      return this._taskList;
    },

    completedTasks(): Array<TaskDto> {
      return this._taskList.filter((task) => task.status === TaskStatus.COMPLETED);
    },

    activeTasks(): Array<TaskDto> {
      return this._taskList.filter((task) => task.status === TaskStatus.ACTIVE);
    },

    overduedTasks(): Array<TaskDto> {
      return this._taskList.filter((task) => task.status === TaskStatus.OVERDUED);
    },
  },
  actions: {
    setTasks(taskList: Array<TaskDto>) {
      this._taskList = taskList;
    },
    async fetchTasks() {
      const api = inject<TaskApi>("TaskApi")!;
      return new Promise<Array<TaskDto>>((resolve, reject) => {
        api.getAllTasks()
          .then(res => {
            this.setTasks(res.data);
            resolve(this._taskList)
          })
          .catch((err: HttpError) => {
            //console.log("fetchTaskList Error", err);
            reject(err);
          })
      })
    }
  }
});
