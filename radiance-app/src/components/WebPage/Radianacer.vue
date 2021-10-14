<template>
  <v-sheet class="pa-12 mx-14 my-10">
    <p></p>
    <h2 class="about-title text-center">¿Eres un Radianacer?</h2>
    <v-spacer></v-spacer>
    <p class="description text-center my-12">
      La revista Radiance esta enfocada a ser un lugar informativo de soporte. Con las mas
      recientes noticias acerca de las tecnologías del momento, Radiance es el lugar para
      ti. En nuestra comunidad destacan los siguientes grupos.
    </p>
    <v-spacer></v-spacer>
    <v-row justify="space-around">
      <v-col v-for="value in values" :key="value"  lg="3" md="4" sx="12">
        <v-hover>
          <template v-slot:default="{ hover }">
            <div
              :class="`elevation-${hover ? 24 :0}`"
              class="mx-auto pa-6 transition-swing"
            >
              <v-sheet class="pa-10" height="400">
                <v-sheet class="mx-auto my-2" height="150" width="150">
                  <v-avatar class="mx-auto" size="150px">
                    <v-img :src="require('@/assets/' + value.img + '.jpg')"></v-img>
                  </v-avatar>
                </v-sheet>
                <h3 class="text-center item-title">{{ value.title }}</h3>
                <p class="text-center text">{{ value.text }}</p>
              </v-sheet>
            </div>
          </template>
        </v-hover>
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
