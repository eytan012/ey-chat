
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/UserPage.vue'),meta: {authNotRequired: false}  },
      { path: '/chat/:userId', component: () => import('pages/ChatPage.vue'),meta: {authNotRequired: false}  },
      { path: '/auth', component: () => import('pages/AuthPage.vue'),meta: {authNotRequired: true}  },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
