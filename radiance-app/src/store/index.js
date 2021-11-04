import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import createPersistedState from "vuex-persistedstate";
import router from "../router"; // our vue router instance

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    refresh_token: "",
    access_token: "",
    loggedInUser: {},
    username : "",
    isAuthenticated: false,
    expandSideBar: false,
    loginError :"",
    alert: true,
    alert_active: true,
    alert_message: "test alert",
    alert_color: "success",
    alert_icon: "mdi-check",
  },
  mutations: {
    setLoginError: function(state, error) {
      state.loginError = error;
    },
    setRefreshToken: function(state, refreshToken) {
      state.refresh_token = refreshToken;
    },
    setAccessToken: function(state, accessToken) {
      state.access_token = accessToken;
      },
    
    setUserName: function(state, username) {
      state.username = username;
    },
    // sets state with user information and toggles 
    // isAuthenticated from false to true
    setLoggedInUser: function(state, user) {
      state.loggedInUser = user;
      state.isAuthenticated = true;
    },
    setIsAuthenticated: function(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setExpandSideBar: function (state, expandSideBar) {
        state.expandSideBar = expandSideBar;
    },
    setAlert: function (state, payload) {
      state.alert = payload.alert;
      state.alert_active = payload.alert_active;
      state.alert_message = payload.alert_message;
      state.alert_color = payload.alert_color;
  },
    // delete all auth and user information from the state
    clearUserData: function(state) {
      state.refresh_token = "";
      state.access_token = "";
      state.username = "";
      state.loggedInUser = {};
      state.isAuthenticated = false;
      state.expandSideBar = false;
      state.alert = false;
      state.alert_active = false;
      state.alert_message = "";
      state.alert_color = "";
      state.alert_icon = "";
    }
  },
  actions: {
    logIn: async ({ commit }, payload) => {
      const loginUrl = "login/";
      try {
        await axios.post(loginUrl, payload).then(response => {
          if (response.status == 200) {
            /* commit("setRefreshToken", response.data.refresh);*/
            commit("setAccessToken", response.data.accessToken);
            commit("setUserName", payload.username); 
            commit("setIsAuthenticated", true);
            commit("expandSideBar", true);
            commit("setLoginError", "");
            //dispatch("fetchUser");
            // redirect to the home page
            //router.push("/home");
          }
        });
      } catch (e) {
        commit("setLoginError", e.response.status);
        //console.log("fff")
      }
    },
    refreshToken: async ({ state, commit }) => {
      const refreshUrl = "auth/refresh_token/";
      try {
        await axios
          .post(refreshUrl, { refresh: state.refresh_token })
          .then(response => {
            if (response.status == 200) {
              commit("setAccessToken", response.data.access);
            }
          });
      } catch (e) {
        console.log(e.response);
      }
    },
    fetchUser: async ({state,  commit }) => {
      const currentUserUrl = "info/" + state.username;
      try {
        await axios.get(currentUserUrl).then(response => {
          if (response.status == 200) {
            commit("setLoggedInUser", response.data);
          }
        });
      } catch (e) {
        console.log(e.response);
      }
    },
    alert: async ({ commit }, payload) => {
      commit("setAlert", payload);
    },


  },
  getters: {
    loginError: state => state.loginError,
    loggedInUser: state => state.loggedInUser,
    username: state => state.username,
    isAuthenticated: state => state.isAuthenticated,
    expandSideBar: state => state.expandSideBar,
    accessToken: state => state.access_token,
    refreshToken: state => state.refresh_token,
    stateAlert: state => state.alert,
    stateAlertActive: state => state.alert_active,
    stateAlertMessage: state => state.alert_message,
    stateAlertColor: state => state.alert_color,
    stateAlertIcon: state => state.alert_icon,
  }
});