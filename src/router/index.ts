import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/collections/:id',
    name: 'collections',
    component: () => import(/* webpackChunkName: "Collections" */ '../views/Collections.vue')
  },
  {
    path: '/mockHandBook',
    name: 'mockHandBook',
    component: () => import(/* webpackChunkName: "MockHandBook" */ '../views/MockHandBook.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
