<template>
  <v-sheet class="pa-12 mx-14 my-16">
    <p></p>
    <h2 class="about-title text-center">Nuestro Equipo</h2>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-row justify="space-around" class="py-6">
      <v-col v-for="value in values" :key="value" cols="12" md="12">
        <v-sheet class="pa-6 mx-auto" width="150vh" elevation="2" min-width="50vh">
          <v-row>
            <v-col cols="6" class="py-12">
                <h2 class="text-center about-title team pa-6">{{ value.title }}</h2>
                <p class="text-left format px-2">{{ value.text }}</p>
            </v-col>
            <v-col cols="6">
              <v-img :src="require('@/assets/' + value.img + '.jpg')"></v-img>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script>
export default {
  name: "Team",
  data() {
    return {
      values: [
        {
          title: "Más de 50 ...",
          img: "team",
          text: "personas de distintas partes del mundo, trabajadores informáticos que comparten la pasión por la tecnología que plasman sus conocimientos, ideas y experiencias con las tendencias más actuales del mercado.",
        },
      ],
    };
  },
};
</script>

<style>
h2.about-title {
  font-size: 48px !important;
  color: grey darken-4;
  font-family: "Noto Serif" !important;
  font-weight: bold !important;
}
h3.about-title {
  color: grey darken-4 !important;
  font-family: "Montserrat" !important;
  font-weight: bold !important;
}
h2.team {
    font-size: 96px !important;
}

p.color {
  color: #000000 !important;
}

p.format {
    font-size: 24px !important;
    font-family: "Montserrat" !important;
}
</style>
