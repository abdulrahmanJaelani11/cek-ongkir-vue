import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap";

createApp(App).use(router).mount("#app");
axios.defaults.baseURL = "https://api.binderbyte.com/v1/";
