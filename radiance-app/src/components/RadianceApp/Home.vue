<template>
  <v-app>
    <v-container class="my-auto" style="text-align: center;">
      <v-row>
        <v-col>
          <h5>Experiencias Tecnolócias</h5>
          <h1>¡HOLA!</h1>
          <h5>Gracias por confiar en Radiance</h5>
          <br>
          <h3>¿Tienes alguna duda?</h3>
          <p>Contacta a nuestro equipo de soporte para brindarte apoyo :D</p>
          <v-row justify="center">
            <v-col cols="12" sm="4">
              <v-btn
                text
                color="green lighten-1"
                href="https://wa.me/50250183972"
                target="_blank"
              >
                <v-icon
                  right
                  dark
                  class="mx-2"
                >
                  mdi-whatsapp
                </v-icon>
                +502 5018 3972
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-img
            src="@/assets/robot.png"
            max-height="700"
            max-width="500"
          />
            
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  components: {
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="css" scoped>

h1 {
  font-size: 160px;
}

h3 {
  color: rgb(107, 105, 105);
}

h5 {
  font-size: 24px;
  color: rgb(151, 151, 151);
}

p {
  color: rgb(161, 161, 161);
}

</style>