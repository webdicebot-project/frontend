import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/get-started',
    children: [
      {
        path: '/get-started',
        name: 'Get Started',
        component: () => import('@/views/GetStarted.vue'),
      },
      {
        path: '/bot-installer',
        name: 'Bot Installer',
        component: () => import('@/views/BotInstaller.vue'),
      },
      {
        path: '/awesome-scripts',
        name: 'Awesome Scripts',
        component: () => import('@/views/AwesomeScripts.vue'),
      },
      {
        path: '/buy-license',
        name: 'Buy License',
        meta: { requiresAuth: true },
        component: () => import('@/views/BuyLicense.vue'),
      },
      {
        path: '/my-license',
        name: 'My License',
        meta: { requiresAuth: true },
        component: () => import('@/views/MyLicense.vue'),
      },
      {
        path: '/import-license',
        name: 'Import License',
        meta: { requiresAuth: true },
        component: () => import('@/views/ImportLicense.vue'),
      },
      {
        path: '/my-wallet',
        name: 'My Wallet',
        meta: { requiresAuth: true },
        component: () => import('@/views/MyWallet.vue'),
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'logout',
        name: 'Logout',
        component: () => import('@/views/pages/Logout'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.name
  const token = localStorage.getItem('token') || null
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) next({ path: '/pages/login' })
  }
  next()
})

export default router
