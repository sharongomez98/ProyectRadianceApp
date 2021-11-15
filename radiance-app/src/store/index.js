import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    refresh_token: "",
    access_token: "",
    loggedInUser: {},
    username: "",
    isAuthenticated: false,
    expandSideBar: false,
    loginError: "",
    role: ""
  },
  mutations: {
    setLoginError: function (state, error) {
      state.loginError = error;
    },
    setRefreshToken: function (state, refreshToken) {
      state.refresh_token = refreshToken;
    },
    setAccessToken: function (state, accessToken) {
      state.access_token = accessToken;
    },
    setUserName: function (state, username) {
      state.username = username;
    },
    setRole: function (state, role) {
      state.role = role;
    },
    // sets state with user information and toggles
    // isAuthenticated from false to true
    setLoggedInUser: function (state, user) {
      state.loggedInUser = user;
      state.isAuthenticated = true;
    },
    setIsAuthenticated: function (state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setExpandSideBar: function (state, expandSideBar) {
      state.expandSideBar = expandSideBar;
    },
    // delete all auth and user information from the state
    clearUserData: function (state) {
      state.refresh_token = "";
      state.access_token = "";
      state.username = "";
      state.loggedInUser = {};
      state.isAuthenticated = false;
      state.expandSideBar = false;
      state.loginError = "400";
      state.role = "";
    },
  },
  actions: {
    logIn: async ({ commit }, payload) => {
      console.log("payloadStore", payload);
      commit("setAccessToken", payload.accessToken);
      commit("setUserName", payload.username);
      commit("setIsAuthenticated", true);
      commit("setExpandSideBar", true);
      commit("setLoginError", "200");
      commit("setRole", payload.role);
      router.push("/radiance");
      
 
    },

    clearUserData: async ({ commit }) => {
      commit("clearUserData");
    },
  },
  getters: {
    loginError: (state) => state.loginError,
    loggedInUser: (state) => state.loggedInUser,
    username: (state) => state.username,
    isAuthenticated: (state) => state.isAuthenticated,
    expandSideBar: (state) => state.expandSideBar,
    accessToken: (state) => state.access_token,
    refreshToken: (state) => state.refresh_token,
    role: (state) => state.role,
  },
});
