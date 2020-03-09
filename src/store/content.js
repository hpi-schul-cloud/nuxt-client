export const actions = {
	async getResources({ commit }, payload = {}) {
		const query = Object.assign({ count: 10 }, payload);
		const res = await this.$axios.$get("/edu-sharing", {
			params: query,
		});
		commit("setResources", res);
	},
	async addResources({ commit }, payload = {}) {
		const res = await this.$axios.$get("/edu-sharing", {
			params: payload,
		});
		commit("addResources", res);
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
};

export const state = () => ({
	resources: {
		facettes: [],
		ignored: null,
		nodes: [],
		pagination: {},
	},
	resource: {},
});
