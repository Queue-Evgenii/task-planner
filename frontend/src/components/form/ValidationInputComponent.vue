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
  <div class="_flex _f-dir-col _gap-y-8">
    <InputComponent
      v-model="value"
      @update:model-value="handleInput"
      :type="type"
      :placeholder="placeholder"
    />
    <ul v-if="errors.length > 0" class="_flex _f-dir-col _gap-y-8">
      <li v-for="(message, index) in errors" :key="index">{{ message }}</li>
    </ul>
  </div>
</template>
