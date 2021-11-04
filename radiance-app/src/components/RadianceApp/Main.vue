<template>
  <v-app>
    <v-app-bar app color="grey darken-4" dark light elevation="6" elevate-on-scroll>
      <v-app-bar-nav-icon dark @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-checkbox
        v-model="expandSideBar"
        :on-icon="'mdi-pin'"
        :off-icon="'mdi-pin-off'"
        @change="repaint"
        color="white"
        hide-details
      ></v-checkbox>
      <v-spacer />
      <v-icon color="#F37154" large>mdi-lightning-bolt</v-icon>
      <v-toolbar-title id="register_toolbar">Radiance</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer
      color="white"
      v-model="drawer"
      app
      :expand-on-hover="!expandSideBar"
    >
      <v-list nav>
        <v-list-group :value="false" active-class="deep-orange lighten-4">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon color="deep-orange darken-4">mdi-account-circle</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="userTitle">{{ username }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(item, index) in userMenu" :key="index" :to="item.to">
            <v-list-item-icon>
              <v-icon color="deep-orange darken-4">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="userTitle">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <v-divider></v-divider>
      <v-list dense nav>
        <v-subheader class="navSubtitle">Menú</v-subheader>
        <v-list-item-group
          active-class="deep-orange lighten-3"
          v-model="list"
        >
          <v-list-item
            class="pa-2"
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <v-list-item-icon>
              <v-icon color="deep-orange darken-4">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="userTitle">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
    </v-navigation-drawer>
    <v-main>
      <div>
        <v-alert
          v-model="alert"
          :value="alert_active"
          :color="alert_color"
          :icon="alert_color == 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'"
          dense
          text
          dismissible
          border="left"
          transition="scroll-y-transition"
        >
          {{ alert_message }}</v-alert
        >
      </div>
      <div v-if="list == 0">
        <Hero />
      </div>
      <div v-if="list == 1">
        <Tags @chanceAlert="changeAlert($event)" />
      </div>
      <div v-if="list == 2">
        <AboutUs />
      </div>
      <div v-if="list == 3">
        <Users />
      </div>
      <div v-if="list == 5">
        <SuscriptionTypes @chanceAlert="changeAlert($event)" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import store from "../../store/index";
export default {
  name: "Main",
  components: {
    Hero: () => import("../WebPage/Hero.vue"),
    AboutUs: () => import("../WebPage/AboutUs.vue"),
    Tags: () => import("./Tags.vue"),
    SuscriptionTypes: () => import("./SuscriptionTypes.vue"),
    Users: () => import("./Users.vue"),
  },
  data: () => ({
    list: 0,
    expandSideBar: store.getters["expandSideBar"],
    username: store.getters["username"],
    drawer: true,
    alert: false,
    alert_active: false,
    alert_message: "",
    alert_color: "",
    items: [
      { title: "Home", icon: "mdi-home" },
      { title: "Tags", icon: "mdi-tag" },
      { title: "Artículos", icon: "mdi-newspaper-variant" },
      { title: "Usuarios", icon: "mdi-account-multiple" },
      { title: "Pagos", icon: "mdi-wallet" },
      { title: "Suscripciones", icon: "mdi-format-list-checks" },
      { title: "Reportes", icon: "mdi-chart-tree" },
    ],
    userMenu: [
      { title: "Ver Perfil", icon: "mdi-account", to: "/contact" },
      { title: "Salir", icon: "mdi-logout", to: "/login" },
    ],
  }),
  computed: {
    sideBarIcon() {
      return this.expandSideBar === true ? "mdi-pin" : "mdi-pin-off";
    },
  },
  watch: {
    drawer: false,
  },

  mounted: function(){
    if(alert){
      this.hideAlert();
    }
  },

  methods: {
    hideAlert() {
      window.setInterval(() => {
        this.alert = false;
      }, 6000)
    },
    repaint() {
      this.drawer = !this.drawer;
      this.drawer = !this.drawer;
      store.commit("setExpandSideBar", this.expandSideBar);
    },
    profile() {
      this.$router.push("perfil");
    },
    logout() {
      store.commit("clearUserData");
      this.$router.push("/");
    },
    changeAlert(alert){
      this.alert = alert.alert;
      this.alert_active = alert.alert_active;
      this.alert_color = alert.alert_color;
      this.alert_message = alert.alert_message;
    }
  },
};
</script>
<style>
.v-toolbar {
  padding: 0px 0px;
}
.userTitle {
  color: #212121 !important;
  font-family: "Montserrat" !important;
  font-size: 14px !important;
  font-weight: normal !important;
}
.navSubtitle {
  color: #212121 !important;
  font-family: "Montserrat" !important;
  font-size: 14px !important;
  font-weight: 300 !important;
}
</style>
