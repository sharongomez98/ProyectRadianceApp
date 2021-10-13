<template>
  <v-app>
    <Header/>
    <v-main>
      <Hero />
      <AboutUs />
      <Radianacer />
      <Tecnologies />
      <Team />
      <Suscribe />
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/WebPage/Header.vue';
import Hero from "./components/WebPage/Hero.vue";
import AboutUs from "./components/WebPage/AboutUs.vue";
import Radianacer from "./components/WebPage/Radianacer.vue"
import Tecnologies from "./components/WebPage/Tecnologies.vue"
import Team from "./components/WebPage/Team.vue"
import Suscribe from "./components/WebPage/Suscribe.vue"
import Footer from "./components/WebPage/Footer.vue"

export default {
  name: 'App',

  components: {
    Header,
    Hero,
    AboutUs,
    Radianacer,
    Tecnologies,
    Team,
    Suscribe,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
