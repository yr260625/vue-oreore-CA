import { createApp } from "vue";
import App from "./view/App.vue";
import router from "./view/router";
import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
  expireTimes: "30d",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None",
});

const app = createApp(App);
app.use(router);
app.mount("#app");
