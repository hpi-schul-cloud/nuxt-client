import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
	state: () => {
		return {
			counter: 0,
		};
	},
	actions: {
		increment(): void {
			this.counter++;
		},
	},
	getters: {
		getCounter(state) {
			return state.counter;
		},
	},
});
