import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { TaskDto } from '@/models/entities/TaskDto';
import { TaskStatus } from '@/models/entities/enums/TaskStatus';

export const useTaskListStore = defineStore('tasks', () => {
  const taskList = ref<Array<TaskDto>>([]);
  const setTasks = (_taskList: Array<TaskDto>) => {
    taskList.value = [..._taskList];
  }

  const completedTasks = computed(() =>
    taskList.value.filter((task) => task.status === TaskStatus.COMPLETED)
  );

  const activeTasks = computed(() =>
    taskList.value.filter((task) => task.status === TaskStatus.ACTIVE)
  );

  const overduedTasks = computed(() =>
    taskList.value.filter((task) => task.status === TaskStatus.OVERDUED)
  );

  return { taskList, completedTasks, activeTasks, overduedTasks, setTasks };
});
