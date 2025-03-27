<script setup lang="ts">
import { authorization, registration } from '@/api/auth';
import ButtonComponent from '@/components/form/ButtonComponent.vue';
import ValidationInputComponent from '@/components/form/ValidationInputComponent.vue';
import type { UserDto } from '@/models/entities/UserDto';
import { SimpleValidator } from '@/models/utils/validator/SimpleValidator';
import { reactive, ref, toRaw } from 'vue';

const hasAccount = ref(true);
const data = reactive<UserDto>({
  email: '',
  password: '',
  name: '',
  surname: '',
});
const validator = new SimpleValidator();

const authorizate = (user: UserDto) => {
  authorization(user)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
const registrate = (user: UserDto) => {
  registration(user)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const handleClick = () => {
  const user = toRaw(data);
  console.log(user);
  return

  if (hasAccount.value) {
    authorizate(user);
    return;
  }
  registrate(user);
};
</script>

<template>
  <form class="form">
    <h1>{{ hasAccount ? 'Sign In' : 'Sign Up' }}</h1>
    <div class="form__inputs">
      <template v-if="!hasAccount">
        <ValidationInputComponent
          v-model="data.name"
          :validator="validator"
          :options="{ min: 3 }"
          placeholder="Enter first name"
        />
        <ValidationInputComponent
          v-model="data.surname"
          :validator="validator"
          :options="{ min: 3 }"
          placeholder="Enter last name"
        />
      </template>
      <ValidationInputComponent
        v-model="data.email"
        :validator="validator"
        :options="{ required: true, email: true }"
        type="email"
        placeholder="Enter e-mail"
      />
      <ValidationInputComponent
        v-model="data.password"
        :validator="validator"
        :options="{ min: 5 }"
        type="password"
        placeholder="Enter password"
      />
    </div>
    <div>
      <ButtonComponent @click="handleClick">{{
        hasAccount ? 'Sign In' : 'Sign Up'
      }}</ButtonComponent>
      <p class="another-link">
        {{ hasAccount ? 'No account?' : 'Have account?' }}
        <span @click="hasAccount = !hasAccount">{{ !hasAccount ? 'Sign In' : 'Sign Up' }}</span>
      </p>
    </div>
  </form>
</template>

<style scoped>
form {
  display: block;
  background-color: var(--color-background);
  padding: 1.25rem;
  width: 100%;
  max-width: 400px;
  border-radius: 0.5rem;
  box-shadow:
    0 10px 15px 8px var(--color-border),
    0 4px 6px -2px var(--color-border-hover);
}

h1 {
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  color: var(--color-heading);
}

.another-link {
  color: var(--color-text);
  font-size: 0.875rem;
  text-align: center;
}

.another-link span {
  cursor: pointer;
  text-decoration: underline;
}

h1 {
  margin-bottom: 1.5rem;
}
.form__inputs {
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
  margin-bottom: 0.75rem;
}
button,
.error {
  margin-bottom: 0.75rem;
}
button {
  margin-top: 0.5rem;
}
</style>
