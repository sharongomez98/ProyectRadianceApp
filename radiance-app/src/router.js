import Vue from "vue";
import VueRouter from "vue-router";
import MainWebSite from "./components/MainWebSite.vue";
import Login from "./components/BarSites/Login.vue";
import Register from "./components/BarSites/Register.vue"
import Contact from "./components/BarSites/Contact.vue"
import Main from "./components/RadianceApp/Main.vue"
import store from './store'

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "MainWebSite",
    component: MainWebSite,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/home",
    name: "Main",
    component: Main,
    meta: {
      requiresAuth: true
  }
  },
  {
    path: "/tags",
    name: "Main",
    component: Main,
    meta: {
      requiresAuth: true,
      module: "tags"
  }
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let authenticatedUser = store.getters['isAuthenticated']
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authenticatedUser) next('/login')
  else next();
});

export default router;
