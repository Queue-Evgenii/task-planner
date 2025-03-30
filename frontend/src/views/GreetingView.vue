<script setup lang="ts">
import type { TaskApi } from '@/api/modules/Task';
import type { UserApi } from '@/api/modules/User';
import LoaderComponent from '@/components/LoaderComponent.vue';
import type { TaskDto } from '@/models/entities/TaskDto';
import type { HttpError } from '@/models/utils/browser/http/HttpError';
import type { HttpResponse } from '@/models/utils/browser/http/HttpResponse';
import { Token } from '@/models/utils/browser/Token';
import { useTaskListStore } from '@/stores/tasks';
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const taskListStore = useTaskListStore();
const taskApi = inject<TaskApi>("TaskApi")!;
const userApi = inject<UserApi>("UserApi")!;
const router = useRouter();
const timeout = ref(undefined);

const toNextRouteName = (name: string) => {
  if (timeout.value) return;
  setTimeout(() => {
    router.push({ name });
    clearTimeout(timeout.value);
  }, 1000)
}

const fetchTasks = () => {
  taskApi.getAllTasks()
    .then((res: HttpResponse<Array<TaskDto>>) => {
      taskListStore.setTasks(res.data);
      toNextRouteName('tasks');
    })
    .catch((err: HttpError) => {
      switch (err.status) {
        case 401:
          Token.remove();
          toNextRouteName('auth');
          break;
        case 500:
          toNextRouteName('server-error');
          break;
        default:
          toNextRouteName('server-error');
      }
      console.log("GreetingView.vue fetchTasks Error", err);
    });
};

const fetchUserData = () => {
  //userApi.getMe()
};

onMounted(() => {
  fetchTasks();
  fetchUserData();
});

</script>

<template>
  <div class="greeting _flex _f-dir-col _ai-c _jc-sb _gap-y-32">
    <span></span>
    <h1 class="greeting__title _title">Hello! <span>&#128522;</span></h1>
    <div class="greeting__loader">
      <LoaderComponent />
    </div>
  </div>
</template>

<style lang="scss">
.greeting {
  width: 100%;
  height: 100%;
  &__title {
    font-size: 2rem;
  }
  &__loader {
    max-width: 300px;
    padding: 16px 0;
  }
}
</style>
