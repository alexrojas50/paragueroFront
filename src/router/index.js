import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { authUser } from 'src/utils'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from) => {
    await authUser.value.verifyToken()

    if (!authUser.value.isAuth && (to.fullPath !== '/' && to.fullPath !== '/login' && to.fullPath !== '/register')) {
      return { name: 'Login' }
    }

    if (to.fullPath == '/' || to.fullPath == '/login' || to.fullPath == '/register') {
      switch (authUser.value.level) {
        case 1:
          return { name: 'Admin' }
          break;
        case 2:
          return { name: 'Client' }
          break;
        default:
          break;
      }
    }

    if (authUser.value.userLevel == 3 && (!to.fullPath.startsWith('/teacher'))) {
      // return { name: 'Teacher' }
    }

    if (authUser.value.userLevel == 2 && (!to.fullPath.startsWith('/client'))) {
      return { name: 'Client' }
    }

    if (authUser.value.userLevel == 1 && (!to.fullPath.startsWith('/admin'))) {
      return { name: 'Admin' }
    }
  })

  return Router
})
