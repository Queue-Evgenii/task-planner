<script setup lang="ts">
const props = defineProps({
  isVisible: Boolean,
});
</script>

<template>
  <div class="collapsible">
    <Transition name="slide-up">
      <div v-if="isVisible" class="collapsible__content">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.collapsible {
  overflow: hidden;
  &__content {
    margin-top: 8px;
  }
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
