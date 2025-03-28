<script setup lang="ts">
import type { TaskDto } from '@/models/entities/TaskDto';
import TaskItemComponent from '@/components/TaskItemComponent.vue';
import { ref } from 'vue';

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
</script>

<template>
  <div class="drop-down">
    <h2 class="drop-down__title _title" @click="isVisible = !isVisible">{{ name }}</h2>
    <div class="drop-down__content">
      <Transition name="slide-up">
        <template v-if="isVisible">
          <ul v-if="list.length > 0" :class="['drop-down__list', isVisible ? '_visible' : '']">
            <li v-for="(task, index) in list" :key="index">
              <TaskItemComponent :task="task" />
            </li>
          </ul>
        </template>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss">
.drop-down {
  &__content {
    overflow: hidden;
  }
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
