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
			console.log(res.meta.authorization);
			// "JSESSIONID=34712629A98CAD0345868B0EB3F3F819; Path=/edu-sharing; Secure"
			if (res.meta.authorization){
				const eduCookie = res.meta.authorization;
				const cookieParts = eduCookie.split('; ');
				const cookieKeyValue = cookieParts[0].split('=');
				const options = {
					// path: '/edu-sharing',
					// domain: 'mv-repo.schul-cloud.org',
					secure: true,
					// sameSite: 'lax'
				};
				console.log(cookieKeyValue[1]);
				this.$cookies.set('JSESSIONID', cookieKeyValue[1], options);
				this.$cookies.set('JSESSIONID6', cookieKeyValue[1], {
					 	path: '/',
						secure: true,
					    domain: 'mv-repo.schul-cloud.org',
						sameSite: 'none'
				});

				console.log(this.$cookies.getAll())
			}

			commit("setResources", res);
			}
			catch (e) {
			console.log(e);
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
		const res = await this.$axios.$get("/lessons", { params });
		commit("setLessons", res);
	},

	async addToLesson({ commit }, payload = { material: {} }) {
		await this.$axios
			.post(`/lessons/${payload.lessonId}/material`, payload.material)
			.then((resp) => {
				commit("addToLessonResult", resp);
			})
			.catch((error) => {
				console.error(`addToLessonResult Error: ${error}, payload: ${payload}`);
				commit("addToLessonResult", error.response);
			});
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
	addToLessonResult: {},
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
	setLoading(state, status) {
		state.loading = status;
	},
	setLessons(state, payload) {
		state.lessons = payload;
	},
	addToLessonResult(state, payload) {
		state.addToLessonResult = payload;
	},
};

export const state = initialState();
