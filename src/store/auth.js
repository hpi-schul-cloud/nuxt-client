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
			throw new Error("Can not read jwt from cookies.");
		}
		const payload = jwtDecode(jwt);
		return dispatch("populateUser", payload.userId);
		//return res;
	},
	async logout({ commit }) {
		this.$cookies.remove("jwt");
		localStorage.clear();
		// Delete matrix messenger indexedDB databases
		if (indexedDB) {
			// window.indexedDB.databases() is not available in all browsers
			const databases = [
				"logs",
				"matrix-js-sdk:crypto",
				"matrix-js-sdk:riot-web-sync",
			];

			for (let i = 0; i < databases.length; i += 1) {
				indexedDB.deleteDatabase(databases[i]);
			}
		}
		commit("clearAuthData");
	},
	async populateUser({ commit }) {
		const user = await this.$axios.$get("/me");
		commit("setUser", user);
		if (user.schoolId) {
			const school = await this.$axios.$get(`/schools/${user.schoolId}`);
			commit("setSchool", school);
		}
		if (user.language) {
			commit("setLocale", user.language);
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
	setLocale(state, locale) {
		state.locale = locale;
	},
	setAccessToken(state, payload) {
		state.accessToken = payload;
	},
	addUserPermission(state, permission) {
		state.user.permissions.push(permission);
	},
	clearAuthData(state) {
		state.accessToken = null;
		state.user = null;
		state.school = null;
	},
};

export const getters = {
	getLocale(state) {
		return state.locale;
	},
};

export const state = () => {
	return {
		accessToken: "",
		payload: null,
		user: {},
		school: {},
		publicPages: ["index", "login", "signup", "impressum"],
		locale: "de",
	};
};

export default {
	namespaced: true,
	actions,
	getters,
	mutations,
	state,
};
