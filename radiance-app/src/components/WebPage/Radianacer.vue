<template ref="#radianacer">
  <v-sheet class="pa-12 mx-14 my-10">
    <p></p>
    <h2 class="section-title text-center">¿Eres un Radianacer?</h2>
    <v-spacer></v-spacer>
    <p class="description text-center my-12">
      El proyecto Radiance esta enfocado a ser un lugar informativo y de soporte con las más
      recientes noticias acerca de las tecnologías del momento, Si amas la tecnología y buscas estar a la vanguardia, Radiance es el lugar para
      ti. Nuestra comunidad de Radianacers esta conformada en su mayoría por:
    </p>
    <v-spacer></v-spacer>
    <v-row justify="space-around">
      <v-col v-for="(value, index) in values" :key="index" lg="3" md="4" sx="12">
        <v-hover>
          <template v-slot:default="{ hover }">
            <div
              :class="`elevation-${hover ? 24 : 0}`"
              class="mx-auto pa-6 transition-swing"
            >
              <v-sheet class="pa-10" height="420">
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
          text: "Que buscan estar al tanto de las tecnologías que utilizan en sus empresas.",
        },
        {
          title: "Estudiantes",
          img: "student",
          text: "Que buscan encontrar y desarrollar sus habilidades en sus tecnologías favoritas.",
        },
        {
          title: "Entusiastas",
          img: "fan",
          text: "Que con pasión buscan un lugar para empezar en el mundo del desarrollo.",
        },
      ],
    };
  },
};
</script>
