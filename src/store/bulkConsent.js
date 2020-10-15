export const actions = {
	async register({ commit }, payload) {
		const registered = [];

		if (Array.isArray(payload)) {
			const errors = [];
			const promiseResult = await Promise.allSettled(
				payload.map((user) => {
					registered.push(user._id);
					this.$axios
						.$patch("/users/admin/students/" + user._id, user)
						.then((userData) => {
							const accountModel = {
								lasttriedFailedLogin: "1970-01-01T00:00:00.000Z",
								activated: true,
								username: userData.email,
								password: user.password,
								userId: user._id,
							};
							this.$axios.$post("/accounts/", accountModel);
						})
						.catch((error) => errors.push({ updateError: error }));
				})
			);

			promiseResult.map((promise) => {
				if (promise.status !== "fulfilled") {
					errors.push(promise);
				}
				if (errors.length)
					commit("setRegisterError", { promiseErrors: errors });
			});

			commit("setRegisteredStudents", registered);
		} else {
			commit("setRegisterError", { mapError: true });
		}
	},
	async findStudents({ commit }, query = {}) {
		const res = await this.$axios.$get("/users/admin/students", {
			query,
			action: "find",
			userType: "students",
		});

		commit("setStudentsData", res);
		return res;
	},
	updateStudents({ commit }, payload) {
		commit("updateStudentData", payload);
	},
	setStudents({ commit }, payload) {
		commit("setStudentsData", payload);
	},
};

export const getters = {
	selectedStudents: (state) => state.selectedStudents,
	selectedStudentsData: (state) => state.selectedStudentsData,
	registeredStudents: (state) => state.registeredStudents,
	registerError: (state) => state.registerError,
};

export const mutations = {
	setSelectedStudents(state, payload) {
		state.selectedStudents = payload.students;
	},
	setRegisteredStudents(state, payload) {
		state.registeredStudents = payload;
	},
	setStudentsData(state, payload) {
		state.selectedStudentsData = payload;
	},
	updateStudentData(state, payload) {
		state.selectedStudentsData = payload;
	},
	setRegisterError(state, payload) {
		state.registerError = payload;
	},
};

export const state = () => {
	return {
		selectedStudents: [],
		registeredStudents: [],
		selectedStudentsData: [],
		registerError: {},
	};
};
