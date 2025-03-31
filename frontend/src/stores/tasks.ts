import { defineStore } from 'pinia';
import type { TaskDto } from '@/models/entities/TaskDto';
import { TaskStatus } from '@/models/entities/enums/TaskStatus';

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
    addTask(task: TaskDto) {
      const index = this._taskList.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this._taskList[index] = task;
      } else {
        this._taskList.push(task);
      }
    },
    replaceTask(task: TaskDto) {
      const index = this._taskList.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this._taskList[index] = task;
      }
    },
    clearState(): void {
      this._taskList = [];
    }
  }
});
