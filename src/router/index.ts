import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/404',
      name: '404',
      component: import('../components/404View.vue'),
    },
    {
      path: '/c',
      component: import('../views/container/ContainerView.vue'),
      redirect: '/c/p1',
      // 嵌套路由
      children: [
        {
          path: '/c/p1',
          component: () => import('../views/container/P1View.vue'),
        },
        {
          path: '/c/p2',
          component: () => import('../views/container/P2View.vue'),
        },
        {
          path: '/c/p3',
          component: () => import('../views/container/P3View.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})

export default router
