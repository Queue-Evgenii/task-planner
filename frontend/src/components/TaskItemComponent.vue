<script setup lang="ts">
import { TaskStatus } from '@/models/entities/enums/TaskStatus';
import type { TaskDto } from '@/models/entities/TaskDto';
import { computed, ref, type PropType } from 'vue';
import CollapsibleListComponent from './CollapsibleListComponent.vue';

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
const isVisible = ref(false);

const completeTask = () => {
  props.task.completed = TaskStatus.COMPLETED;
}

</script>

<template>
  <div :class="[
    'task',
    task.completed === TaskStatus.COMPLETED ? '_completed' : ''
  ]">
    <div class="task__content _flex _ai-c _gap-x-12">
      <div @click="completeTask" class="task__checkbox"></div>
      <div @click="isVisible = !isVisible" class="task__info _flex _f-dir-col _gap-y-8">
        <div class="task__name">{{ task.name }}</div>
        <div v-if="task.steps !== undefined && task.steps.length > 0" class="task__step">
          {{ completedStepsCount }} of {{ task.steps.length }}
        </div>
      </div>
    </div>
    <CollapsibleListComponent
      v-if="task.steps !== undefined && task.steps.length > 0"
      :is-visible="isVisible"
    >
      <ul class="steps__list">
        <li v-for="(step, index) in task.steps" :key="index" class="steps__item">
          <TaskItemComponent :task="step" />
        </li>
      </ul>
    </CollapsibleListComponent>
  </div>
</template>

<style lang="scss">
.task {
  &__content {
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    background-color: var(--color-background-mute);
    &:hover {
      background-color: var(--color-background-soft);
    }
  }
  &__info {
    width: 100%;
  }
  &__checkbox {
    position: relative;
    width: 24px;
    height: 24px;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    &::after {
      content: '';
      position: absolute;
      width: 17px;
      height: 18px;
      background-color: var(--color-border);
      top: 2px;
      left: 2px;
      border-radius: 2px;
      transform: scale(0);
    }
  }
  &._completed {
    .task__checkbox {
      &::after {
        transform: scale(1);
      }
    }
    .task__name {
      text-decoration: line-through;
    }
  }
}
.steps {
  overflow: hidden;
  &__list {
    margin: 6px 0 -6px;
    padding-left: 24px;
  }
  &__item {
    padding: 6px 0;
  }
}
</style>
