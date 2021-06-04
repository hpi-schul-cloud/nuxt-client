const module = {
	state() {
		return {
			consentVersions: [],
			setRequestSuccessful: false,
			error: null,
		};
	},
	actions: {
		async fetchConsentVersions({ commit }, params) {
			commit("setRequestSuccessful", false);
			try {
				const response = await this.$axios.$get("/consentVersions", {
					params,
				});
				commit("setConsentVersions", response.data);
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
		async fetchConsentVersionFile({ commit }, consentDataId) {
			commit("setRequestSuccessful", false);
			try {
				const response = await this.$axios.$get(`/base64/${consentDataId}`)
				console.log(response)
				commit("setConsentVersions", response.data);
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		}
	},
	mutations: {
		setConsentVersions(state, consentVersions) {
			state.consentVersions = consentVersions;
		},
		setRequestSuccessful(state) {
			state.setRequestSuccessful = true;
		},
		setError(state, error) {
			state.error = error;
		},
	},
};
export default module;
