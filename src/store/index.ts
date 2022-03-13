// import Vuex from "vuex";
// import Vue from "vue";
import { Store } from "vuex";
import { initialiseStores } from "@/utils/store-accessor";

// Vue.use(Vuex);
// export const rootStore = new Vuex.Store({});

const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];
export * from "@/utils/store-accessor";
