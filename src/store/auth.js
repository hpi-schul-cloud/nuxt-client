const endpoint = "/authentication";
var jwtDecode = require("jwt-decode");

export const actions = {
	async authenticate({ dispatch }) {
		const res = await this.$axios.$post(endpoint, {
			strategy: "jwt",
		});

		if (!res.accessToken) {
			throw new Error("No Accesstoken received");
			return;
		}

		const payload = jwtDecode(res.accessToken);

		if (!res.accessToken) {
			throw new Error("No userId found in JWT token");
			return;
		}

		dispatch("populateUser", payload.userId);
		return res;
	},
	async logout(ctx) {
		this.$cookies.remove("jwt");
		if (location && !location.pathname.endsWith("/login")) {
			window.location = "/login";
		}
	},
	async populateUser({ commit }) {
		const user = await this.$axios.$get("/me");
		commit("setUser", user);
		if (user.schoolId) {
			const school = await this.$axios.$get(`/schools/${user.schoolId}`);
			commit("setSchool", school);
		}
		return user;
	},
	async hasRole({ dispatch, rootGetters, state, rootState }, roleName) {
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
	setUser(state, user) {
		state.user = user;
	},
	setSchool(state, school) {
		state.school = school;
	},
	setAccessToken(state, payload) {
		state.accessToken = payload;
	},
};

export const state = () => {
	return {
		accessToken: "",
		payload: null,
		user: {},
		school: {},
		publicPages: ["index", "login", "signup", "impressum"],
	};
};
