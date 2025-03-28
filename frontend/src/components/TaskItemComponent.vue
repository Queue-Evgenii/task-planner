<script setup lang="ts">
import { TaskStatus } from '@/models/entities/enums/TaskStatus';
import type { TaskDto } from '@/models/entities/TaskDto';
import { computed, type PropType } from 'vue';

const props = defineProps({
  task: {
    type: Object as PropType<TaskDto>,
    required: true,
  },
})
const countCompletedSteps = (task: TaskDto): number => {
  let count = task.completed === TaskStatus.COMPLETED ? 1 : 0;

  if (task.steps) {
    count += task.steps.reduce((sum, step) => sum + countCompletedSteps(step), 0);
  }

  return count;
};

const completedStepsCount = computed(() => countCompletedSteps(props.task));
</script>

<template>
  <div :class="[
    'task',
    task.completed === TaskStatus.COMPLETED ? '_completed' : ''
  ]">
    <div class="task__content">
      <div class="task__checkbox">
      </div>
      <div class="task__info">
        <div class="task__name">{{ task.name }}</div>
        <div v-if="task.steps !== undefined && task.steps.length > 0" class="task__step">
          {{ completedStepsCount }} of {{ task.steps.length }}
        </div>
      </div>
    </div>
    <ul v-if="task.steps !== undefined && task.steps.length > 0">
      <li v-for="(step, index) in task.steps" :key="index">
        <TaskItemComponent :task="step" class="task__steps" />
      </li>
    </ul>
  </div>
</template>
