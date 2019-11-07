export const actions = {
	async searchResources({
		commit
	}, payload = {}) {
		const query = payload || {};
		query["$limit"] = 9;
		const res = await this.$axios.$get("/content/search", {
			params: query,
		});
		commit("setSearch", res);
	},
};

export const mutations = {
	setSearch(state, payload) {
		state.searchResult = payload;
	},
};

export const state = () => ({
	searchResult: [],
});
