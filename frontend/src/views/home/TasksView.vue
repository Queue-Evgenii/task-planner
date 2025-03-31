<script setup lang="ts">
import { withErrorHandling } from '@/api/ApiErrorHandler';
import type { TaskApi } from '@/api/modules/Task';
import InputWithButtonComponent from '@/components/form/InputWithButtonComponent.vue';
import TaskListComponent from '@/components/TaskListComponent.vue';
import { TaskStatus } from '@/models/entities/enums/TaskStatus';
import type { TaskDto } from '@/models/entities/TaskDto';
import type { HttpError } from '@/models/utils/browser/http/HttpError';
import type { HttpResponse } from '@/models/utils/browser/http/HttpResponse';
import { useTaskListStore } from '@/stores/tasks';
import type { _DeepPartial } from 'pinia';
import { inject, onMounted, ref } from 'vue';

const taskListStore = useTaskListStore();
const taskApi = inject<TaskApi>("TaskApi")!;

const newTask = ref("");

const handleTaskResponse = (res: HttpResponse<TaskDto>) => {
  taskListStore.addTask(res.data);
}
const handleTaskListResponse = (res: HttpResponse<Array<TaskDto>>) => {
  taskListStore.setTasks(res.data);
}

const fetchTasks = () => {
  withErrorHandling(taskApi.getAllTasks())
    .then(handleTaskListResponse)
    .catch((err: HttpError) => console.log("TasksView.vue fetchTasks Error", err))
}

const addNewTask = () => {
  withErrorHandling(taskApi.createTask({ name: newTask.value }))
    .then(handleTaskResponse)
    .catch((err: HttpError) => console.log("TasksView.vue addNewTask Error", err))
    .finally(() => newTask.value = "")
}

const completeTask = (id: number) => {
  withErrorHandling(taskApi.updateTask({ id, status: TaskStatus.COMPLETED }))
    .then((res: HttpResponse<TaskDto>) => taskListStore.replaceTask(res.data))
    .catch((err: HttpError) => console.log("TasksView.vue completeTask Error", err))
};

const deleteTask = (id: number) => {
  withErrorHandling(taskApi.deleteTask(id))
    .then(handleTaskListResponse)
    .catch((err: HttpError) => console.log("TasksView.vue deleteTask Error", err))
};

const addStep = (step: _DeepPartial<TaskDto>) => {
  withErrorHandling(taskApi.createStep(step))
    .then(handleTaskResponse)
    .catch((err: HttpError) => console.log("TasksView.vue addStep Error", err))
};

onMounted(() => {
  fetchTasks();
})
</script>

<template>
  <div class="tasks">
    <div class="tasks__container _container _flex _f-dir-col _gap-y-16">
      <template v-if="taskListStore.activeTasks.length > 0">
        <TaskListComponent
          :visible="true"
          name="Active"
          :list="taskListStore.activeTasks"
          @complete-task-hoisting="completeTask"
          @add-task-hoisting="addStep"
          @delete-task-hoisting="deleteTask"
          class="tasks__section tasks__active"
        />
        <span class="tasks__line"></span>
      </template>
      <template v-if="taskListStore.completedTasks.length > 0">
        <TaskListComponent
          name="Completed"
          :list="taskListStore.completedTasks"
          @complete-task-hoisting="completeTask"
          @add-task-hoisting="addStep"
          @delete-task-hoisting="deleteTask"
          class="tasks__section tasks__completed"
        />
        <span class="tasks__line"></span>
      </template>
      <template v-if="taskListStore.overduedTasks.length > 0">
        <TaskListComponent
          name="Overdued"
          :list="taskListStore.overduedTasks"
          @complete-task-hoisting="completeTask"
          @add-task-hoisting="addStep"
          @delete-task-hoisting="deleteTask"
          class="tasks__section tasks__overdued"
        />
        <span class="tasks__line"></span>
      </template>
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
