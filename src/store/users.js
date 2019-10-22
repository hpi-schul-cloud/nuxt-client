import mergeDeep from "../utils/merge-deep";
import serviceTemplate from "../utils/service-template";
const base = serviceTemplate("users");

const module = mergeDeep(base, {
	actions: {
		getByRole: async function(ctx, role) {
			const queryRole = {
				roles: [role._id],
			};

			return (await this.dispatch("users/find", {
				query: queryRole,
			})).data;
		},
	},
});

export default module;
