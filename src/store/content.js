export const actions = {
	async getResources({ commit }, payload = {}) {
		const query = {
			$limit: 10,
			$skip: 0,
			...payload,
		};
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

const initialState = () => ({
	resources: {
		total: 0,
		limit: 0,
		skip: 0,
		data: [],
	},
});

export const mutations = {
	setResources(state, payload) {
		state.resources = payload;
	},
	addResources(state, payload) {
		payload.data.forEach((resource) => state.resources.data.push(resource));
		state.resources = {
			...state.resources,
			pagination: payload.pagination,
		};
	},
	clearResources(state) {
		state.resources = initialState().resources;
	},
};

export const state = initialState();
