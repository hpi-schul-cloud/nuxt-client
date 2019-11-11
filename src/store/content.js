export const actions = {
	async getResources({
		commit
	}, payload = {}) {
		commit("setLoadingTrue")
		const query = payload || {};
		query["$limit"] = 9;
		const res = await this.$axios.$get("/content/search", {
			params: query,
		});
		commit("setResources", res);
		commit("setLoadingFalse")
	},
	async addResources({
		commit
	}, payload = {}) {
		commit("setLoadingTrue")
		const query = payload || {};
		const res = await this.$axios.$get("/content/search", {
			params: query,
		});
		commit("addResources", res);
		commit("setLoadingFalse")
	},
};

export const mutations = {
	setResources(state, payload) {
		state.resources = payload;
	},
	addResources(state, payload) {
		payload.data.forEach(resource => state.resources.data.push(resource));
		state.resources = {
			...state.resources,
			limit: payload.limit,
			skip: payload.skip,
			total: payload.total,
		}
	},
	setLoadingTrue(state) {
		state.loading = true;
	},
	setLoadingFalse(state) {
		state.loading = false;
	}

};

export const state = () => ({
	resources: {
		data: [],
		limit: null,
		skip: null,
		total: null,
	},
	loading: false,
});
