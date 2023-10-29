// Composables
import { createRouter, createWebHistory } from 'vue-router'
import ListBusiness from '../views/ListBusiness.vue';
import DetailBusiness from '../views/DetailBusiness.vue';

const routes = [
  // {
  //   path: '/',
  //   component: () => import('@/layouts/default/Default.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'Home',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  //     },
  //   ],
  // },
  {
    path: '/',
    name: 'ListBusiness',
    component: ListBusiness,
  },
  {
    path: '/detail/:id',
    name: 'DetailBusiness',
    component: DetailBusiness
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
