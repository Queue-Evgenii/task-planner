<script setup lang="ts">
import ValidationInputComponent from '@/components/form/ValidationInputComponent.vue';
import { inject, reactive, ref, toRaw } from 'vue';
import { UserApi } from '@/api/modules/User';
import { SimpleValidator } from '@/models/utils/validator/SimpleValidator';
import type { UserDto } from '@/models/entities/UserDto';

const hasAccount = ref(true);
const data = reactive<UserDto>({
  email: '',
  password: '',
  name: '',
  surname: '',
});
const validator = new SimpleValidator();
const api = inject<UserApi>("UserApi")!;

const authorizate = (user: UserDto) => {
  api.authorization(user)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
const registrate = (user: UserDto) => {
  api.registration(user)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const handleClick = () => {
  const user = toRaw(data);
  console.log(user);

  return;

  if (hasAccount.value) {
    authorizate(user);
    return;
  }
  registrate(user);
};
</script>

<template>
  <div class="form _flex _ai-c _jc-c">
    <form class="form__container _flex _f-dir-col _gap-y-16">
    <h1 class="_title">
      {{ hasAccount ? 'Sign In' : 'Sign Up' }}
    </h1>
    <div class="_flex _f-dir-col _gap-y-12">
      <template v-if="!hasAccount">
        <ValidationInputComponent
          v-model="data.name"
          :validator="validator"
          :options="{ min: 3 }"
          placeholder="Enter first name"
          class="_input _input-errors"
        />
        <ValidationInputComponent
          v-model="data.surname"
          :validator="validator"
          :options="{ min: 3 }"
          placeholder="Enter last name"
          class="_input _input-errors"
        />
      </template>
      <ValidationInputComponent
        v-model="data.email"
        :validator="validator"
        :options="{ required: true, email: true }"
        type="email"
        placeholder="Enter e-mail"
        class="_input _input-errors"
      />
      <ValidationInputComponent
        v-model="data.password"
        :validator="validator"
        :options="{ min: 5 }"
        type="password"
        placeholder="Enter password"
        class="_input _input-errors"
      />
    </div>
    <div class="_flex _f-dir-col _gap-y-8">
      <button @click="handleClick" class="_button">{{
        hasAccount ? 'Sign In' : 'Sign Up'
      }}</button>
      <p class="form__another-link">
        {{ hasAccount ? 'No account?' : 'Have account?' }}
        <span @click="hasAccount = !hasAccount">{{ !hasAccount ? 'Sign In' : 'Sign Up' }}</span>
      </p>
    </div>
  </form>
  </div>
</template>

<style lang="scss">
.form {
  height: 100%;
  width: 100%;
  padding: 0 1.25rem;
  &__container {
    background-color: var(--color-background);
    padding: 1.25rem;
    width: 100%;
    max-width: 400px;
    min-width: 300px;
    border-radius: 0.5rem;
    box-shadow:
      0 10px 15px 8px var(--color-border),
      0 4px 6px -2px var(--color-border-hover);
  }
  &__another-link {
    color: var(--color-text);
    font-size: 0.875rem;
    text-align: center;
    span {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
