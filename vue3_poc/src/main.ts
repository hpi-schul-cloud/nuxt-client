import { createPinia } from "pinia";
import Cookies from "universal-cookie";
import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import router from "./router";
import { useAuthStore } from "./store/auth";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(vuetify);

// authentication using cookie from legacy client
const cookies = new Cookies();
const jwt = cookies.get("jwt");
const authStore = useAuthStore();
authStore.setAccessToken(jwt);

app.mount("#app");
