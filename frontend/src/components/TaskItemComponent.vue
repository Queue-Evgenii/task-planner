<script setup lang="ts">
import { TaskStatus } from '@/models/entities/enums/TaskStatus';
import type { TaskDto } from '@/models/entities/TaskDto';
import { computed, ref, toRaw, type PropType } from 'vue';
import CollapsibleListComponent from './CollapsibleListComponent.vue';
import InputWithButtonComponent from '@/components/form/InputWithButtonComponent.vue';
import type { _DeepPartial } from 'pinia';

const emits = defineEmits(['completeTaskHoisting', 'deleteTaskHoisting', 'addTaskHoisting']);
const props = defineProps({
  maxNestingLevel: {
    type: Number,
    default: 1,
  },
  nestingLevel: {
    type: Number,
    default: 0,
  },
  task: {
    type: Object as PropType<TaskDto>,
    required: true,
  },
});
const countCompletedSteps = (task: TaskDto): number => {
  let count = 0;

  if (task.steps) {
    task.steps.forEach(step => {
      count += step.status === TaskStatus.COMPLETED ? 1 : 0;
    })
  }

  return count;
};

const isVisible = ref(false);
const newTask = ref('');
const isNewTaskCreating = ref(false);

const completedStepsCount = computed(() => countCompletedSteps(props.task));
const isSublistVisible = computed(
  () => isNewTaskCreating.value || (props.task.steps !== undefined && props.task.steps.length > 0),
);

const addNewTask = () => {
  const task: _DeepPartial<TaskDto> = {
    id: props.task.id,
    steps: [
      {
        name: newTask.value,
      },
    ],
  };
  delegateAddTaskHoisting(task);
  newTask.value = '';
  isNewTaskCreating.value = false;
};



const delegateCompleteTaskHoisting = (id: number) => emits('completeTaskHoisting', id);

const delegateAddTaskHoisting = (task: _DeepPartial<TaskDto>) => {
  if (props.nestingLevel > props.maxNestingLevel) return;
  emits('addTaskHoisting', task);
}

const delegateDeleteTask = (id: number) => emits('deleteTaskHoisting', id);
</script>

<template>
  <div :class="['task', task.status === TaskStatus.COMPLETED ? '_completed' : '']">
    <div class="task__content _flex _ai-c _gap-x-12">
      <div @click="delegateCompleteTaskHoisting(task.id)" class="task__checkbox"></div>
      <div @click="isVisible = !isVisible" class="task__info _flex _f-dir-col _gap-y-8">
        <div class="task__name">{{ task.name }}</div>
        <div v-if="task.steps !== undefined && task.steps.length > 0" class="task__step">
          {{ completedStepsCount }} of {{ task.steps.length }}
        </div>
      </div>
      <div class="task__controls _flex _ai-c _gap-x-4">
        <button
          v-if="nestingLevel < maxNestingLevel && task.status === TaskStatus.ACTIVE"
          type="button"
          @click="isNewTaskCreating = !isNewTaskCreating"
        >
          <i class="material-icons">add</i>
        </button>
        <button type="button" @click="delegateDeleteTask(task.id)">
          <i class="material-icons">delete</i>
        </button>
      </div>
    </div>
    <CollapsibleListComponent v-if="isSublistVisible" :is-visible="isVisible || isNewTaskCreating">
      <ul class="steps__list">
        <li v-for="(step, index) in task.steps" :key="index" class="steps__item">
          <TaskItemComponent
            :task="step"
            @complete-task-hoisting="delegateCompleteTaskHoisting"
            @add-task-hoisting="delegateAddTaskHoisting"
            @delete-task-hoisting="delegateDeleteTask"
            :nesting-level="nestingLevel + 1"
          />
        </li>
        <li v-if="isNewTaskCreating" class="steps__item">
          <InputWithButtonComponent
            v-model="newTask"
            placeholder="Enter a new step"
            @click-hoisting="addNewTask"
            class="_input"
          >
            <div class="_flex _ai-c _jc-c _gap-x-8">
              <span>Add</span>
              <i class="material-icons">add</i>
            </div>
          </InputWithButtonComponent>
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
  &__controls {
    flex: 0 0 auto;
    button {
      transition: opacity 0.3s ease;
      color: var(--color-heading);
      &:hover {
        opacity: 0.5;
      }
    }
  }
  &__checkbox {
    position: relative;
    flex: 0 0 24px;
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
