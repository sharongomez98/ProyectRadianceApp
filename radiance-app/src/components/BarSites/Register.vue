<template>
  <v-app>
    <v-app-bar app color="grey darken-4" dark light elevation="6" elevate-on-scroll>
    <v-icon color="#F37154" large>mdi-lightning-bolt</v-icon>
    <v-toolbar-title id="register_toolbar">Radiance</v-toolbar-title>
    <v-spacer />
    <v-list  class="d-flex align-center" dense>
      <v-list-item link v-for="(menu, index) in menus" :key="index" :to="menu.route">
        <v-list-item-title id="register_list">{{ menu.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-app-bar>
    <v-main>
      <RegisterRadiance />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",

  components: {
    RegisterRadiance: () => import("./RegisterRadiance.vue"),
  },

  data: () => ({
    type: "element",
    selected: "",
    duration: 1000,
    offset: 0,
    easing: "easeInOutCubic",
    route: 0,
      menus: [
        { title: "Contáctanos", route: "/contact" },
        { title: "Ingresar", route: "/login" },
        { title: "Inicio", route: "/" }, 
        
      ],
  }),
};
</script>
<style>
.v-toolbar {
  padding: 0px 100px;
}
#register_toolbar {
  font-size: 36px !important;
  color: #ffffff;
  font-family: "Noto Serif" !important;
  font-weight: 700 !important;
}
#register_list {
  font-size: 16px !important;
  color: #ffffff;
  font-family: "Montserrat" !important;
  font-weight: 300;
}
</style>
