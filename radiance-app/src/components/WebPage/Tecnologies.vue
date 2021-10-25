<template>
  <v-sheet class="pa-12 mx-14 my-10">
    <h2 class="about-title text-center pa-6">Tecnologías</h2>
    <p class="description text-center my-12">
      El proyecto Radiance cuenta con una gran lista de tecnologías por las que esta al pendiente
      para poder brindarte la información que como Radianacer necesitas, en el momento adecuado. Una muestra
      de las tecnologías con las que trabajamos para mantenerte al tanto son:
    </p>
    <v-spacer></v-spacer>
    <v-row justify="center">
      <v-col v-for="(value, index) in values" :key="index"  lg="3" md="4" sx="12" class="px-12">
        <v-hover>
          <template v-slot:default="{ hover }">
            <div :class="`elevation-${hover ? 24 : 0}`" class="mx-auto transition-swing">
              <v-sheet :color="value.color" class="pa-10" height="300" min-width="20vh">
                  <v-row justify="center" class="pa-3">
                  <v-icon size="150" color="grey-darken-4">{{ value.icon }}</v-icon>
                </v-row>
                <v-row justify="center" class="py-3">
                  <h3 class="text-center item-title">{{ value.title }}</h3>
                </v-row>
              </v-sheet>
            </div>
          </template>
        </v-hover>
      </v-col>
    </v-row>
    <p class="description color text-center pt-8">... y muchas más!</p>
  </v-sheet>
</template>
<script>
export default {
  name: "Tecnologies",
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
