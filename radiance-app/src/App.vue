<template>
  <v-app>
    <Header/>
    <v-main>
      <Hero />
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/WebPage/Header.vue';
import Hero from "./components/WebPage/Hero.vue";

export default {
  name: 'App',

  components: {
    Header,
    Hero
  },

  data: () => ({
    //
  }),
};
</script>
