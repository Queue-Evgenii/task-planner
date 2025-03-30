<script setup lang="ts">
import type { TaskDto } from '@/models/entities/TaskDto';
import TaskItemComponent from '@/components/TaskItemComponent.vue';
import { ref } from 'vue';
import CollapsibleListComponent from './CollapsibleListComponent.vue';
import type { _DeepPartial } from 'pinia';

const emits = defineEmits([
  "completeTaskHoisting",
  "deleteTaskHoisting",
  "addTaskHoisting"
]);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  list: {
    type: Array<TaskDto>,
    required: true,
  }
})
const isVisible = ref(props.visible);

const delegateCompleteTaskHoisting = (id: number) => emits("completeTaskHoisting", id);

const delegateAddTaskHoisting = (step: _DeepPartial<TaskDto>) => emits("addTaskHoisting", step);

const delegateDeleteTask = (id: number) => emits("deleteTaskHoisting", id);
</script>

<template>
  <div class="drop-down">
    <button
      @click="isVisible = !isVisible"
      :class="[
        'drop-down__button _flex _ai-c _gap-x-8',
        isVisible ? '_active' : ''
      ]"
    >
      <span>{{ name }}</span>
      <i class="material-icons">chevron_right</i>
    </button>
    <CollapsibleListComponent v-if="list.length > 0" :is-visible="isVisible">
      <ul :class="['drop-down__list', isVisible ? '_visible' : '']">
        <li v-for="(task, index) in list" :key="index" class="drop-down__item">
          <TaskItemComponent
            :task="task"
            @complete-task-hoisting="delegateCompleteTaskHoisting"
            @add-task-hoisting="delegateAddTaskHoisting"
            @delete-task-hoisting="delegateDeleteTask"
          />
        </li>
      </ul>
    </CollapsibleListComponent>
  </div>
</template>

<style lang="scss">
.drop-down {
  &__button {
    padding: 4px 6px;
    border-radius: 6px;
    background-color: var(--color-background-mute);
    &:hover {
      background-color: var(--color-background-soft);
    }
    i {
      transition: transform 0.3s ease;
    }
    &._active i {
      transform: rotate(90deg);
    }
  }
  &__content {
    overflow: hidden;
  }
  &__list {
    margin: 8px 0 -8px;
  }
  &__item {
    padding: 8px 0;
  }
}
</style>
