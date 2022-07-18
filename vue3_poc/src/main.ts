import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";

import { VContainer, VRow, VCol, VImg } from "vuetify/components";

loadFonts();

import "./assets/style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.component("VContainer", VContainer);
app.component("VRow", VRow);
app.component("VCol", VCol);
app.component("VImg", VImg);

app.mount("#app");
