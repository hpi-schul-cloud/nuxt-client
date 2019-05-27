import Vue from "vue";
import Vuex from "vuex";
// import { app } from './feathers-client'
import { CookieStorage } from "cookie-storage";
import feathersVuex from "feathers-vuex";
import feathersClient from "./feathers-client";
const moment = require("moment");

let plugins = [];
const enableEvents = typeof window !== "undefined";

const browserClient = feathersClient(
	"",
	new CookieStorage({
		domain: "localhost",
		path: "/",
		expires: moment()
			.add(14, "d")
			.toDate(),
		secure: false,
	})
);
const { service, auth, FeathersVuex } = feathersVuex(browserClient, {
	idField: "_id",
	enableEvents: enableEvents,
});

Vue.use(FeathersVuex);

plugins = [
	service("/content/search", {
		namespace: "content_search",
		paginate: true,
		autoRemove: true,
		replaceItems: true,
	}),
	service("courses", {
		instanceDefaults: {
			name: "",
			description: "",
			startDate: "",
			untilDate: "",
			teachers: [],
			substitutions: [],
			classes: [],
			students: [],
			times: [],
		},
		paginate: true,
	}),
	service("teams", {
		paginate: true,
		getters: {
			hasTeamPermission: (state, getters) => (permission) => {
				return getters.current.user
					? getters.current.user.permissions.find((p) => p === permission)
					: false;
			},
		},
		actions: {
			acceptInvitation: async function(ctx, teamId) {
				return this.$axios.$get("/teams/extern/accept/" + teamId);
			},
			getMyInvitations: async function() {
				return this.$axios.$get("/teams/extern/get/");
			},
			inviteExternal: async function(ctx, payload) {
				return this.$axios.$patch("/teams/extern/add/" + payload.teamId, {
					userId: payload.userId,
					email: payload.email,
					role: payload.role,
				});
			},
			resendInvitation: async function(ctx, payload) {
				return this.$axios.$patch("/teams/extern/add/" + payload.teamId, {
					email: payload.email,
				});
			},
			deleteInvitation: async function(ctx, payload) {
				return this.$axios.$patch("/teams/extern/remove/" + payload.teamId, {
					email: payload.email,
				});
			},
		},
	}),
	service("news", { paginate: true }),
	service("schools", { paginate: true }),
	service("roles", { paginate: true }),
	service("classes", { paginate: true }),
	service("users", { paginate: true }),
	service("publicTeachers", { paginate: true }),
	auth({
		userService: "users",
		actions: {
			hasRole: async (
				{ dispatch, rootGetters, state, rootState },
				roleName
			) => {
				if (rootState.roles.ids.length < 1) {
					await dispatch(
						"roles/find",
						{ query: { $limit: 1000 } },
						{ root: true }
					);
				}

				const roles = rootGetters["roles/list"];
				const userRoles = state.user.roles;

				const userRolesMapped = userRoles.map((id) => {
					id = roles.find((role) => role._id === id);
					return id;
				});

				return userRolesMapped.find((r) => r.name === roleName) !== undefined;
			},
		},
		state: {
			publicPages: ["index", "login", "signup"],
		},
	}),
];

plugins.push();

const createStore = () => {
	return new Vuex.Store({
		state: {},
		actions: {},
		modules: {
			federalStates: {
				namespaced: true,
				actions: {
					async find({ commit }, payload) {
						const federalStates = await this.$axios.$get("/federalStates");
						commit("add", { items: federalStates.data });
					},
				},
				getters: {
					list: (state) => {
						return state.list;
					},
				},
				state: () => ({
					list: [],
				}),
				mutations: {
					add(state, { items }) {
						for (const item of items) {
							state.list.push(item);
						}
					},
				},
			},
		},
		plugins: plugins,
	});
};

export default createStore;
