<script setup lang="ts">
import { authorization, registration } from '@/api/auth';
import ButtonComponent from '@/components/form/ButtonComponent.vue';
import InputComponent from '@/components/form/InputComponent.vue';
import { User } from '@/models/user';
import { ref } from 'vue';

const hasAccount = ref(true);
const email = ref("");
const password = ref("");
const name = ref("");
const surname = ref("");
const error = ref("");

const authorizate = (user: User) => {
  authorization(user)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
const registrate = (user: User) => {
  registration(user)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

const handleClick = () => {
  const user = new User(email.value, password.value, name.value, surname.value)

  if (hasAccount.value) {
    authorizate(user);
    return;
  }
  registrate(user);
}
</script>

<template>
  <form class="form">
    <h1>{{ hasAccount ? "Sign In" : "Sign Up" }}</h1>
    <InputComponent v-model="email" type="email" placeholder="Enter e-mail" />
    <InputComponent v-model="password" type="password" placeholder="Enter password" />
    <template v-if="!hasAccount">
      <InputComponent v-model="name" type="name" placeholder="Enter first name" />
      <InputComponent v-model="surname" type="surname" placeholder="Enter last name" />
    </template>
    <div>
      <ButtonComponent @click="handleClick">{{ hasAccount ? "Sign In" : "Sign Up" }}</ButtonComponent>
      <p v-if="error.length > 0" class="error">
        {{ error }}
      </p>
      <p class="another-link">
        {{ hasAccount ? "No account?" : "Have account?" }}
        <span @click="hasAccount = !hasAccount">{{ !hasAccount ? "Sign In" : "Sign Up" }}</span>
      </p>
    </div>
  </form>
</template>

<style scoped>
form {
  display: block;
  row-gap: 12px;
  background-color: var(--color-background);
  padding: 1.25rem;
  max-width: 400px;
  min-width: 300px;
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

.error {
  color: var(--color-text-error);
  font-size: 0.875rem;
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
input, button, .error {
  margin-bottom: .75rem;
}
button {
  margin-top: .5rem;
}
</style>
