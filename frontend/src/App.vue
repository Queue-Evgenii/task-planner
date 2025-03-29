<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { Token } from './models/utils/browser/Token';
import { useTaskListStore } from './stores/tasks';
import type { TaskApi } from './api/modules/Task';
import { inject } from 'vue';

const router = useRouter();

const goToAuth = () => {
  router.push({ name: 'auth' });
}
const goToHome = () => {
  router.push({ name: 'home-root' });
}

const getTaskListFromDB = () => {
  const taskListStore = useTaskListStore();
  const api = inject<TaskApi>("TaskApi")!;
  api.getAllTasks()
    .then(res => {
      taskListStore.setTasks(res.data);
      goToHome();
    })
    .catch(err => {
      console.log("App.vue getAllTasks Err", err);
      goToAuth();
    })
}

if (Token.get().length > 0) {
  getTaskListFromDB();
} else {
  goToAuth();
}
</script>

<template>
  <RouterView />
</template>
