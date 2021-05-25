import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";

const base = serviceTemplate("users");
const baseState = base.state();

const module = mergeDeep(base, {
	state: () =>
		mergeDeep(baseState, {
			progress: {
				delete: {
					active: false,
					percent: 0,
				},
			},
			qrLinks: [],
		}),
	mutations: {
		startProgress(state, { action }) {
			state.progress[action].active = true;
			state.progress[action].percent = 0;
		},
		stopProgress(state, { action }) {
			state.progress[action].active = false;
			state.progress[action].percent = 0;
		},
		updateProgress(state, { action, percent }) {
			state.progress[action].percent = percent;
		},
		setQrLinks(state, payload) {
			state.qrLinks = payload;
		},
	},
	actions: {
		handleUsers({ dispatch }, queryContext = {}) {
			const { userType, action } = queryContext;
			queryContext.customEndpoint = `/users/admin/${userType}`;
			dispatch(action, queryContext);
		},
		async deleteUsers({ commit }, { ids, userType }) {
			try {
				commit("startProgress", { action: "delete" });
				const chunkSize = 5;
				const numChunks = Math.ceil(ids.length / chunkSize);
				for (let i = 0; i < numChunks; i++) {
					const percent = ((i + 1) * chunkSize * 100) / (numChunks * chunkSize);
					const chunkIds = ids.slice(i * chunkSize, i * chunkSize + chunkSize);
					await this.$axios.$delete(`/users/v2/admin/${userType}`, {
						params: { ids: chunkIds },
					});
					chunkIds.forEach((id) => {
						commit("remove", id);
					});
					commit("updateProgress", { action: "delete", percent });
				}
				// make sure the user has a chance to see 100% progress
				await new Promise((resolve) => setTimeout(resolve, 500));
			} finally {
				commit("stopProgress", { action: "delete" });
			}
		},
		async createTeacher({ commit }, teacherData) {
			const customEndpoint = "/users/admin/teachers";
			const teacher = await this.$axios.$post(customEndpoint, teacherData);
			commit("setCurrent", teacher);
		},
		async createStudent({ commit }, payload) {
			commit("resetBusinessError");
			const customEndpoint = "/users/admin/students";
			const { successMessage, ...studentData } = payload;
			try {
				const student = await this.$axios.$post(customEndpoint, studentData);
				this.$toast.success(successMessage);
				this.$router.push({
					path: `/administration/students`,
				});
				commit("setCurrent", student);
			} catch (error) {
				commit("setBusinessError", error.response.data);
			}
		},
		async sendRegistrationLink(ctx, payload = {}) {
			const customEndpoint = "/users/mail/registrationLink";
			await this.$axios.$post(customEndpoint, payload);
		},
		async getQrRegistrationLinks({ commit }, payload = {}) {
			const customEndpoint = "/users/qrRegistrationLink";
			const links = await this.$axios.$post(customEndpoint, payload);
			commit("setQrLinks", links);
		},
		getByRole: async function (ctx, role) {
			const queryRole = {
				roles: [role._id],
			};

			const user = await this.dispatch("users/find", {
				query: queryRole,
			});
			commit("setCurrent", user);
		},
		getById: async function (ctx, id) {
			const queryId = {
				_id: id,
			};

			const user = await this.dispatch("users/find", {
				query: queryId,
			});
			commit("setCurrent", user);
		},
	},
});

export const { state, getters, mutations, actions } = module;
