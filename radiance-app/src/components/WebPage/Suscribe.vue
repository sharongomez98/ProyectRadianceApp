<template>
  <v-sheet class="pa-12 mx-14 my-16">
    <p></p>
    <h2 class="about-title text-center">Suscribete Ya!</h2>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-row justify="space-around" class="py-12">
      <v-col v-for="value in values" :key="value" >
        <v-sheet dark :color="value.color" class="pa-6 mx-auto" width="400px" elevation="2">
          <v-row justify="space-around">
            <v-col class="py-12">
                <p class="text-center  px-2">{{ value.text }}</p>
                <h2 class="text-center about-title team pa-6">{{ value.price }}</h2>
                <v-btn block color="grey darken-4" dark x-large>¡Suscribete ya!</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script>
export default {
  name: "Suscribe",
  data() {
    return {
      values: [
        {
          color: "#F37154",
          price: "$4.99",
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
