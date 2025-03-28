<script setup lang="ts">
import DropdownTaskListComponent from '@/components/DropDownTaskListComponent.vue';
import TaskItemComponent from '@/components/TaskItemComponent.vue';
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
    <div class="tasks__container _container">
      <DropdownTaskListComponent :visible="true" name="Active" :list="activeTasks" class="tasks__active" />
      <DropdownTaskListComponent name="Completed" :list="completedTasks" class="tasks__completed" />
      <DropdownTaskListComponent name="Overdued" :list="overdueTasks" class="tasks__overdued" />
    </div>
  </div>
</template>
