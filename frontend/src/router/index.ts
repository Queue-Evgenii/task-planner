import { Token } from '@/models/utils/browser/Token';
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
  if (to.name === 'greeting') return next();
  if (from.name === undefined) {
    console.log('Redirect to greeting');
    return next({ name: 'greeting' });
  }
  if (to.name === 'auth' && Token.exists()) {
    console.log('Redirect to profile');
    return next({ name: 'profile' });
  }
  next();
});

export default router;
