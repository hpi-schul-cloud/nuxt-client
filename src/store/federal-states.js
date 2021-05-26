const module = {
	state() {
		return {
			federalStates: [],
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
				commit("requestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("requestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
	},
	mutations: {
		setFederalStates: (state, federalStates) => {
			state.federalStates = federalStates;
		},
		setRequestSuccessful(state, saved) {
			saved.requestSuccessful = true;
		},
		setError(state, error) {
			state.error = error;
		},
	},
};

export default module;
