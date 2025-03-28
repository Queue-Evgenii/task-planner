<script setup lang="ts">
import LoaderComponent from '@/components/LoaderComponent.vue';
</script>

<template>
  <div class="greeting _flex _f-dir-col _ai-c _jc-sb _gap-y-32">
    <span></span>
    <h1 class="greeting__title _title">Hello! <span>&#128522;</span></h1>
    <div class="greeting__loader">
      <LoaderComponent />
    </div>
  </div>
</template>

<style lang="scss">
.greeting {
  width: 100%;
  height: 100%;
  &__title {
    font-size: 2rem;
  }
  &__loader {
    max-width: 300px;
    padding: 16px 0;
  }
}
</style>
