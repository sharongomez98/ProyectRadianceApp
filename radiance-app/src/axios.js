import axios from "axios";
import store from "./store";

export default function axiosSetUp() {
  // point to your API endpoint
  axios.defaults.baseURL =
    "http://ec2-18-221-222-10.us-east-2.compute.amazonaws.com:8080/api/";

  // Add a request interceptor
  axios.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      const token = store.getters.accessToken;
      config.headers.common["api-version"] = "1";
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
      //console.log(response);
      return response;
    },
    function (error) {
      console.log(error);
      return Promise.reject(error);
    }
  );
}
