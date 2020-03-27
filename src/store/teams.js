import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";
const base = serviceTemplate("teams");

const module = mergeDeep(base, {
	actions: {
		acceptInvitation: async function (ctx, teamId) {
			return this.$axios.$get("/teams/extern/accept/" + teamId);
		},
		getMyInvitations: async function () {
			return this.$axios.$get("/teams/extern/get/");
		},
		inviteExternal: async function (ctx, payload) {
			return this.$axios.$patch("/teams/extern/add/" + payload.teamId, {
				userId: payload.userId,
				email: payload.email,
				role: payload.role,
			});
		},
		resendInvitation: async function (ctx, payload) {
			return this.$axios.$patch("/teams/extern/add/" + payload.teamId, {
				email: payload.email,
			});
		},
		deleteInvitation: async function (ctx, payload) {
			return this.$axios.$patch("/teams/extern/remove/" + payload.teamId, {
				email: payload.email,
			});
		},
	},
	getters: {
		hasTeamPermission: (_state, localGetters) => (permission) => {
			return localGetters.current.user
				? localGetters.current.user.permissions.find((p) => p === permission)
				: false;
		},
	},
});

export default module;
