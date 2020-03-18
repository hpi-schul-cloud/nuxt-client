import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";

const base = serviceTemplate("users");

const module = mergeDeep(base, {
	actions: {
		findStudents({ dispatch }, queryContext = {}) {
			queryContext.customEndpoint = "/users/admin/students";
			return dispatch("find", queryContext);
		},
		getByRole: async function(ctx, role) {
			const queryRole = {
				roles: [role._id],
			};

			return (
				await this.dispatch("users/find", {
					query: queryRole,
				})
			).data;
		},
		getById: async function(ctx, id) {
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
