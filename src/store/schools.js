const module = {
	state() {
		return {
			school: {},
			studentVisibility: false,
			lernStoreVisibility: false,
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
					dispatch("schools/fetchCurrentYear", {}, { root: true });
					commit("setLoading", false);
				} catch (error) {
					commit("setError", error);
					commit("setLoading", false);
					// TODO what is supposed to happen on error?
				}
			}
		},
		async fetchStudentVisibility({ commit }) {
			commit("setLoading", true);

			try {
				const studentVisibility = await this.$axios.$get(
					`/school/teacher/studentvisibility`
				);
				commit("setStudentVisibility", studentVisibility.isEnabled);
				commit("setLoading", false);
			} catch (error) {
				commit("setError", error);
				commit("setLoading", false);
				// TODO what is supposed to happen on error?
			}
		},
		async fetchLernStoreVisibility({ commit }) {
			commit("setLoading", true);

			try {
				const lernStoreVisibility = await this.$axios.$get(
					`/school/student/studentlernstorevisibility`
				);
				commit("setLernStoreVisibility", lernStoreVisibility.isEnabled);
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
