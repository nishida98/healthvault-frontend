import { createRouter, createWebHistory } from 'vue-router'
import LandingView from './views/LandingView.vue'
import ExamsView from './views/ExamsView.vue'
import SignInView from './views/SignInView.vue'
import SignUpView from './views/SignUpView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInView,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView,
    },
    {
      path: '/exams',
      name: 'exams',
      component: ExamsView,
    },
  ],
})
