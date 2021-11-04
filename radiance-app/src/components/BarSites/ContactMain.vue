<template>
  <v-container fluid>
    <v-layout align-center row fill-height wrap>
      <v-img height="93vh" src="@/assets/contact.jpg" alt="">
        <v-sheet height="93vh" min-width="50vh" color="rgba(0, 0, 0, 0.32)">
          <v-container fluid>
            <v-layout align-center justify-end wrap>
              <v-card class="elevation-12" min-width="40vh" >
                <v-toolbar color="grey darken-4" dark >
                  <v-spacer></v-spacer>
                  <v-icon color="#F37154" large>mdi-lightning-bolt</v-icon>
                  <v-toolbar-title id="login_bar" class="intro-text"
                    >Radiance</v-toolbar-title
                  >
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-row justify="space-around" class="py-10">
                    <p id="login_title">Contáctanos</p>
                  </v-row>
                  <v-form class="px-3" @submit.prevent="login">
                    <v-text-field
                      label="Nombre"
                      placeholder="Nombre"
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
                      label="Correo electrónico"
                      placeholder="Correo electrónico"
                      name="username"
                      prepend-inner-icon="mdi-at"
                      type="text"
                      solo
                      color="#F37154"
                      v-model="user.username"
                      class="py-3"
                    ></v-text-field>
                    <v-textarea
                      label="Mensaje"
                      placeholder="Mensaje"
                      name="username"
                      prepend-inner-icon="mdi-comment"
                      type="text"
                      solo
                      color="#F37154"
                      rows="10"
                      v-model="user.username"
                      class="py-3"
                    >
                    </v-textarea>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-row align="center" justify="space-around" class="pb-12">
                    <v-col>
                      <v-btn type="submit" color="grey darken-4" dark x-large
                        >Enviar</v-btn
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
export default {
  name: "ContactMain",
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
