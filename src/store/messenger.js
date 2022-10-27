export const actions = {
	async loadMessengerToken({ commit }) {
		try {
			const data = (await this.$axios.post("/v1/messengerToken")).data;
			commit("setMessengerToken", data);
		} catch (error) {
			commit("setError", error);
			// TODO what is supposed to happen on error?
		}
	},
	init(context) {
		context.commit("init", {
			MATRIX_MESSENGER__EMBED_URI: this.$config.MATRIX_MESSENGER__EMBED_URI,
			FEATURE_MATRIX_MESSENGER_ENABLED:
				this.$config.FEATURE_MATRIX_MESSENGER_ENABLED,
		});
	},
};

export const getters = {
	serverName: (state) => {
		if (
			state.session &&
			state.session.userId &&
			state.session.userId.lastIndexOf(":") >= 0
		) {
			return state.session.userId.substr(
				state.session.userId.lastIndexOf(":") + 1
			);
		}
		return null;
	},
	getMatrixFeatureFlg(state) {
		return state.matrixFeatureFlag;
	},
	getMatrixAssetDomain(state) {
		return state.matrixAssetDomain;
	},
	getSession(state) {
		return state.session;
	},
	getSessionFromLocalStorage(state) {
		return state.sessionFromLocalStorage;
	},
	getServerName(state) {
		return state.serverName;
	},
};

export const mutations = {
	setMessengerToken(state, payload) {
		state.session = payload;
		state.error = null;
	},
	setError(state, error) {
		state.session = null;
		state.error = error;
	},
	init(
		state,
		{ MATRIX_MESSENGER__EMBED_URI, FEATURE_MATRIX_MESSENGER_ENABLED }
	) {
		state.matrixAssetDomain = MATRIX_MESSENGER__EMBED_URI;
		state.matrixFeatureFlag = FEATURE_MATRIX_MESSENGER_ENABLED;
	},
};

export const state = () => {
	return {
		session: null,
		// session is available in local storage, the messenger will access it itself
		sessionFromLocalStorage:
			window.localStorage &&
			window.localStorage.getItem("mx_hs_url") &&
			window.localStorage.getItem("mx_access_token") &&
			window.localStorage.getItem("mx_user_id"),
	};
};
