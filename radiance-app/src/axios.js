import axios from "axios";
import store from "./store";
import router from "./router";

export default function axiosSetUp() {
  // point to your API endpoint
  axios.defaults.baseURL = "http://ec2-18-221-222-10.us-east-2.compute.amazonaws.com:8080/api/";
  axios.defaults.headers.common['api-version'] = '1'
  // Add a request interceptor
  axios.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      const token = store.getters.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        originalRequest.url.includes("auth/refresh_token/")
      ) {
        store.commit("clearUserData");
        router.push("/");
        return Promise.reject(error);
      } else if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await store.dispatch("refreshToken");
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );

}