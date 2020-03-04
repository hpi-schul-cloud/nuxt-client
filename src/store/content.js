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
		payload.nodes.forEach((resource) => state.resources.nodes.push(resource));
		state.resources = {
			...state.resources,
			pagination: payload.pagination,
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
		facettes: [],
		ignored: null,
		nodes: [],
		pagination: {},
	},
	lessons: {
		data: [],
	},
	loading: false,
});
