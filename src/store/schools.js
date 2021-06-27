const module = {
	state() {
		return {
			school: {},
			studentVisibility: false,
			lernStoreVisibility: false,
			fileStorageTotal: 0,
			requestSuccessful: false,
			error: null,
		};
	},
	actions: {
		async fetchSchool({ commit, rootState, dispatch }) {
			commit("setRequestSuccessful", false);

			if (rootState.auth?.user?.schoolId) {
				try {
					const school = await this.$axios.$get(
						`/schools/${rootState.auth.user.schoolId}`
					);
					commit("setSchool", school);
					dispatch("schools/fetchCurrentYear", {}, { root: true });
					commit("setRequestSuccessful", true);
				} catch (error) {
					commit("setError", error);
					commit("setRequestSuccessful", false);
					// TODO what is supposed to happen on error?
				}
			}
		},
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
		async fetchFileStorageTotal({ commit }) {
			commit("setRequestSuccessful", false);

			try {
				const fileStorageTotal = await this.$axios.$get("/fileStorage/total");
				commit("setFileStorageTotal", fileStorageTotal);
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
		async fetchCurrentYear({ commit, rootState }) {
			commit("setRequestSuccessful", false);

			try {
				const currentYear = await this.$axios.$get(
					`/years/${rootState.schools.school.currentYear}`
				);

				commit("setCurrentYear", currentYear);
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
		async update({ commit }, payload) {
			console.log("payload", payload);
			commit("setRequestSuccessful", false);
			try {
				const data = await this.$axios.$patch(
					`/schools/${payload.id}`,
					payload
				);
				console.log("data", data);
				commit("setSchool", data); // should we be setting school in auth instead?
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
	},
	mutations: {
		setSchool(state, updatedSchool) {
			state.school = updatedSchool;
		},
		setStudentVisibility(state, studentVisibility) {
			state.studentVisibility = studentVisibility;
		},
		setLernStoreVisibility(state, lernStoreVisibility) {
			state.lernStoreVisibility = lernStoreVisibility;
		},
		setDataProtectionPolicies(state, dataProtectionPolicies) {
			state.dataProtectionPolicies = dataProtectionPolicies;
		},
		setFileStorageTotal(state, fileStorageTotal) {
			state.fileStorageTotal = fileStorageTotal;
		},
		setCurrentYear(state, currentYear) {
			state.school = { ...state.school, currentYear };
		},
		setRequestSuccessful(state, successful) {
			state.requestSuccessful = successful;
		},
		setError(state, error) {
			state.error = error;
		},
	},
	getters: {
		getSchool(state) {
			return state.school;
		},
		getStudentVisibility(state) {
			return state.studentVisibility;
		},
		getLernStoreVisibility(state) {
			return state.lernStoreVisibility;
		},
		getDataProtectionPolicies(state) {
			return state.dataProtectionPolicies;
		},
		getFileStorageTotal(state) {
			return state.fileStorageTotal;
		},
		getCurrentYear(state) {
			return state.school.currentYear;
		},
		getRequestSuccessful(state) {
			return state.requestSuccessful;
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
