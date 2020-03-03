export const actions = {
	async getResources({ commit }, payload = {}) {
		commit("setLoading", true);
		const query = Object.assign({ $limit: 10 }, payload || {});
		const res = await this.$axios.$get("/content/search", {
			params: query,
		});
		commit("setResources", res);
		commit("setLoading", false);
	},
	async addResources({ commit }, payload = {}) {
		commit("setLoading", true);
		const query = payload || {};
		const res = await this.$axios.$get("/content/search", {
			params: query,
		});
		commit("addResources", res);
		commit("setLoading", false);
	},
	async getLessons({ commit }, payload) {
		const params = {
			courseId: payload,
		};
		const res = await this.$axios.$get("/lessons", { params });
		commit("setLessons", res);
	},

	async addToLesson(_,payload = { material:{} }){
		 await this.$axios.post(`/lessons/${payload.lessonId}/material`, payload.material)
	}
};

export const mutations = {
	setResources(state, payload) {
		state.resources = payload;
	},
	addResources(state, payload) {
		payload.data.forEach((resource) => state.resources.data.push(resource));
		state.resources = {
			...state.resources,
			limit: payload.limit,
			skip: payload.skip,
			total: payload.total,
		};
	},
	setLoading(state, type) {
		state.loading = type;
	},
	setLessons(state, payload) {
		state.lessons = payload;
	},
};

export const state = () => ({
	resources: {
		data: [],
		limit: null,
		skip: null,
		total: null,
	},
	lessons: {
		data: [],
	},
	loading: false,
});
