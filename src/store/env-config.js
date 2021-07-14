export const requiredVars = {
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: process.env.SC_THEME || "default", // currently not loaded from server, but inserted at build time
};

export const configsFromEnvironmentVars = {
	FEATURE_MATRIX_MESSENGER_ENABLED:
		process.env.FEATURE_MATRIX_MESSENGER_ENABLED,
	MATRIX_MESSENGER__EMBED_URI: process.env.MATRIX_MESSENGER__EMBED_URI,
	MATRIX_MESSENGER__URI: process.env.MATRIX_MESSENGER__URI,
	MATRIX_MESSENGER__DISCOVER_URI: process.env.MATRIX_MESSENGER__DISCOVER_URI,
	LERNSTORE_MODE: process.env.LERNSTORE_MODE,
};

const retryLimit = 10;

export const actions = {
	async get({ commit, dispatch, state }) {
		try {
			const env = await this.$axios.$get("/config/app/public");
			Object.entries(requiredVars).forEach(([key]) => {
				if (env[key] == null) {
					console.warn(`Missing configuration by server for key ${key}`);
				}
			});

			commit("setEnv", { ...configsFromEnvironmentVars, ...env });
		} catch (error) {
			commit("setError", error);
			console.error(`Configuration could not be loaded from the server`);
			if (state.loadingErrorCount < retryLimit) {
				commit("increaseLoadingErrorCount");
				setTimeout(() => {
					dispatch("get", {});
				}, 500);
			}
		}
		dispatch("autoLogout/init", {}, { root: true });
		dispatch("content/init", {}, { root: true });
		dispatch("filePaths/init", {}, { root: true });
	},
};

export const mutations = {
	setEnv(state, payload) {
		state.env = { ...requiredVars, ...payload };
	},
	setError(state, error) {
		state.error = error;
	},
	increaseLoadingErrorCount(state) {
		state.loadingErrorCount += 1;
	},
};

export const getters = {
	getFallbackLanguage: (state) => {
		return state.env.I18N__FALLBACK_LANGUAGE || "de";
	},
	getDefaultTimezone: (state) => {
		return state.env.I18N__DEFAULT_TIMEZONE || "Europe/Berlin";
	},
	getEnv(state) {
		return state.env;
	},
	getMatrixConfig: (state) => {
		return {
			enabled: state.env.FEATURE_MATRIX_MESSENGER_ENABLED,
			schoolSettingsVisible:
				state.env.MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE,
			studentRoomCreation: state.env.MATRIX_MESSENGER__STUDENT_ROOM_CREATION,
			schoolRoomEnabled: state.env.MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED,
		};
	},
	getAdminToggleStudentLernstoreViewEnabled: (state) =>
		state.env.FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED &&
		state.env.LERNSTORE_MODE === "EDUSHARING",
	getAdminToggleStudentVisibilityEnabled: (state) =>
		state.env.FEATURE_ADMIN_TOGGLE_STUDENT_VISIBILITY_ENABLED,
	getVideoConferenceEnabled: (state) =>
		state.env.FEATURE_VIDEOCONFERENCE_ENABLED,
	getSchoolPolicyEnabled: (state) => state.env.FEATURE_SCHOOL_POLICY_ENABLED,
	getRocketChatEnabled: (state) => state.env.ROCKETCHAT_SERVICE_ENABLED,
	getAvailableLanguages: (state) => state.env.I18N__AVAILABLE_LANGUAGES,
};

export const state = () => {
	return {
		env: requiredVars,
		error: {},
		loadingErrorCount: 0,
	};
};

export default {
	actions,
	mutations,
	getters,
	state,
	getters,
};
