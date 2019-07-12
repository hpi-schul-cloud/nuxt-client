export default function(endpoint) {
	const baseUrl = "/" + endpoint;
	return {
		actions: {
			async find({ commit }, payload = {}) {
				const query = payload.query || {};
				const res = await this.$axios.$get(baseUrl, {
					params: query,
				});
				commit("add", {
					items: res.data,
				});
				return res;
			},
			async get({ commit }, payload = {}) {
				let id;
				if (Array.isArray(payload)) {
					id = payload[0];
				} else if (typeof payload === "string") {
					id = payload;
				}
				const res = await this.$axios.$get(baseUrl + "/" + id);
				commit("setCurrent", res);
				return res;
			},
			async patch(ctx, payload = {}) {
				return await this.$axios.$patch(baseUrl + "/" + payload[0], payload[1]);
			},
			async update(ctx, payload = {}) {
				return await this.$axios.$update(
					baseUrl + "/" + payload[0],
					payload[1]
				);
			},
			async remove(ctx, id) {
				return await this.$axios.$delete(baseUrl + "/" + id);
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
				state.list = [];
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
