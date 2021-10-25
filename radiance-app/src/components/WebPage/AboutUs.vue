<template ref="#aboutUs">
  <v-sheet class="pa-12 mx-14 my-10">
    <p></p>
    <h2 class="section-title text-center">¿Qué es Radiance?</h2>
    <v-spacer></v-spacer>
    <p class="description text-center my-12">
      Radiance es un proyecto que busca ser el centro de información tecnológica más
      grande y confiable de la red global, brindando información relevante de las
      tecnologías más importantes y cambiantes de nuestra era. Radiance inicia en 2021
      bajo una filosofía basada en los siguientes valores:
    </p>
    <v-spacer></v-spacer>
    <v-row justify="space-around">
      <v-col v-for="(value, index) in values" :key="index" lg="3" md="4" sx="12">
        <v-hover>
          <template v-slot:default="{ hover }">
            <div
              :class="`elevation-${hover ? 24 : 0}`"
              class="mx-auto pa-4 transition-swing"
            >
              <v-sheet class="pa-10" height="400">
                <v-sheet class="mx-auto my-2" height="150" width="150">
                  <v-icon size="150" color="grey darken-4">{{ value.icon }}</v-icon>
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
  name: "AboutUs",
  data() {
    return {
      values: [
        {
          title: "Verdad",
          icon: "mdi-shield-check",
          text: "Buscamos transmitir información confiable y segura.",
        },
        {
          title: "Compromiso",
          icon: "mdi-handshake",
          text: "Con nuestros lectores brindando informacion útil y de calidad.",
        },
        {
          title: "Pasión",
          icon: "mdi-heart",
          text: "Por transmitir conocimientos valiosos de las tecnologias del momento.",
        },
        {
          title: "Soporte",
          icon: "mdi-cog",
          text:
            "Servir como herramienta de apoyo para todos los seguidores de la tecnología.",
        },
      ],
    };
  },
};
</script>

<style>
h2.section-title {
  font-size: 48px !important;
  color: #212121 !important;
  font-family: "Noto Serif" !important;
  font-weight: bold !important;
}
h3.item-title {
  color: #212121 !important;
  font-family: "Montserrat" !important;
  font-weight: bold !important;
}

p.description {
  font-family: "Montserrat" !important;
  font-size: 18px !important;
  margin: 32px 0px !important;
  color: #212121 !important;
}
p.text {
  font-family: "Montserrat" !important;
  font-size: 18px !important;
  margin: 32px 0px !important;
  color: #212121 !important;
}
</style>
