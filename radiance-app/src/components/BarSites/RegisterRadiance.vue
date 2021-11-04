<template>
  <v-container fluid>
    <v-layout align-center row fill-height wrap>
      <v-container fill-height fluid>
        <v-layout align-center justify-center>
          <v-card elevation="0" min-width="40vh">
            <h1 class="section-title text-center py-6">Bienvenido a Radiance!</h1>
            <v-card-text>
              <p class="description text-center pt-8 pb-4">
                Para el proceso de registro de tu cuenta, por favor ingresa los datos que
                se te solicitan a continuación.
              </p>
              <v-form @submit.prevent="login">
                <h3 class="format">Datos personales</h3>
                <v-text-field
                  label="Nombres y Apellidos"
                  placeholder="Nombres y Apellidos"
                  name="name"
                  type="text"
                  solo
                  v-model="user.name"
                >
                </v-text-field>
                <v-text-field
                  label="Correo electrónico"
                  placeholder="Correo electrónico"
                  name="email"
                  type="text"
                  solo
                  v-model="user.email"
                >
                </v-text-field>
                <v-text-field
                  label="Teléfono"
                  placeholder="Teléfono"
                  name="phone"
                  type="text"
                  solo
                  v-model="user.phone"
                >
                </v-text-field>
                <h3 class="format">Datos del usuario</h3>
                <v-text-field
                  label="Usuario"
                  placeholder="Usuario"
                  name="username"
                  type="text"
                  solo
                  v-model="user.username"
                >
                </v-text-field>
                <v-text-field
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  label="Contraseña"
                  placeholder="Contraseña"
                  name="password"
                  solo
                  color="#F37154"
                  v-model="user.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <h3 class="format">Datos de la suscripción</h3>
                <v-card>
                  <v-radio value="Radianacer" class="px-4">
                    <template v-slot:label>
                      <h3 class="pt-4 pl-4">Radianacer</h3>
                      <v-row class="pt-4">
                        <v-col cols="11">
                          <p class="pl-4">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua,
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua".
                          </p>
                        </v-col>
                        <v-col lg="1" md="2" align="right">
                          <h2><strong>$4.99</strong></h2>
                        </v-col>
                      </v-row>
                      <div class="pa-3"></div>
                    </template>
                  </v-radio>
                </v-card>
                <h3 class="format">Datos de pago</h3>
                <v-text-field
                  label="Número de tarjeta crédito/débito"
                  placeholder="XXXX XXXX XXXX XXXX"
                  name="username"
                  type="number"
                  solo
                  v-model="user.card"
                >
                </v-text-field>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Fecha de expiración"
                      placeholder="MM/YY"
                      name="username"
                      type="text"
                      solo
                      v-model="user.expirationDate"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="CVC"
                      placeholder="CVC"
                      name="username"
                      type="text"
                      solo
                      v-model="user.card"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <h3 class="format">Términos y Condiciones</h3>
                <v-card elevation="0">
                  <v-radio value="Radianacer" class="p-2">
                    <template v-slot:label>
                      <div>
                        <p class="pa-2">
                          He leído y acepto los términos y condiciones que se encuentran
                          <a href="hola.html">Términos y Condiciones</a>.
                        </p>
                      </div>
                    </template>
                  </v-radio>
                </v-card>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-row align="center" justify="space-around" class="pb-12">
                <v-col>
                  <v-btn type="submit" color="grey darken-4" dark x-large
                    >Finalizar</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "RegisterRadiance",
  data: () => ({
    user: {
      username: "",
      password: "",
    },
    showPassword: false,
    loading: false,
  }),
};
</script>

<style>
h1.section-title {
  font-size: 48px !important;
  color: #212121;
  font-family: "Noto Serif" !important;
  font-weight: 600 !important;
}
p.description {
  font-family: "Montserrat" !important;
  font-size: 18px !important;
  margin: 32px 0px !important;
  color: #212121 !important;
}
h3.format {
  font-family: "Montserrat" !important;
  font-size: 18px !important;
  margin: 32px 0px !important;
  color: #8a8a8a !important;
  font-weight: 500 !important;
}
</style>
