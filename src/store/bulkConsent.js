import generatePassword from "@/mixins/generatePassword";
import { $axios } from "@/utils/api";

export const actions = {
	async register({ commit }, payload) {
		const registered = [];

		if (Array.isArray(payload)) {
			const errors = [];
			const promiseResult = await Promise.allSettled(
				payload.forEach((user) => {
					registered.push(user._id);
					$axios
						.patch("/v1/users/admin/students/" + user._id, {
							...user,
							createAccount: true,
						})
						.catch((error) => errors.push({ updateError: error }));
				})
			);

			promiseResult.forEach((promise) => {
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

	async findConsentUsers({ commit, state }, query) {
		query.users = state.selectedStudents;
		const response = (
			await $axios.get(`/v1/users/admin/students`, {
				params: query,
				// paramsSerializer: (params) => {
				// 	return qs.stringify(params);
				// },
			})
		).data;

		if (!response.data) {
			commit("setStudentsData", []);
			return;
		}

		const data = response.data
			.filter((item) => item.consentStatus !== "ok")
			.map((student) => {
				student.fullName = student.firstName + " " + student.lastName;
				student.password = generatePassword();
				return student;
			});
		commit("setStudentsData", data);
	},

	updateStudent({ commit }, payload) {
		commit("updateStudentData", payload);
	},
	setStudents({ commit }, payload) {
		commit("setStudentsData", payload);
	},
};

export const getters = {
	getSelectedStudentsData: (state) => state.selectedStudentsData,
	getSelectedStudents: (state) => state.selectedStudents,
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
		const index = state.selectedStudentsData.findIndex(
			(st) => st._id === payload.id
		);

		if (index !== -1 && payload.birthDate) {
			state.selectedStudentsData[index].birthday = payload.birthDate;
		}
		if (index !== -1 && payload.pass) {
			state.selectedStudentsData[index].password = payload.pass;
		}
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

export const bulkConsent = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
