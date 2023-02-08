import { defineStore } from "pinia";

export const useBoardStore = defineStore("boards", {
	state: () => ({
		counter: 1,
	}),
	getters: {
		getName: (state) => `Board #${state.counter}`,
	},
	actions: {
		updateBoardName() {
			this.counter += 1;
		},
	},
});
