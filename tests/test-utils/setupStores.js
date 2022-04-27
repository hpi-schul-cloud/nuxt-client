import { initializeStores } from "@/store";
import Vuex from "vuex";

export default function setupStores(modules) {
	const store = new Vuex.Store({
		modules,
	});
	initializeStores(store);
}
