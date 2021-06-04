const module = {
	state() {
		return {
			studentVisibility: false,
			lernStoreVisibility: false,
			fileStorageTotal: 0,
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
		async update({ commit }, payload) {
			console.log("payload", payload);
			commit("setRequestSuccessful", false);
			try {
				const data = await this.$axios.$patch(`/schools/${payload.id}`, payload);
				console.log("data", data);
				commit("setSchool", data); // should we be committing here and then basically have two schools in store?
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
		setFileStorageTotal(state, fileStorageTotal) {
			state.fileStorageTotal = fileStorageTotal;
		},
		setSchool(state, updatedSchool) {
			state.school = updatedSchool;
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
