import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import Router from "./router/index.js";

createApp(App)
  .use(Router)
  .use(ElementPlus)
  .mount("#app");
