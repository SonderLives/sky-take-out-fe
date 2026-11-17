import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouter } from './routers'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRouter,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
