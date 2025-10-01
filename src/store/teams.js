import mergeDeep from "@/utils/merge-deep";
import serviceTemplate from "@/utils/service-template";
const base = serviceTemplate("teams");
import { $axios } from "@/utils/api";

const module = mergeDeep(base, {
	actions: {
		acceptInvitation: async function (ctx, teamId) {
			const data = (await $axios.get("/v1/teams/extern/accept/" + teamId)).data;
			return data;
		},
		getMyInvitations: async function () {
			const data = (await $axios.get("/v1/teams/extern/get/")).data;
			return data;
		},
		inviteExternal: async function (ctx, payload) {
			const data = (
				await $axios.patch("/v1/teams/extern/add/" + payload.teamId, {
					userId: payload.userId,
					email: payload.email,
					role: payload.role,
				})
			).data;
			return data;
		},
		resendInvitation: async function (ctx, payload) {
			const data = (
				await $axios.patch("/v1/teams/extern/add/" + payload.teamId, {
					email: payload.email,
				})
			).data;
			return data;
		},
		deleteInvitation: async function (ctx, payload) {
			const data = (
				await $axios.patch("/v1/teams/extern/remove/" + payload.teamId, {
					email: payload.email,
				})
			).data;
			return data;
		},
	},
	getters: {
		hasTeamPermission: (_state, localGetters) => (permission) =>
			localGetters.current.user ? localGetters.current.user.permissions.find((p) => p === permission) : false,
	},
});

export default module;
