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
		createStudent(ctx, studentData) {
			const customEndpoint = "/users/admin/students";
			return this.$axios.$post(customEndpoint, studentData);
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

export default module;
