import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import axios from "axios";
import { initializeAxios } from "./utils/api";

Vue.config.productionTip = false;

// NUXT_REMOVAL replace by Vue.use(axios);
axios.defaults.baseURL = `${window.origin}/api`;
initializeAxios(axios);
Vue.prototype.$axios = axios;
// Vue.axios = axios;

new Vue({
	router,
	store,
	vuetify,
	i18n,
	render: (h) => h(App),
}).$mount("#app");
