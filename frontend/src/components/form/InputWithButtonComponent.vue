tem<script setup lang="ts">
import InputComponent, { type InputProps } from './InputComponent.vue';

const value = defineModel<string>({
  required: true,
});
defineProps<InputProps>();
const emits = defineEmits(["clickHoisting"])
const handleClick = () => {
  emits("clickHoisting", value.value);
}
</script>

<template>
  <div class="input-with _flex _f-dir-col _gap-y-8">
    <InputComponent
      v-model="value"
      :placeholder="placeholder"
    />
    <button type="button" @click="handleClick" class="input-with__button">
      <slot></slot>
    </button>
  </div>
</template>
