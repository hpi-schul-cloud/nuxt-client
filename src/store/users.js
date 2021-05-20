import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";

const base = serviceTemplate("users");

const module = mergeDeep(base, {
	actions: {
		handleUsers({ dispatch }, queryContext = {}) {
			const { userType, action } = queryContext;
			queryContext.customEndpoint = `/users/admin/${userType}`;
			return dispatch(action, queryContext);
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

			// TODO wrong use of store
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

			// TODO wrong use of store
			return (
				await this.dispatch("users/find", {
					query: queryId,
				})
			).data[0];
		},
	},
});

export const { state, getters, mutations, actions } = module;
