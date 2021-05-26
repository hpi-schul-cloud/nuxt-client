const module = {
	state() {
		return {
			federalStates: [],
			currentFederalState: {},
			requestSuccessful: false,
			error: null,
		};
	},
	actions: {
		async fetchFederalStates({ commit }) {
			commit("requestSuccessful", false);

			try {
				const response = await this.$axios.$get("/federalStates");

				commit("setFederalStates", response.data);
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
		async fetchCurrentFederalState({ commit }, id) {
			commit("requestSuccessful", false);

			try {
				const response = await this.$axios.$get(`/federalStates/${id}`);

				commit("setCurrentFederalState", response);
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
	},
	mutations: {
		setFederalStates: (state, federalStates) => {
			state.federalStates = federalStates;
		},
		setCurrentFederalState: (state, currentFederalState) => {
			state.currentFederalState = currentFederalState;
		},
		setRequestSuccessful(state, successful) {
			state.requestSuccessful = successful;
		},
		setError(state, error) {
			state.error = error;
		},
	},
};

export default module;
