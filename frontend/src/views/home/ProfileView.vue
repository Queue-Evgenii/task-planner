<script setup lang="ts">
import type { UserDto } from '@/models/entities/UserDto';
import { computed } from 'vue';


const userData: Partial<UserDto> = {
  name: "Test Name",
  surname: "Test Surname",
  email: "email@email.email",
}
const fullname = computed(() => {
  return (userData.name ? userData.name : '') + (userData.surname ? ' ' + userData.surname : '');
})
const handleClick = () => {};
</script>

<template>
  <div class="profile">
    <div class="profile__container _container _flex _f-dir-col _gap-y-12">
      <h2 class="profile__title">Hello, {{ fullname }} &#128075;</h2>
      <h3 class="profile__email">Verified with <span>{{ userData.email }}</span></h3>
      <button @click="handleClick" class="profile__button _button-danger">Log Out</button>
    </div>
  </div>
</template>

<style lang="scss">
.profile {
  &__title {
    font-size: 1.5rem;
    padding: 16px 0;
    border-bottom: 1px solid var(--color-border);
  }
  &__email {
    font-size: 1rem;
    padding: 12px 0;
    span {
      text-decoration: underline;
    }
  }
  &__button {
    max-width: 200px;
  }
}
</style>
