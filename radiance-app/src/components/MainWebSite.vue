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
    <template v-slot:extension>
      <v-tabs
        ref="s"
        dark
        align-with-title
        fixed-tabs
        background-color="grey darken-4"
        show-arrows
        v-model="route"
        @change="$vuetify.goTo(target, options)"
        
      >
        <v-tabs-slider color="#F37154" ></v-tabs-slider>
        <v-tab v-for="(section, index) in sections" :key="index" >
          {{ section.title }}
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
    <v-main>
      <div ref="hero"><Hero /></div>
      <div ref="aboutUs"><AboutUs /></div>
      <div ref="radianacer"><Radianacer /></div>
      <div ref="tecnologies"><Tecnologies /></div>
      <div ref="team"><Team /></div>
      <div ref="suscribe"><Suscribe /></div>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "MainWebSite",

  components: {
    Hero: () => import("./WebPage/Hero.vue"),
    AboutUs: () => import("./WebPage/AboutUs.vue"),
    Radianacer: () => import("./WebPage/Radianacer.vue"),
    Tecnologies: () => import("./WebPage/Tecnologies.vue"),
    Team: () => import("./WebPage/Team.vue"),
    Suscribe: () => import("./WebPage/Suscribe.vue"),
    Footer: () => import("./WebPage/Footer.vue"),
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
        { title: "Registrate", route: "/register" },
        { title: "Ingresar", route: "/login" },
      ],
      sections: [
        { title: "Inicio" },
        { title: "¿Qué es Radiance?" },
        { title: "¿Eres un Radianacer?" },
        { title: "Tecnologías" },
        { title: "Nuestro Equipo"},
        { title: "Suscribete Ya!" },
      ],
  }),
  computed: {
    target() {
      return this[this.type];
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      };
    },
    element() {
      if (this.route == 0) return this.$refs.hero;
      if (this.route == 1) return this.$refs.aboutUs;
      if (this.route == 2) return this.$refs.radianacer;
      if (this.route == 3) return this.$refs.tecnologies;
      if (this.route == 4) return this.$refs.team;
      if (this.route == 5) return this.$refs.suscribe;
      else return null;
    },
  },
  methods: {
    changeRoute() {
      this.$emit("changeRoute", this.route);
    },
  },
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
