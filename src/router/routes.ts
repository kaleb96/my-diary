const routes = [
  {
    path: '/',
    component: import('@/layouts/WorkspaceLayout.vue'),
    children: [
      {
        path: '',
        name: '/',
        component: import('@/pages/WorkspacePage.vue')
      }
    ]
  },
  {
    path: '/welcome',
    component: import('@/pages/WelcomePage.vue')
  },
  {
    path: '/login',
    component: import('@/pages/LoginPage.vue')
  }
]

export default routes