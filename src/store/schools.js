const module = {
	state() {
		return {
			studentVisibility: false,
			lernStoreVisibility: false,
			dataProtectionPolicies: [],
			setRequestSuccessful: false,
			error: null,
		};
	},
	actions: {
		async fetchStudentVisibility({ commit }) {
			commit("setRequestSuccessful", false);

			try {
				const studentVisibility = await this.$axios.$get(
					`/school/teacher/studentvisibility`
				);

				commit("setStudentVisibility", studentVisibility.isEnabled);
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
		async fetchLernStoreVisibility({ commit }) {
			commit("setRequestSuccessful", false);

			try {
				const lernStoreVisibility = await this.$axios.$get(
					`/school/student/studentlernstorevisibility`
				);
				commit("setLernStoreVisibility", lernStoreVisibility.isEnabled);
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
		async fetchDataProtectionPolicies({ commit }, schoolId) {
			commit("setRequestSuccessful", false);

			try {
				const response = await this.$axios.$get("/consentVersions", {
					params: {
						schoolId,
						consentTypes: "privacy",
					},
				});

				commit("setDataProtectionPolicies", response.data);
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
		async update({ commit }, payload) {
			console.log(payload);
			commit("setRequestSuccessful", false);
			try {
				const data = await this.$axios.$post("/school");
				commit("set", data);
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
	},
	mutations: {
		setStudentVisibility(state, studentVisibility) {
			state.studentVisibility = studentVisibility;
		},
		setLernStoreVisibility(state, lernStoreVisibility) {
			state.lernStoreVisibility = lernStoreVisibility;
		},
		setDataProtectionPolicies(state, dataProtectionPolicies) {
			state.dataProtectionPolicies = dataProtectionPolicies;
		},
		set(state, updatedStage) {
			state.school = updatedStage;
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
