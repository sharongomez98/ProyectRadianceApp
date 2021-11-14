<template>
  <v-container fluid>
    <v-layout align-center row fill-height wrap>
      <v-img height="100%" src="@/assets/register.jpg" alt="">
        <v-sheet height="100%" width="100%" min-width="50vh" color="rgba(0, 0, 0, 0.32)">
          <v-container fluid>
            <v-layout align-center justify-center wrap>
              <v-card elevation="12" min-width="40vh" class="pa-6" width="120vh">
                <h1 class="section-title text-center py-6">Perfil de Usuario</h1>
                <v-card-text>
                  <p class="description text-center pt-8 pb-4">
                    Para el proceso de registro de tu cuenta, por favor ingresa los datos
                    que se te solicitan a continuación.
                  </p>
                  <v-form>
                    <h3 class="format">Datos personales</h3>
                    <v-text-field
                      label="Nombres y Apellidos"
                      placeholder="Nombres y Apellidos"
                      name="name"
                      prepend-inner-icon="mdi-account"
                      type="text"
                      solo
                      color="#F37154"
                      v-model="editedItem.name"
                    >
                    </v-text-field>
                    <v-text-field
                      label="Correo electrónico"
                      placeholder="Correo electrónico"
                      name="email"
                      prepend-inner-icon="mdi-at"
                      type="email"
                      solo
                      color="#F37154"
                      v-model="editedItem.mail"
                    >
                    </v-text-field>
                    <v-text-field
                      label="Teléfono"
                      placeholder="Teléfono"
                      name="phone"
                      prepend-inner-icon="mdi-phone"
                      type="number"
                      color="#F37154"
                      solo
                      v-model="editedItem.phoneNumber"
                    >
                    </v-text-field>
                    <h3 class="format">Datos del usuario</h3>
                    <v-text-field
                      label="Usuario"
                      placeholder="Usuario"
                      name="username"
                      prepend-inner-icon="mdi-account-circle"
                      type="text"
                      solo
                      color="#F37154"
                      v-model="editedItem.user"
                    >
                    </v-text-field>
                    <v-text-field
                      id="password"
                      label="Contraseña"
                      placeholder="Contraseña"
                      name="password"
                      prepend-inner-icon="mdi-lock"
                      :type="showPassword ? 'text' : 'password'"
                      solo
                      color="#F37154"
                      v-model="editedItem.password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <h3 class="format">Datos de la suscripción</h3>
                    <v-row class="py-3">
                      <v-autocomplete
                        v-model="editedItem.subscriptionType"
                        :items="suscriptionTypes"
                        solo
                        chips
                        color="deep-orange lighten-3"
                        item-text="name"
                        return-object
                      >
                      </v-autocomplete>
                    </v-row>
                    <h3 class="format">Datos de pago</h3>
                    <v-text-field
                      label="Número de tarjeta crédito/débito"
                      placeholder="XXXX XXXX XXXX XXXX"
                      name="username"
                      type="number"
                      solo
                      v-model="editedItem.card"
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
                          v-model="editedItem.expirationDate"
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
                          v-model="editedItem.card"
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
                              He leído y acepto los términos y condiciones que se
                              encuentran
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
                      <v-btn
                        @click="registerUser(editedItem)"
                        color="grey darken-4"
                        dark
                        x-large
                        :loading="loading"
                        >Finalizar</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card-actions>
                <div>
                  <v-alert
                    v-model="alert"
                    :value="alert_active"
                    :color="alert_color"
                    :icon="
                      alert_color == 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'
                    "
                    dense
                    text
                    dismissible
                    border="left"
                    transition="scroll-y-transition"
                  >
                    {{ alert_message }}</v-alert
                  >
                </div>
                <div v-if="newRegister" class="pt-12 pb-6">
                  <v-row align="center" justify="center">
                    <v-btn color="grey darken-4" dark x-large to="/login">Login</v-btn>
                  </v-row>
                </div>
              </v-card>
            </v-layout>
          </v-container>
        </v-sheet>
      </v-img>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data: () => ({
    editedItem: {
      userId: "",
      name: "",
      mail: "",
      phoneNumber: "",
      role: "",
      image: "",
      user: "",
      password: "",
      isVerified: "",
      subscriptionType: null,
    },
    showPassword: false,
    loading: false,
    suscriptionTypes: [],
    alert: false,
    alert_active: false,
    alert_message: "",
    alert_color: "",
    alert_icon: "",
    newRegister: false,
  }),

  mounted: function () {
    if (alert) {
      this.hideAlert();
    }
  },
  created() {
    this.initialize();
  },

  methods: {
    hideAlert() {
      window.setInterval(() => {
        this.alert = false;
      }, 6000);
    },

    initialize() {
      this.loading = true;
      axios.get("subscriptiontype/").then((response) => {
        if (response.status == 200) {
          this.suscriptionTypes = response.data;
        } else {
          console.log(response.status);
        }
      });

      this.loading = false;
    },

    registerUser(item) {
      this.loading = true;
      let json = {
        name: item.name,
        mail: item.mail,
        phoneNumber: item.phoneNumber,
        role: "",
        image: "",
        user: item.user,
        password: item.password,
        isVerified: "",
        subscription: {
          finalizationDate: "",
          status: "",
          subscriptionType: {
            subscriptionTypeId: item.subscriptionType.subscriptionTypeId,
            name: item.subscriptionType.name,
            price: item.subscriptionType.price,
            description: item.subscriptionType.description,
          },
        },
      };
      axios
        .post("user/", json)
        .then((response) => {
          if (response.status == 200) {
            this.loading = false;
            this.setAlert(
              true,
              "success",
              "Tu cuenta ha sido creada éxitosamente. Para disfrutar de Radiance, procede a iniciar sesión."
            );
            this.newRegister = true;
          }
        })
        .catch((error) => {
          //406 , faltan campos
          //409 , username ya existe
          //400 , algo salio mal
          this.newRegister = false;
          if (error.response.status == 409) {
            this.setAlert(
              true,
              "error",
              "El usuario que intentas registrar ya existe. Por favor, ingresa otro usuario."
            );
          }
          if (error.response.status == 406) {
            this.setAlert(true, "error", "Faltan datos para completar el registro.");
          }
          if (error.response.status == 400) {
            this.setAlert(
              true,
              "error",
              "Algo salió mal durante la creación de tu cuenta. Por favor, vuelve a intentarlo más tarde."
            );
          }
        });
      this.alert = true;
      this.loading = false;
    },

    setAlert(active, color, message) {
      this.alert_active = active;
      this.alert_color = color;
      this.alert_message = message;
    },
  },
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
