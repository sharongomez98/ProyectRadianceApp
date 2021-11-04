<template>
  <v-app>
    <v-app-bar app color="white" light elevation="6" elevate-on-scroll>
    <v-icon color="#F37154" large>mdi-lightning-bolt</v-icon>
    <v-toolbar-title>Radiance</v-toolbar-title>
    <v-spacer />
    <v-list class="d-flex align-center" dense>
      <v-list-item link v-for="(menu, index) in menus" :key="index" :to="menu.route">
        <v-list-item-title>{{ menu.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-app-bar>
    <v-main>
      <ContactMain />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Contact",

  components: {
    ContactMain: () => import("./ContactMain.vue"),
  },

  data: () => ({
    type: "element",
    selected: "",
    duration: 1000,
    offset: 0,
    easing: "easeInOutCubic",
    route: 0,
      menus: [
        
        { title: "Registrate", route: "/register" },
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
.v-toolbar__title {
  font-size: 36px !important;
  color: #000000;
  font-family: "Noto Serif" !important;
  font-weight: 700 !important;
}
.v-list-item__title {
  font-size: 16px !important;
  color: #000000;
  font-family: "Montserrat" !important;
  font-weight: 300;
}
.v-tabs {
  height: 4rem !important;
  margin: -120px !important;
}
.v-tab {
  font-size: 16px !important;
  text-transform: none !important;
  font-family: "Montserrat" !important;
  font-weight: 400 !important;
}
</style>
