<script setup lang="ts">
import type { TaskApi } from '@/api/modules/Task';
import InputWithButtonComponent from '@/components/form/InputWithButtonComponent.vue';
import TaskListComponent from '@/components/TaskListComponent.vue';
import { useTaskListStore } from '@/stores/tasks';
import { inject, ref } from 'vue';

const taskListStore = useTaskListStore();
const newTask = ref("");
const addNewTask = () => {
  console.log(newTask.value)
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
    <div class="tasks__input _container">
      <InputWithButtonComponent
        v-model="newTask"
        placeholder="Enter a new task"
        @click-hoisting="addNewTask"
        class="_input"
      >
        <div class="_flex _ai-c _jc-c _gap-x-8">
          <span>Add</span>
          <i class="material-icons">add</i>
        </div>
      </InputWithButtonComponent>
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
.tasks__input {
  position: fixed;
  width: 100%;
  bottom: 70px;
}
</style>
