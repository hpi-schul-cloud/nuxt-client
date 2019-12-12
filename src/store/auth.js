// const endpoint = "/authentication";
var jwtDecode = require("jwt-decode");

export const actions = {
	async authenticate({ dispatch }) {
		/*
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
		*/
		const jwt = this.$cookies.get("jwt");
		if (!jwt) {
			throw new Error("No Accesstoken received");
		}
		const payload = jwtDecode(jwt);
		return dispatch("populateUser", payload.userId);
		//return res;
	},
	async logout(ctx) {
		this.$cookies.remove("jwt");
	},
	async populateUser({ commit }) {
		const user = await this.$axios.$get("/me");
		commit("setUser", user);
		if (user.schoolId) {
			const school = await this.$axios.$get(`/schools/${user.schoolId}`);
			commit("setSchool", school);
		}
		//TODO Remove once added to User permissions SC-2401
		if (process.env["FEATURE_EXTENSIONS_ENABLED"] === "true") {
			commit("addUserPermission", "ADDONS_ENABLED");
		}
		if (process.env["FEATURE_TEAMS_ENABLED"] === "true") {
			commit("addUserPermission", "TEAMS_ENABLED");
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
	addUserPermission(state, permission) {
		state.user.permissions.push(permission);
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

export default {
	namespaced: true,
	actions,
	mutations,
	state,
};
