const module = {
	state() {
		return {
			school: {},
			fileStorageTotal: 0,
			loading: false,
			error: null,
		};
	},
	actions: {
		async fetchSchool({ commit, rootState, dispatch }) {
			commit("setLoading", true);

			if (rootState.auth?.user?.schoolId) {
				try {
					const school = await this.$axios.$get(
						`/schools/${rootState.auth.user.schoolId}`
					);
					commit("setSchool", school);
					await dispatch("schools/fetchCurrentYear", {}, { root: true });
					console.log("school", rootState.schools.school);
					await dispatch(
						"schools/fetchFederalState",
						{},
						{ root: true }
					);
					commit("setLoading", false);
				} catch (error) {
					commit("setError", error);
					commit("setLoading", false);
					// TODO what is supposed to happen on error?
				}
			}
		},
		async fetchFederalState({ commit, rootState }) {
			commit("setLoading", true);

			try {
				const response = await this.$axios.$get(
					`/federalStates/${rootState.schools.school.federalState}`
				);

				commit("setFederalState", response);
				commit("setLoading", false);
			} catch (error) {
				commit("setError", error);
				commit("setLoading", false);
				// TODO what is supposed to happen on error?
			}
		},
		async fetchCurrentYear({ commit, rootState }) {
			commit("setLoading", true);

			try {
				const currentYear = await this.$axios.$get(
					`/years/${rootState.schools.school.currentYear}`
				);
				commit("setCurrentYear", currentYear);
				commit("setLoading", false);
			} catch (error) {
				commit("setError", error);
				commit("setLoading", false);
				// TODO what is supposed to happen on error?
			}
		},
		async fetchFileStorageTotal({ commit }) {
			commit("setLoading", true);

			try {
				const fileStorageTotal = await this.$axios.$get("/fileStorage/total");
				commit("setFileStorageTotal", fileStorageTotal);
				commit("setLoading", false);
			} catch (error) {
				commit("setError", error);
				commit("setLoading", false);
				// TODO what is supposed to happen on error?
			}
		},
		async update({ commit }, payload) {
			commit("setLoading", true);
			try {
				const data = await this.$axios.$patch(
					`/schools/${payload.id}`,
					payload
				);
				console.log("data", data);
				commit("setSchool", data);
				commit("setLoading", false);
			} catch (error) {
				commit("setError", error);
				commit("setLoading", false);
				// TODO what is supposed to happen on error?
			}
		},
	},
	mutations: {
		setSchool(state, updatedSchool) {
			state.school = updatedSchool;
		},
		setFileStorageTotal(state, fileStorageTotal) {
			state.fileStorageTotal = fileStorageTotal;
		},
		setCurrentYear(state, currentYear) {
			state.school = { ...state.school, currentYear };
		},
		setFederalState(state, federalState) {
			state.school = { ...state.school, federalState };
		},
		setLoading(state, loading) {
			state.loading = loading;
		},
		setError(state, error) {
			state.error = error;
		},
	},
	getters: {
		getSchool(state) {
			return state.school;
		},
		getFileStorageTotal(state) {
			return state.fileStorageTotal;
		},
		getCurrentYear(state) {
			return state.school.currentYear;
		},
		getFederalState(state) {
			return state.school.federalState;
		},
		getLoading(state) {
			return state.loading;
		},
		getError(state) {
			return state.error;
		},
		schoolIsExternallyManaged(state) {
			return state.school.isExternal;
		},
	},
};
export default module;
