// instead of using servicetemplate, do it yourself, cause the servicetemplate antipatterns
// an messenger store orientieren
// falls ts compiled wird, probieren in ts zu schreiben
const module = {
	state() {
		return {
			school: {},
			requestSuccessful: false,
			error: null,
		};
	},
	actions: {
		async update({ commit }, payload) {
			console.log(payload);
			commit("requestSuccessful", false);
			try {
				const data = await this.$axios.$post("/school");
				commit("set", data);
				commit("requestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("requestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
	},
	mutations: {
		set(state, updatedStage) {
			state.school = updatedStage;
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
