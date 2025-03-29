<script setup lang="ts">
import type { TaskApi } from '@/api/modules/Task';
import TaskListComponent from '@/components/TaskListComponent.vue';
import { useTaskListStore } from '@/stores/tasks';
import { inject } from 'vue';

const taskListStore = useTaskListStore();
const api = inject<TaskApi>("TaskApi")!;

if (!taskListStore.taskList) {
  api.getAllTasks()
    .then(res => {
      taskListStore.setTasks(res.data);
    })
    .catch(err => {
      console.log("TasksView.vue getAllTasks Err", err);
    })
}

</script>

<template>
  <div class="tasks">
    <div class="tasks__container _container _flex _f-dir-col _gap-y-16">
      <TaskListComponent
        :visible="true"
        name="Active"
        :list="taskListStore.activeTasks"
        class="tasks__section tasks__active"
      />
      <span class="tasks__line"></span>
      <TaskListComponent
        name="Completed"
        :list="taskListStore.completedTasks"
        class="tasks__section tasks__completed"
      />
      <span class="tasks__line"></span>
      <TaskListComponent
        name="Overdued"
        :list="taskListStore.overduedTasks"
        class="tasks__section tasks__overdued"
      />
    </div>
  </div>
</template>

<style>
.tasks__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--color-background-mute);
}
</style>
