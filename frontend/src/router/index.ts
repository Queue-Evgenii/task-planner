import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/home/dashboard',
      name: 'home-dashboard',
      component: import('@/views/DashboardView.vue'),
    },
  ],
})

export default router
