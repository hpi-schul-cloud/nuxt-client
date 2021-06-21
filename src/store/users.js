import qs from "qs";
import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";
import qs from "qs";

const base = serviceTemplate("users");
const baseState = base.state();

const teacherEndpoint = "/users/admin/teachers";
const studentEndpoint = "/users/admin/students";

const module = mergeDeep(base, {
	state: () =>
		mergeDeep(baseState, {
			progress: {
				delete: {
					active: false,
					percent: 0,
				},
			},
			qrLinks: [],
			consentList: [],
		}),
	mutations: {
		startProgress(state, { action }) {
			state.progress[action].active = true;
			state.progress[action].percent = 0;
		},
		stopProgress(state, { action }) {
			state.progress[action].active = false;
			state.progress[action].percent = 0;
		},
		updateProgress(state, { action, percent }) {
			state.progress[action].percent = percent;
		},
		setQrLinks(state, payload) {
			state.qrLinks = payload;
		},
		setConsentList(state, { data }) {
			state.consentList = data;
		},
	},
	getters: {
		getPagination(state) {
			return state.pagination.default || { limit: 10, total: 0 };
		},
		getActive(state) {
			return state.progress.delete.active;
		},
		getPercent(state) {
			return state.progress.delete.percent;
		},
		getQrLinks(state) {
			return state.qrLinks;
		},
		getConsentList(state) {
			return state.consentList;
		},
	},
	actions: {
		async findStudents({ commit }, payload = {}) {
			const { qid = "default", query } = payload;
			commit("setStatus", "pending");
			const res = await this.$axios.$get(studentEndpoint, {
				params: query,
				paramsSerializer: (params) => {
					return qs.stringify(params);
				},
			});
			commit("updatePaginationForQuery", {
				query,
				qid,
				res,
			});
			commit("set", {
				items: res.data,
			});
			commit("setStatus", "completed");
		},
		async findTeachers({ commit }, payload = {}) {
			const { qid = "default", query } = payload;
			commit("setStatus", "pending");
			const res = await this.$axios.$get(teacherEndpoint, {
				params: query,
				paramsSerializer: (params) => {
					return qs.stringify(params);
				},
			});
			commit("updatePaginationForQuery", {
				query,
				qid,
				res,
			});
			commit("set", {
				items: res.data,
			});
			commit("setStatus", "completed");
		},
		async findConsentUsers({ commit }, query) {
			const res = await this.$axios.$get(`/users/admin/students`, {
				params: query,
				paramsSerializer: (params) => {
					return qs.stringify(params);
				},
			});
			commit("setConsentList", res);
		},
		async deleteUsers({ commit }, { ids, userType }) {
			try {
				commit("startProgress", { action: "delete" });
				const chunkSize = 5;
				const numChunks = Math.ceil(ids.length / chunkSize);
				for (let i = 0; i < numChunks; i++) {
					const percent = ((i + 1) * chunkSize * 100) / (numChunks * chunkSize);
					const chunkIds = ids.slice(i * chunkSize, i * chunkSize + chunkSize);
					await this.$axios.$delete(`/users/v2/admin/${userType}`, {
						params: { ids: chunkIds },
					});
					chunkIds.forEach((id) => {
						commit("remove", id);
					});
					commit("updateProgress", { action: "delete", percent });
				}
				// make sure the user has a chance to see 100% progress
				await new Promise((resolve) => setTimeout(resolve, 500));
			} finally {
				commit("stopProgress", { action: "delete" });
			}
		},
		async createTeacher({ commit }, teacherData) {
			const teacher = await this.$axios.$post(teacherEndpoint, teacherData);
			commit("setCurrent", teacher);
		},
		async createStudent({ commit }, payload) {
			commit("resetBusinessError");
			const { successMessage, ...studentData } = payload;
			try {
				const student = await this.$axios.$post(studentEndpoint, studentData);
				this.$toast.success(successMessage);
				this.$router.push({
					path: `/administration/students`,
				});
				commit("setCurrent", student);
			} catch (error) {
				commit("setBusinessError", error.response.data);
			}
		},
		async sendRegistrationLink(ctx, payload = {}) {
			const registrationLinkEndpoint = "/users/mail/registrationLink";
			await this.$axios.$post(registrationLinkEndpoint, payload);
		},
		async getQrRegistrationLinks({ commit }, payload = {}) {
			const registrationQrEndpoint = "/users/qrRegistrationLink";
			const links = await this.$axios.$post(registrationQrEndpoint, payload);
			commit("setQrLinks", links);
		},
	},
});

export const { state, getters, mutations, actions } = module;
