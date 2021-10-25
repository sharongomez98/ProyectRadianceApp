<template>
  <v-app-bar app color="white" light elevation="6" elevate-on-scroll>
    <v-icon color="#F37154" large>mdi-lightning-bolt</v-icon>
    <v-toolbar-title>Radiance</v-toolbar-title>
    <v-spacer />
    <v-list class="d-flex align-center">
      <v-list-item link v-for="(menu, index) in menus" :key="index" :to="menu.route">
        <v-list-item-title>{{ menu.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <div>
      <p>{{route}}</p>
    </div>
    <template v-slot:extension>
      <v-tabs
        ref="s"
        dark
        align-with-title
        fixed-tabs
        background-color="grey darken-4"
        show-arrows
        v-model="route" 
        @change='passTabProperties()'
      >
        <v-tabs-slider color="#F37154" ></v-tabs-slider>
        <v-tab v-for="(section, index) in sections" :key="index" >
          {{ section.title }}
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
      route: 0,
      menus: [
        { title: "Registrate", route: "home" },
        { title: "Ingresar", route: "about-us" },
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
  methods: {
    passTabProperties() {
      this.$emit('chanceNav', this.route)
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
