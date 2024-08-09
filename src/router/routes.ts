const routes = [
  {
    path: '/',
    component: import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: '/',
        component: import('@/pages/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: import('@/pages/LoginPage.vue')
  },
]

export default routes