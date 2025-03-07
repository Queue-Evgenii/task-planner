<script setup lang="ts">
const value = defineModel<string>({
  required: true,
})
defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  }
})
</script>

<template>
  <input v-model="value" :type="type" :placeholder="placeholder">
</template>

<style scoped>
input {
  outline: none;
  border: 1px solid var(--color-border);
  font-size: .875rem;
  border-radius: .5rem;

  background-color: var(--color-background-mute);
  padding: .75rem;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgba(var(--color-background-mute), 0.05);
  color: var(--color-text);
}
</style>
