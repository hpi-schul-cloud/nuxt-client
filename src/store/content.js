export const actions = {
	async getResources({ commit }, payload = {}) {
		commit("setLoading", true);
		const query = {
			$limit: 12,
			$skip: 0,
			...payload,
		};
		try {
			const res = await this.$axios.$get("/edu-sharing", {
				params: query,
			});

			commit("setResources", res);
		} catch (e) {
			console.error(e);
		} finally {
			commit("setLoading", false);
		}
	},
	async addResources({ commit }, payload = {}) {
		commit("setLoading", true);
		const res = await this.$axios.$get("/edu-sharing", {
			params: payload,
		});
		commit("addResources", res);
		commit("setLoading", false);
	},
	async getLessons({ commit }, payload) {
		const params = {
			courseId: payload,
		};
		if (params.courseId) {
			//only search if courseId is existing
			const res = await this.$axios.$get("/lessons", { params });
			commit("setLessons", res);
		}
	},

	async addToLesson(ctx, payload = { material: {} }) {
		const { event } = payload;
		if (!event) throw new SyntaxError("eventBus missing");
		try {
			await this.$axios.post(
				`/lessons/${payload.lessonId}/material`,
				payload.material
			);
			event.$emit("showModal@content", "successModal");
		} catch (error) {
			console.error("Could not add the material to lesson");
			event.$emit("showModal@content", "errorModal");
		}
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
	lessons: {
		data: [],
	},
	loading: false,
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
	clearLessons(state) {
		state.lessons = initialState().lessons;
	},
	setLoading(state, status) {
		state.loading = status;
	},
	setLessons(state, payload) {
		state.lessons = payload;
	},
};

export const state = initialState();
