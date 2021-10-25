import Vue from 'vue'
import VueRouter from 'vue-router'
import MainWebSite from './components/MainWebSite.vue'

Vue.use(VueRouter)
const routes = [

    {
        path: '/',
        name: 'MainWebSite',
        component: MainWebSite
     },
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

export default router
