<template>
  <v-container fluid>
    <v-layout align-space-around row fill-height wrap>
      <v-img src="@/assets/login.jpg" alt="" height="93vh">
        <v-sheet height="93vh" color="rgba(0, 0, 0, 0.32)">
          <v-container fill-height fluid>
            <v-layout align-center justify-center>
              <v-card class="elevation-12" min-width="40vh">
                <v-toolbar color="grey darken-4" dark>
                  <v-spacer />
                  <v-icon color="#F37154" large>mdi-lightning-bolt</v-icon>
                  <v-toolbar-title id="login_bar" class="intro-text"
                    >Radiance</v-toolbar-title
                  >
                  <v-spacer />
                </v-toolbar>
                <v-card-text>
                  <v-row justify="space-around" class="py-10">
                    <p id="login_title">Login</p>
                  </v-row>
                  <v-form class="px-3">
                    <v-text-field
                      label="Usuario"
                      placeholder="Usuario"
                      name="username"
                      prepend-inner-icon="mdi-account-circle"
                      type="text"
                      solo
                      color="#F37154"
                      v-model="user.username"
                      class="py-3"
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
                      class="py-3"
                      prepend-inner-icon="mdi-lock"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <div>
                      <v-alert
                        v-model="alert"
                        :value="alert_active"
                        :color="alert_color"
                        :icon="
                          alert_color == 'success'
                            ? 'mdi-check-circle'
                            : 'mdi-alert-circle'
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
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-row align="center" justify="space-around" class="pb-12">
                    <v-col>
                      <v-btn
                        color="grey darken-4"
                        dark
                        x-large
                        :loading="loading"
                        @click="logIn"
                        >Ingresar</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-layout>
          </v-container>
        </v-sheet>
      </v-img>
    </v-layout>
  </v-container>
</template>

<script>
import store from "../../store/index";
import { mapGetters } from 'vuex'
import axios from "axios";

export default {
  name: "LoginRadiance",
  data: () => ({
    isAuth: "",
    alert: false,
    alert_active: false,
    alert_message: "",
    alert_color: "",
    alert_icon: "",
    loading: false,
    showPassword: false,
    user: {
      username: "",
      password: "",
    },
  }),
  computed: {
    ...mapGetters({
      statusLogin: 'loginError'
    })
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      store.dispatch("clearUserData");
    },

    logIn() {
      this.loading = true;
      let json = {
        username: this.user.username,
        password: this.user.password,
      };
     
      axios.post("login/", json).then((response) => {
        if(response.status == 200) {
          this.setAlert(true, "success", "Bienvenido a Radiance.");
          this.alert = true;
          let payload = {
            accessToken: response.data.accessToken,
            role: response.data.role,
            username: json.username,
          }
          this.loading = false;
           store.dispatch("logIn", payload);
          
        }
      }).catch(error => {
        this.setAlert(true, "error", "Usuario o contraseña incorrectos.");
        this.alert = true;
        store.dispatch("clearUserData");
        this.loading = false;
      })
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
#login_bar {
  font-size: 30px !important;
  color: #ffffff;
  font-family: "Noto Serif" !important;
  font-weight: 600 !important;
}
#login_title {
  font-size: 24px !important;
  font-family: "Noto Serif" !important;
  font-weight: 600 !important;
  color: #212121;
}
</style>
