export const actions = {
	async loadMessengerToken({ commit }) {
		try {
			const data = await this.$axios.$post("/messengerToken");
			commit("setMessengerToken", data);
		} catch (error) {
			commit("setError", error);
			// TODO what is supposed to happen on error?
		}
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
};

export const state = () => {
	return {
		matrixFeatureFlag: process.env.FEATURE_MATRIX_MESSENGER_ENABLED === "true",
		matrixAssetDomain: process.env.MATRIX_MESSENGER_EMBED_URI,
		session: null,
		// session is available in local storage, the messenger will access it itself
		sessionFromLocalStorage:
			window.localStorage &&
			window.localStorage.getItem("mx_hs_url") &&
			window.localStorage.getItem("mx_access_token") &&
			window.localStorage.getItem("mx_user_id"),
	};
};
