import Vue from "vue";
import Vuex from "vuex";
// import { app } from './feathers-client'
import { CookieStorage } from "cookie-storage";
import feathersVuex, { initAuth } from "feathers-vuex";
import feathersClient from "./feathers-client";
const moment = require("moment");

let plugins = [];
const enableEvents = typeof window !== "undefined";

if (process.client) {
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
	const { service: browserService, auth: browserAuth, FeathersVuex } = feathersVuex(
		browserClient,
		{ idField: "_id", enableEvents: enableEvents }
	);

	Vue.use(FeathersVuex);

	plugins = [
		browserService("/content/search", {
			namespace: "content_search",
			paginate: true,
			autoRemove: true,
			replaceItems: true,
		}),
		browserService("courses", { paginate: true }),
		browserService("teams", { 
			instanceDefaults: {
				name: '',
				description: ''
			},
			paginate: true,
		 }),
		browserService("news", { paginate: true }),
		browserService("schools", { paginate: true }),
		browserService("users", { paginate: true }),
		browserAuth({
			userService: "users",
			state: {
				publicPages: ["index", "login", "signup"],
			},
		}),
	];
}

plugins.push();

const createStore = () => {
	return new Vuex.Store({
		state: {},
		actions: {
			nuxtServerInit({ commit, dispatch, state }, { req, store }) {
				let origin = req.headers.host.split(":");
				origin = `http://${origin[0]}`;

				const storage = {
					getItem(key) {
						return store.state.auth ? store.state.auth.accessToken : "";
					},
					setItem(key, value) {
						store.state.auth.accessToken = value;
					},
					removeItem(key) {
						store.state.auth.accessToken = null;
					},
				};

				// Create a new client for the server
				const client = feathersClient(origin, storage);
				const { service, FeathersVuex } = feathersVuex(client, {
					idField: "_id",
					enableEvents: false,
				});

				Vue.use(FeathersVuex);

				// Register services for the server
				service("users", { paginate: true })(store);
				service("teams", { paginate: true })(store);
				service("schools", { paginate: true })(store);

				return initAuth({
					commit: store.commit,
					dispatch,
					req,
					moduleName: "auth",
					cookieName: "feathers-jwt",
				});
			},
		},
		plugins: plugins,
	});
};

export default createStore;
