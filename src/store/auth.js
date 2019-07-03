const endpoint = "/authentication";

export const actions = {
	authenticate: async () => {
		await this.$axios.$post(endpoint);
		// TODO
	},
	hasRole: async ({ dispatch, rootGetters, state, rootState }, roleName) => {
		if (rootState.roles.ids.length < 1) {
			await dispatch(
				"roles/find",
				{
					query: {
						$limit: 1000,
					},
				},
				{
					root: true,
				}
			);
		}

		const roles = rootGetters["roles/list"];
		const userRoles = state.user.roles;

		const userRolesMapped = userRoles.map((id) =>
			roles.find((role) => role._id === id)
		);

		return userRolesMapped.find((r) => r.name === roleName) !== undefined;
	},
};

export const mutations = {
	setAccessToken(state, payload) {
		state.accessToken = payload;
	},
};

export const state = () => {
	return {
		accessToken: "",
		payload: null,
		user: null,
		publicPages: ["index", "login", "signup", "impressum"],
	};
};
