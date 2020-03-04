export const actions = {
	async getResources({ commit }, payload = {}) {
		commit("setLoading", true);
		const query = Object.assign({ count: 10 }, payload || {});
		const res = await this.$axios.$get("/edu-sharing", {
			params: query,
		});
		commit("setResources", res);
		commit("setLoading", false);
	},
	async addResources({ commit }, payload = {}) {
		commit("setLoading", true);
		const query = payload || {};
		const res = await this.$axios.$get("/edu-sharing", {
			params: query,
		});
		commit("addResources", res);
		commit("setLoading", false);
	},
};

export const mutations = {
	setResources(state, payload) {
		state.resources = payload;
	},
	addResources(state, payload) {
		payload.nodes.forEach((resource) => state.resources.nodes.push(resource));
		state.resources = {
			...state.resources,
			pagination: payload.pagination,
		};
	},
	setLoading(state, type) {
		state.loading = type;
	},
};

export const state = () => ({
	resources: {
		facettes: [],
		ignored: null,
		nodes: [],
		pagination: {},
	},
	loading: false,
});
