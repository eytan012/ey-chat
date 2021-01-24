import Vue from 'vue'
import VueRouter from 'vue-router'
import {firebaseAuth, firebaseDb} from "boot/firebase";
import routes from './routes'

Vue.use(VueRouter)

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    console.log('check')
    const user = firebaseAuth.app.auth().currentUser
    if (!user && !to.meta.authNotRequired) {
      const path = !user ? "/auth" : "/";
      return next(path)
    }
    next()
  })

  return Router
}
