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
	updateStudent({ commit }, payload) {
		commit("updateStudentData", payload);
	},
	setStudents({ commit }, payload) {
		console.trace();
		commit("setStudentsData", payload);
	},
};

export const getters = {};

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
		const index = state.selectedStudentsData.findIndex(
			(st) => st._id === payload.id
		);
		if (payload.field === "birthDate")
			state.selectedStudentsData[index].birthday = payload.birthDate;
		if (payload.field === "pass")
			state.selectedStudentsData[index].password = payload.pass;
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
