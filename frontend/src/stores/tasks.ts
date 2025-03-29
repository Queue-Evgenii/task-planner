import { defineStore } from 'pinia';
import type { TaskDto } from '@/models/entities/TaskDto';
import { TaskStatus } from '@/models/entities/enums/TaskStatus';

export interface TaskStore {
  taskList: Array<TaskDto>;
}

export const useTaskListStore = defineStore('taskList', {
  state: () => ({
    taskList: [] as Array<TaskDto>,
  }) as TaskStore,
  getters: {
    taskList: (state) => {
      return state.taskList;
    },

    completedTasks: (state: TaskStore): Array<TaskDto> => {
      return state.taskList.filter((task) => task.completed === TaskStatus.COMPLETED);
    },

    activeTasks: (state: TaskStore): Array<TaskDto> => {
      return state.taskList.filter((task) => task.completed === TaskStatus.ACTIVE);
    },

    overdueTasks: (state: TaskStore): Array<TaskDto> => {
      return state.taskList.filter((task) => task.completed === TaskStatus.OVERDUED);
    },
  },
  actions: {
    setTasks: (state: TaskStore, taskList: Array<TaskDto>) => {
      state.taskList = [...taskList];
    }
  }
});


