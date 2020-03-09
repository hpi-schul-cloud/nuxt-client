export const actions = {
	async getResources({ commit }, payload = {}) {
		commit("setLoading", true);
		const query = Object.assign({ count: 10 }, payload);
		const res = await this.$axios.$get("/edu-sharing", {
			params: query,
		});
		commit("setQuery", payload.searchQuery);
		commit("setResources", res);
		commit("setLoading", false);
	},
	async addResources({ commit }, payload = {}) {
		commit("setLoading", true);
		const res = await this.$axios.$get("/edu-sharing", {
			params: payload,
		});
		commit("addResources", res);
		commit("setLoading", false);
	},
	async getResourceMetadata(context, id) {
		return this.$axios.$get(`/edu-sharing/${id}`);
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
	setQuery(state, payload) {
		state.searchQuery = payload;
	},
};

export const state = () => ({
	resources: {
		facettes: [],
		ignored: null,
		nodes: [],
		pagination: {},
	},
	searchQuery: "",
	loading: false,
	resource: {},
});
