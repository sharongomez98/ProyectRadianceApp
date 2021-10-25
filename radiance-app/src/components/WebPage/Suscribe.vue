<template>
  <v-sheet class="pa-12 mx-14 my-10">
    <h2 class="about-title text-center pa-6">Suscribete Ya!</h2>
    <v-row justify="space-around" class="py-12">
      <v-col v-for="(value, index) in values" :key="index" lg="5" md="4" sx="3">
        <v-hover>
          <template v-slot:default="{ hover }">
            <div
              :class="`elevation-${hover ? 24 : 0}`"
              class="mx-auto transition-swing"
            >
              <v-sheet
                dark
                :color="value.color"
              >
                <v-row justify="center" class="py-6">
                    <p class="text-center format pa-6">{{ value.text }}</p>
                    <h2 class="text-center about-title team pa-6">{{ value.price }}</h2>
                </v-row>
                <v-row justify="center" class="py-8">
                  <v-btn color="grey darken-4" dark x-large
                      >¡Suscribete ya!</v-btn>
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
  name: "Suscribe",
  data() {
    return {
      values: [
        {
          color: "#F37154",
          price: "$4.99",
          text:
            "Al suscribirte, tendrás acceso a más de 1,000 artículos  y a todos los artículos nuevos por venir, escritos por el equipo de Radiance, que buscan impulsarte y darte el plus en tu vida laboral, estudiantil o descubrir una nueva pasión por la tecnología.",
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
