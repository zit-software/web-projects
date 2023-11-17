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
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/cart/CartView.vue')
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import('@/views/customer/CustomerView.vue')
    }
  ]
})

export default router
