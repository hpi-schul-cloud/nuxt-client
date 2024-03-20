import { initializeStores } from "@/store";
import { createStore } from "vuex";

export default function setupStores(modules) {
	const store = createStore({
		modules,
	});

	initializeStores(store);

	return store;
}
