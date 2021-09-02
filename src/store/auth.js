// const endpoint = "/authentication";
import EnvConfigModule from "@/store/env-config";
import SchoolsModule from "@/store/schools";
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
		const user = await this.$axios.$get("/v1/me");

		const roles = await this.$axios.$get(`/v1/roles/user/${user.id}`);
		user.permissions = roles.reduce(
			(acc, role) => [...new Set(acc.concat(role.permissions))],
			[]
		);

		commit("setUser", user);
		if (user.schoolId) {
			SchoolsModule.fetchSchool();
		}
		if (user.language) {
			commit("setLocale", user.language);
		}

		//TODO Remove once added to User permissions SC-2401
		if (EnvConfigModule.getEnv.FEATURE_EXTENSIONS_ENABLED) {
			commit("addUserPermission", "ADDONS_ENABLED");
		}
		if (EnvConfigModule.getEnv.FEATURE_TEAMS_ENABLED) {
			commit("addUserPermission", "TEAMS_ENABLED");
		}
		return user;
	},
};

export const mutations = {
	setUser(state, user) {
		state.user = user;
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
	},
};

export const getters = {
	getLocale(state) {
		if (state.locale) {
			return state.locale;
		}
		if (SchoolsModule.getSchool && SchoolsModule.getSchool.language) {
			return SchoolsModule.getSchool.language;
		}
		if (EnvConfigModule.getEnv.I18N__DEFAULT_LANGUAGE) {
			return EnvConfigModule.getEnv.I18N__DEFAULT_LANGUAGE;
		}
		return "de";
	},
	/** deprecated
	 */
	getSchool() {
		return SchoolsModule.getSchool;
	},
	getUser(state) {
		return state.user;
	},
	getAccessToken(state) {
		return state.accessToken;
	},
	getUserRoles(state) {
		return state.user.roles
			? state.user.roles.map((r) => r.name.toLowerCase())
			: [];
	},
	getUserRolesDisplayName(state) {
		return state.user.roles ? state.user.roles.map((r) => r.displayName) : [];
	},
	getAuthenticated(state) {
		return state.accessToken || false;
	},
	getUserPermissions(state) {
		return state.user.permissions
			? state.user.permissions.map((p) => p.toLowerCase())
			: [];
	},
	userIsExternallyManaged(state) {
		return !!state.user.externallyManaged;
	},
};

export const state = () => {
	return {
		accessToken: "",
		payload: null,
		user: {},
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
