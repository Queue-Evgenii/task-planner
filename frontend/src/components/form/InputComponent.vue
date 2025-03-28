<script setup lang="ts">
export interface InputProps {
  name?: string;
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
  <div class="_flex _f-dir-col _gap-y-12">
    <label v-if="name !== undefined && name.length > 0">{{ name }}</label>
    <input v-model="value" :type="type" :placeholder="placeholder" />
  </div>
</template>
