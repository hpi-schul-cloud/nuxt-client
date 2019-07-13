export default function(endpoint) {
	const baseUrl = "/" + endpoint;
	return {
		actions: {
			async find({ commit }, payload = {}) {
				const query = payload.query || {};
				const res = await this.$axios.$get(baseUrl, {
					params: query,
				});
				commit("set", {
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
			async create({ commit }, payload = {}) {
				const res = await this.$axios.$post(baseUrl, payload);
				commit("set", {
					items: Array.isArray(res) ? res : [res],
				});
				return res;
			},
			async patch({ commit }, payload = []) {
				const res = await this.$axios.$patch(
					baseUrl + "/" + payload[0],
					payload[1]
				);
				commit("set", {
					items: [res],
				});
				return res;
			},
			async update({ commit }, payload = {}) {
				const res = await this.$axios.$update(
					baseUrl + "/" + payload[0],
					payload[1]
				);
				commit("set", {
					items: [res],
				});
				return res;
			},
			async remove({ commit }, id) {
				const res = await this.$axios.$delete(baseUrl + "/" + id);
				commit("remove", id);
				return res;
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
			set(state, { items }) {
				items.forEach((item) => {
					const existing = state.list.findIndex((e) => e._id === item._id);
					if (existing === -1) {
						state.list.push(item);
					} else {
						state.list[existing] = item;
					}
				});
			},
			remove(state, id) {
				const index = state.list.findIndex((e) => e._id === id);
				if (index === -1) {
					console.warn(`Can't remove item with id "${id}" (Not found)`);
					return;
				}
				state.list.splice(index, 1);
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
