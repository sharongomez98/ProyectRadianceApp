import Vue from "vue";
import VueRouter from "vue-router";
import MainWebSite from "./components/MainWebSite.vue";
import Login from "./components/BarSites/Login.vue";
import Register from "./components/BarSites/Register.vue"
import Contact from "./components/BarSites/Contact.vue"
import Main from "./components/RadianceApp/Main.vue"

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
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
