import Vue from "vue";
import VueRouter from "vue-router";
import MainWebSite from "./components/MainWebSite.vue";
import Login from "./components/BarSites/Login.vue";
import Register from "./components/BarSites/Register.vue";
import Contact from "./components/BarSites/Contact.vue";
import Main from "./components/RadianceApp/Main.vue";
import Index from "./components/RadianceApp/Index.vue";
import store from "./store";

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
    path: "/radiance/",
    name: "Index",
    component: Index,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'Home',
        path: 'home/',
        component: () => import('@/components/RadianceApp/Home'),
        meta: {
          requiresAuth: true,
          accessLevel:2
        },
      },
      {
        name: 'Tags',
        path: 'tags/',
        component: () => import('@/components/RadianceApp/Tags'),
        meta: {
          requiresAuth: true,
          accessLevel:2
        },
      },
      {
        name: 'Users',
        path: 'users/',
        component: () => import('@/components/RadianceApp/Users'),
        meta: {
          requiresAuth: true,
          accessLevel:13
        },
      },
      {
        name: 'Payments',
        path: 'payments/',
        component: () => import('@/components/RadianceApp/Payments'),
        meta: {
          requiresAuth: true,
          accessLevel:3
        },
      },
      {
        name: 'Suscriptions',
        path: 'suscriptions/',
        component: () => import('@/components/RadianceApp/SuscriptionTypes'),
        meta: {
          requiresAuth: true,
          accessLevel:3
        },
      },
      {
        name: 'Articles',
        path: 'articles/',
        component: () => import('@/components/RadianceApp/Articles'),
        meta: {
          requiresAuth: true,
          accessLevel:2
        },
      },
      {
        name: 'Profile',
        path: 'profile/',
        component: () => import('@/components/RadianceApp/Profile'),
        meta: {
          requiresAuth: true,
          accessLevel:1
        },
      },
      {
        name: 'Magazine',
        path: 'magazine/',
        component: () => import('@/components/RadianceApp/Magazine'),
        meta: {
          requiresAuth: true,
          accessLevel:1
        },
      },
    ]

  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    //this route requires auth, check if is logged in
    //if not, redirects to login page

    if(!store.getters["isAuthenticated"]) {
      next( {
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router;
