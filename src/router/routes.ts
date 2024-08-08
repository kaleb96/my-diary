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
  }
]

export default routes