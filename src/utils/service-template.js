export default function(endpoint) {
	const baseUrl = "/" + endpoint;
	return {
		actions: {
			async find({ commit }) {
				const res = await this.$axios.$get(baseUrl);
				commit("add", {
					items: res.data,
				});
				return res;
			},
			async get({ commit }, payload) {
				const res = await this.$axios.$get(baseUrl + "/" + payload[0]);
				commit("setCurrent", res);
			},
		},
		getters: {
			get: (state, id) => {
				return state.list.find((item) => item._id === id);
			},
			current: (state) => {
				return state.current;
			},
			list: (state) => {
				return state.list;
			},
		},
		mutations: {
			add(state, { items }) {
				for (const item of items) {
					state.list.push(item);
				}
			},
			setCurrent(state, item) {
				state.current = item;
			},
		},
		state: () => ({
			current: null,
			list: [],
		}),
	};
}
