import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/SignUpView.vue'
import SignInView from '@/views/SignInView.vue'
import DashboardView from '@/views/DashboardView.vue'

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
      component: SignUpView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    }
  ]
})

let authStateChecked = false;

router.beforeEach(async (to, from, next) => {
    if (!authStateChecked) {
        const auth = getAuth();
        try {
            await new Promise((resolve) => {
                onAuthStateChanged(auth, (user) => {
                    authStateChecked = true;
                    resolve(user);
                });
            });

            const user = auth.currentUser;
            if (to.path !== '/signin' && !user) {
                next('/signin');
            } else {
                next();
            }
        } catch (error) {
            console.error('Error checking authentication state:', error);
            next('/signin');
        }
    } else {
        next();
    }
});

export default router
