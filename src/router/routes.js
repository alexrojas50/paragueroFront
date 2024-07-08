import { authUser } from 'src/utils'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    name: 'Index',
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), name: 'Index' },
      { path: 'login', component: () => import('pages/LoginPage.vue'), name: 'Login' },
      { path: 'register', component: () => import('pages/RegisterPage.vue'), name: 'Register' }
    ],
  },

  {
    path: '/client',
    component: () => import('layouts/MainLayout.vue'),
    name: 'Client',
    children: [
      { path: '', component: () => import('src/pages/client/ClientPage.vue'), name: 'Client' },
      { path: 'inscribe', component: () => import('pages/client/InscribePage.vue'), name: 'ClientInscribe' }
    ],
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    name: 'Admin',
    children: [
      { path: '', component: () => import('src/pages/admin/AdminPage.vue'), name: 'Admin' },
      { path: 'courses', component: () => import('src/pages/admin/CoursesPage.vue'), name: 'AdminCourses' },
      { path: 'rooms', component: () => import('src/pages/admin/RoomsPage.vue'), name: 'AdminRooms' },
      { path: 'users', component: () => import('src/pages/admin/UsersPage.vue'), name: 'AdminUsers' },
      { path: 'meets', component: () => import('src/pages/admin/MeetsPage.vue'), name: 'AdminMeets' }
    ],
    beforeEnter: (to, from, next) => authUser.value.verifyAdminRoute(next)
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
