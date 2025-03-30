import type { HttpError } from '@/models/utils/browser/http/HttpError';
import type { HttpResponse } from '@/models/utils/browser/http/HttpResponse';
import { Token } from '@/models/utils/browser/Token';
import { useTaskListStore } from '@/stores/tasks';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home',
    },
    {
      path: '/',
      name: 'greeting',
      component: import('@/views/GreetingView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: import('@/views/AuthView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: import('@/views/HomeView.vue'),
      children: [
        {
          path: '',
          name: 'home-root',
          redirect: '/home/tasks',
        },
        {
          path: 'profile',
          name: 'profile',
          component: import('@/views/home/ProfileView.vue'),
        },
        {
          path: 'tasks',
          name: 'tasks',
          component: import('@/views/home/TasksView.vue'),
        },
      ],
    },
    {
      path: '/server-error',
      name: 'server-error',
      component: import('@/views/ServerErrorView.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const taskListStore = useTaskListStore();

  if (!Token.exists()) {
    if (to.name === 'auth') {
      return next();
    }
    return next({ name: 'auth' });
  }

  if (Array.isArray(taskListStore.taskList) && taskListStore.taskList.length > 0) {
    return next();
  }

  if (to.name === 'server-error') {
    return next();
  }

  try {
    await taskListStore.fetchTasks();
  } catch (err: unknown) {
    const error = err as HttpError;
    console.log(error.status)
    switch (error.status) {
      case 500:
        return next({ name: 'server-error' });
      case 401:
        Token.remove();
        return next({ name: 'auth' });
      default:
        return next({ name: 'server-error' });
    }
  }
  next({ name: 'home-root' })
});

export default router;
