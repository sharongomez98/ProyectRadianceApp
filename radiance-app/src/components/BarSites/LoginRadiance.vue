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
                        :icon="alert_color =='success' ? 'mdi-check-circle' : 'mdi-alert-circle'"
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
                        @click="test"
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
import store from "../../store/index"
export default {
  name: "LoginRadiance",
  data: () => ({
    error: store.getters["loginError"],
    alert: false,
    alert_active: false,
    alert_message: "error",
    alert_color: "",
    alert_icon: "",
    loading: false,
    showPassword: false,
    user: {
      username: "",
      password: "",
    },
  }),
  methods: {
    test() {
      this.loading = true;
      console.log("user", this.user);
      let json = {
        username: this.user.username,
        password: this.user.password,
      };
      store.dispatch("logIn", json);
      this.loading = false;
      console.log(this.error);
      if (this.error != "200") {
        this.alert = true;
        this.setSnackbar(
          true,
          "error",
          "Usuario o contraseña incorrectos."
        );
        this.$router.push("/home");
      } else {
        this.setSnackbar(true, "success", "Ingresando a Radiance");
      }
      this.loading = false;
    },
    setSnackbar(active, color, message) {
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
