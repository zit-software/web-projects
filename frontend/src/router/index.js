import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      children: [
        {
          path: '/login',
          component: () => import('@/views/auth/LoginView.vue')
        }
      ]
    }
  ]
})

export default router
