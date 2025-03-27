<script setup lang="ts">
export interface InputProps {
  type?: string;
  placeholder?: string;
}

withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
});
const value = defineModel<string>({
  required: true,
});
</script>

<template>
  <input v-model="value" :type="type" :placeholder="placeholder" />
</template>

<style scoped>
input {
  outline: none;
  border: 1px solid var(--color-border);
  font-size: 0.875rem;
  border-radius: 0.5rem;

  background-color: var(--color-background-mute);
  padding: 0.75rem;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgba(var(--color-background-mute), 0.05);
  color: var(--color-text);
}
</style>
