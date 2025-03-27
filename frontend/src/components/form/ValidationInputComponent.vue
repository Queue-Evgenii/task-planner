<script setup lang="ts">
import InputComponent, { type InputProps } from './InputComponent.vue';
import type { ValidatorOptions } from '@/models/utils/validator/ValidatorOptions';
import type { Validator } from '@/models/utils/validator/Validator';
import { ref } from 'vue';

interface ValidationInputProps extends InputProps {
  validator: Validator;
  options: ValidatorOptions;
}

const value = defineModel<string>({
  required: true,
});
const props = defineProps<ValidationInputProps>();

const errors = ref<Array<string>>([]);

const handleInput = (value: string) => {
  errors.value = props.validator.validate(value, props.options);
};
</script>

<template>
  <div>
    <InputComponent
      v-model="value"
      @update:model-value="handleInput"
      :type="type"
      :placeholder="placeholder"
    />
    <ul v-if="errors.length > 0">
      <li v-for="(message, index) in errors" :key="index">{{ message }}</li>
    </ul>
  </div>
</template>

<style>
ul {
  margin-top: 0.5rem;
}
li {
  color: var(--color-text-error);
  font-size: 0.875rem;
}
</style>
