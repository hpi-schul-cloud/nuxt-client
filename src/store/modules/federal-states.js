export default {
	namespaced: true,
	actions: {
		async find({ commit }, payload) {
			const federalStates = await this.$axios.$get("/federalStates");
			commit("add", { items: federalStates.data });
		},
	},
	getters: {
		list: (state) => {
			return state.list;
		},
	},
	state: () => ({
		list: [],
	}),
	mutations: {
		add(state, { items }) {
			for (const item of items) {
				state.list.push(item);
			}
		},
	},
};
