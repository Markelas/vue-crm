import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import firebase from 'firebase/compat/app'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'loginForm',
    meta: { layout: 'empty' }, // Серый фон
    component: () => import('../views/LoginForm.vue') // Lazy loading
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main', auth: true }, // Основной фон
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/detail-record',
    name: 'detail-record',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/DetailRecord.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/History.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Record.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Вызывается при смене роутера и можно добавить проверку на авторизацию
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser // Проверяем, есть ли что-то, если да, то пользователь залогинился
  const requireAuth = to.matched.some(record => record.meta.auth) // Проверка, нужна ли авторизация

  if (requireAuth && !currentUser) { // Если нужна авторизация, а пользователь не зашел
    next('/login?message=login') // Показываем сообщение и перемещаем на страницу с логином
  } else { // Если все корректно
    next() // Переход на нужную страницу
  }
})

export default router
