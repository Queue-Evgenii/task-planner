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
  ],
});

export default router;
