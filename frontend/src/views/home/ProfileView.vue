<script setup lang="ts">
import { withErrorHandling } from '@/api/ApiErrorHandler';
import type { UserApi } from '@/api/modules/user/User';
import type { UserDto } from '@/models/entities/UserDto';
import type { HttpError } from '@/models/utils/browser/http/HttpError';
import type { HttpResponse } from '@/models/utils/browser/http/HttpResponse';
import { Token } from '@/models/utils/browser/Token';
import { useTaskListStore } from '@/stores/tasks';
import { useUserStore } from '@/stores/user';
import { inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const userApi = inject<UserApi>('UserApi')!;
const userStore = useUserStore();
const taskListStore = useTaskListStore();
const router = useRouter();

const fetchUser = () => {
  if (userStore.user !== undefined) return;
  withErrorHandling(userApi.getUser())
    .then((res: HttpResponse<UserDto>) => {
      userStore.setUser(res.data);
    })
    .catch((err: HttpError) => console.log("ProfileView.vue fetchUser Error", err))
}
const logout = () => {
  Token.remove();
  userStore.clearState();
  taskListStore.clearState();
  router.push({ name: 'auth' });
};

onMounted(() => {
  fetchUser();
})
</script>

<template>
  <div v-if="userStore.user" class="profile">
    <div class="profile__container _container _flex _f-dir-col _gap-y-12">
      <h2 class="profile__title">Hello, {{ userStore.fullname }} &#128075;</h2>
      <h3 class="profile__email">Verified with <span>{{ userStore.user.email }}</span></h3>
      <button @click="logout" class="profile__button _button-danger">Log Out</button>
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
