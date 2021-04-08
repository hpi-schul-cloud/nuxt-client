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
	},
	actions: {
		handleUsers({ dispatch }, queryContext = {}) {
			const { userType, action } = queryContext;
			queryContext.customEndpoint = `/users/admin/${userType}`;
			return dispatch(action, queryContext);
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
		createTeacher(ctx, teacherData) {
			const customEndpoint = "/users/admin/teachers";
			return this.$axios.$post(customEndpoint, teacherData);
		},
		createStudent(ctx, payload) {
			ctx.commit("resetBusinessError");
			const customEndpoint = "/users/admin/students";
			const { successMessage, ...studentData } = payload;
			return this.$axios
				.$post(customEndpoint, studentData)
				.then(() => {
					this.$toast.success(successMessage);
					this.$router.push({
						path: `/administration/students`,
					});
				})
				.catch((error) => {
					ctx.commit("setBusinessError", error.response.data);
				});
		},
		sendRegistrationLink(ctx, payload = {}) {
			const customEndpoint = "/users/mail/registrationLink";
			return this.$axios.$post(customEndpoint, payload);
		},
		getQrRegistrationLinks(ctx, payload = {}) {
			const customEndpoint = "/users/qrRegistrationLink";
			return this.$axios.$post(customEndpoint, payload);
		},
		getByRole: async function (ctx, role) {
			const queryRole = {
				roles: [role._id],
			};

			return (
				await this.dispatch("users/find", {
					query: queryRole,
				})
			).data;
		},
		getById: async function (ctx, id) {
			const queryId = {
				_id: id,
			};

			return (
				await this.dispatch("users/find", {
					query: queryId,
				})
			).data[0];
		},
	},
});

export const { state, getters, mutations, actions } = module;
