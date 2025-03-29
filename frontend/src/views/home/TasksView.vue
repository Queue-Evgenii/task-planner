<script setup lang="ts">
import TaskListComponent from '@/components/TaskListComponent.vue';
import { TaskStatus } from '@/models/entities/enums/TaskStatus';
import type { TaskDto } from '@/models/entities/TaskDto';
import { computed } from 'vue';

const testTasks: TaskDto[] = [
  {
    name: "Task 1",
    completed: TaskStatus.COMPLETED,
    steps: [
      { name: "Step 1.1", completed: TaskStatus.COMPLETED },
      { name: "Step 1.2", completed: TaskStatus.ACTIVE },
      {
        name: "Step 1.3",
        completed: TaskStatus.OVERDUE,
        steps: [
          { name: "Step 1.3.1", completed: TaskStatus.COMPLETED },
          { name: "Step 1.3.2", completed: TaskStatus.ACTIVE },
        ],
      },
    ],
  },
  {
    name: "Task 2",
    completed: TaskStatus.ACTIVE,
  },
  {
    name: "Task 3",
    completed: TaskStatus.OVERDUE,
    steps: [
      { name: "Step 3.1", completed: TaskStatus.COMPLETED },
      { name: "Step 3.2", completed: TaskStatus.OVERDUE },
    ],
  },
  {
    name: "Task 4",
    completed: TaskStatus.COMPLETED,
    steps: [
      { name: "Step 4.1", completed: TaskStatus.ACTIVE },
      { name: "Step 4.2", completed: TaskStatus.ACTIVE },
      { name: "Step 4.3", completed: TaskStatus.COMPLETED },
    ],
  },
];

const completedTasks = computed(() =>
  testTasks.filter((task) => task.completed === TaskStatus.COMPLETED)
);

const activeTasks = computed(() =>
  testTasks.filter((task) => task.completed === TaskStatus.ACTIVE)
);

const overdueTasks = computed(() =>
  testTasks.filter((task) => task.completed === TaskStatus.OVERDUE)
);

</script>

<template>
  <div class="tasks">
    <div class="tasks__container _container _flex _f-dir-col _gap-y-16">
      <TaskListComponent :visible="true" name="Active" :list="activeTasks" class="tasks__section tasks__active" />
      <span class="tasks__line"></span>
      <TaskListComponent name="Completed" :list="completedTasks" class="tasks__section tasks__completed" />
      <span class="tasks__line"></span>
      <TaskListComponent name="Overdued" :list="overdueTasks" class="tasks__section tasks__overdued" />
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
