import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/SignUpView.vue'
import SignInView from '@/views/SignInView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { authStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: {
        auth: false
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
      meta: {
        auth: false
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthRequired = to.meta.auth
  const isUserLoggedIn = !!authStore.userInfo.token

  if (isAuthRequired && !isUserLoggedIn) {
    next('/signin')
  } else if (!isAuthRequired && isUserLoggedIn) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
