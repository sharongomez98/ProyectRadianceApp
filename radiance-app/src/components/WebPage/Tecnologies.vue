<template>
  <v-sheet class="pa-12 mx-14 my-16">
    <p></p>
    <h2 class="about-title text-center">Personalización</h2>
    <v-spacer></v-spacer>
    <p class="description color text-center my-12">
      La revista Radiance esta enfocada a ser un lugar informativo de soporte. Con las mas
      recientes noticias acerca de las tecnologías del momento, Radiance es el lugar para
      ti. En nuestra comunidad destacan los siguientes grupos.
    </p>
    <v-spacer></v-spacer>
    
    <v-row justify="space-around" class="mx-12 my-6">
      <v-col v-for="value in values" :key="value" cols="12" md="3">
        <v-sheet
          class="pa-6 mx-auto"
          height="150"
          width="100"
          elevation="2"
          min-width="30vh"
          :color="value.color"
        >
          <v-row>
            <v-col cols="6">
              <v-icon size="100" class="mx-auto" color="grey-darken-4">{{ value.icon }}</v-icon>
            </v-col>
            <v-col cols="6" class="py-12">
                <h3 class="text-center about-title">{{ value.title }}</h3>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <p class="description color text-center mt-8">
      ... y muchas más!
    </p>
  </v-sheet>
</template>
<script>
export default {
  name: "Radianacer",
  data() {
    return {
      values: [
        { title: "Python", icon: "mdi-language-python", color: "#D9FFC7" },
        { title: "Java", icon: "mdi-language-java", color: "#F1DBDB" },
        { title: "R", icon: "mdi-language-r", color: "#BAD7D9" },
        { title: "Javascript", icon: "mdi-language-javascript", color: "#E9DD9D" },
        { title: "Swift", icon: "mdi-language-swift", color: "#FFD0A5" },
        { title: "Php", icon: "mdi-language-php", color: "#DFD2FB" },
        { title: "Ruby", icon: "mdi-language-ruby", color: "#E89898" },
        { title: "Vue.js", icon: "mdi-vuejs", color: "#B8D6BD" },
        { title: "Typescript", icon: "mdi-language-typescript", color: "#A7DFF0" },
        { title: "Angular", icon: "mdi-angular", color: "#FF8585" },
        { title: "React", icon: "mdi-react", color: "#C7F9F9" },
        { title: "Kotlin", icon: "mdi-language-kotlin", color: "#FFD39F" },
      ],
    };
  },
};
</script>

<style>
h2.about-title {
  font-size: 48px !important;
  color: grey-darken-4;
  font-family: "Noto Serif" !important;
  font-weight: bold !important;
}
h3.about-title {
  color: grey darken-4 !important;
  font-family: "Montserrat" !important;
  font-weight: bold !important;
}

p.color {
  color: #000000 !important;
}
</style>
