<template>
  <v-sheet class="pa-12 mx-14 my-16" >
    <p></p>
    <h2 class="about-title text-center">¿Qué es Radiance?</h2>
    <v-spacer></v-spacer>
    <p class="description color text-center my-12">
      Radiance es un proyecto que busca ser el centro de información tecnológica más
      grande y confiable de la red global brindando informacion relevante de las
      tecnologías más importantes y cambiantes de nuestra era.
    </p>
    <v-spacer></v-spacer>
    <v-row justify="space-around">
       
      <v-col v-for="value in values" :key="value" cols="12" md="3">
        <v-sheet class="pa-12" height="300" >
          <div></div>
          <v-sheet class="mx-auto" height="100" width="100">
              <v-icon size="100" color="grey darken-4">{{value.icon}}</v-icon>
          </v-sheet>
          <div></div>
          <p></p>
          <h3 class="text-center about-title">{{value.title}}</h3>
          <p></p>
          <p class="text-center">{{value.text}}</p>
        </v-sheet>
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
        { title: "Verdad", icon: "mdi-shield-check", text: "Para transmitir siempre informacion confiable y segura." },
        { title: "Compromiso", icon: "mdi-handshake", text: "Con nuestros lectores brindando informacion de calidad." },
        { title: "Pasión", icon: "mdi-heart", text: "Por transmitir conocimientos valiosos de las tecnologias del momento" },
        { title: "Soporte", icon: "mdi-cog", text: "Ser una revista que sirva como herramienta de apoyo para todos los seguidores de la tecnología." },
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
  color:#000000 !important;
}
</style>
