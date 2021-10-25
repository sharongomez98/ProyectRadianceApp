<template>
  <v-sheet class="pa-12 mx-14 my-10">
    <h2 class="section-title text-center pa-6">Nuestro Equipo</h2>
    <v-row justify="space-around" class="py-6">
      <v-col v-for="(value, index) in values" :key="index">
        <v-hover>
          <template v-slot:default="{ hover }">
            <div
              :class="`elevation-${hover ? 24 : 0}`"
              class="mx-auto pa-4 transition-swing"
            >
              <v-sheet class="pa-8" min-width="20vh">
                <v-row align="center" justify="start">
                  <v-col lg="6" md="6" sx="4">
                    <h2 class="text-left big-title pa-6">{{ value.title }}</h2>
                    <p class="text-left format px-2">{{ value.text }}</p>
                  </v-col>
                  <v-col lg="6" md="6" sx="4">
                    <v-img :src="require('@/assets/' + value.img + '.jpg')"></v-img>
                  </v-col>
                </v-row>
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
  name: "Team",
  data() {
    return {
      values: [
        {
          title: "Más de 50 ...",
          img: "team",
          text:
            "personas de distintas partes del mundo; trabajadores informáticos que comparten la pasión por la tecnología que buscan plasmar sus conocimientos, ideas y experiencias con las tendencias más actuales del mercado.",
        },
      ],
    };
  },
};
</script>

<style>
h2.big-title {
  font-size: 75px !important;
  color: #212121 !important;
  font-family: "Montserrat" !important;
  font-weight: 500 !important;
}
</style>
