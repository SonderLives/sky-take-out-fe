export const constantRouter = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/LoginPage.vue'),
    meta: { title: '苍穹外卖' },
  },
  {
    // 主页面
    path: '/',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    // 404页面
    path: '/404',
    component: () => import('../views/404Page.vue'),
  },
  {
    path: '/employee',
    component: () => import('../views/employee/EmployeePage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
