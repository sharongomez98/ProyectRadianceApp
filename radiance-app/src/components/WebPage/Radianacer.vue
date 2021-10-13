<template>
  <v-sheet class="pa-12 mx-14 my-16">
    <p></p>
    <h2 class="about-title text-center">¿Eres un Radianacer?</h2>
    <v-spacer></v-spacer>
    <p class="description color text-center my-12">
      La revista Radiance esta enfocada a ser un lugar informativo de soporte. Con las mas
      recientes noticias acerca de las tecnologías del momento, Radiance es el lugar para
      ti. En nuestra comunidad destacan los siguientes grupos.
    </p>
    <v-spacer></v-spacer>
    <v-row justify="space-around">
      <v-col v-for="value in values" :key="value" cols="12" lg="2" md="2">
        <v-sheet class="pa-14 mx-auto"  height="400" elevation="2" min-width="30vh">
          <div></div>
          <v-sheet class="mx-auto my-2" height="150" width="150">
            <v-avatar class="mx-auto" size="150px">
              <v-img :src="require('@/assets/' + value.img + '.jpg')"></v-img>
            </v-avatar>
          </v-sheet>
          <h3 class="text-center about-title">{{ value.title }}</h3>
          <p></p>
          <p class="text-center">{{ value.text }}</p>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script>
export default {
  name: "Radianacer",
  data() {
    return {
      values: [
        {
          title: "Trabajadores",
          img: "worker",
          text: "Para transmitir siempre informacion confiable y segura.",
        },
        {
          title: "Estudiantes",
          img: "student",
          text: "Con nuestros lectores brindando informacion de calidad.",
        },
        {
          title: "Entusiastas",
          img: "fan",
          text: "Por transmitir conocimientos valiosos de las tecnologias del momento",
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

p.color {
  color: #000000 !important;
}
</style>
