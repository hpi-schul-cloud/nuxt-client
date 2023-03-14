import mergeDeep from "@/utils/merge-deep";
import serviceTemplate from "@/utils/service-template";
import { $axios } from "@/utils/api";

const base = serviceTemplate("users");
const baseState = base.state();

const teacherEndpoint = "/v1/users/admin/teachers";
const studentEndpoint = "/v1/users/admin/students";

const usersModule = mergeDeep(base, {
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
			registrationLinks: [],
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
		setRegistrationLinks(state, payload) {
			state.registrationLinks = payload;
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
		getRegistrationLinks(state) {
			return state.registrationLinks;
		},
	},
	actions: {
		async findStudents({ commit }, payload = {}) {
			const { qid = "default", query } = payload;
			commit("setStatus", "pending");
			const res = (
				await $axios.get("/v1/users/admin/students", {
					params: query,
					// paramsSerializer: (params) => {
					// 	return qs.stringify(params);
					// },
				})
			).data;
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
			const res = (
				await $axios.get(teacherEndpoint, {
					params: query,
					// paramsSerializer: (params) => {
					// 	return qs.stringify(params);
					// },
				})
			).data;
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
			const res = (
				await $axios.get(`/v1/users/admin/students`, {
					params: query,
					// paramsSerializer: (params) => {
					// 	return qs.stringify(params);
					// },
				})
			).data;
			commit("setConsentList", res.data);
		},
		async deleteUsers({ commit }, { ids, userType }) {
			try {
				commit("startProgress", { action: "delete" });
				const chunkSize = 5;
				const numChunks = Math.ceil(ids.length / chunkSize);
				for (let i = 0; i < numChunks; i++) {
					const percent = ((i + 1) * chunkSize * 100) / (numChunks * chunkSize);
					const chunkIds = ids.slice(i * chunkSize, i * chunkSize + chunkSize);
					await $axios.delete(`/v1/users/v2/admin/${userType}`, {
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
			const teacher = (await $axios.post(teacherEndpoint, teacherData)).data;
			commit("setCurrent", teacher);
		},
		async createStudent({ commit }, payload) {
			commit("resetBusinessError");
			try {
				const student = (await $axios.post(studentEndpoint, payload)).data;
				commit("setCurrent", student);
			} catch (error) {
				commit("setBusinessError", error.response?.data);
			}
		},
		async sendRegistrationLink({ commit }, payload = {}) {
			const registrationLinkEndpoint = "/v1/users/mail/registrationLink";
			const links = (await $axios.post(registrationLinkEndpoint, payload)).data;
			commit("setRegistrationLinks", links);
		},
		async getQrRegistrationLinks({ commit }, payload = {}) {
			const registrationQrEndpoint = "/v1/users/qrRegistrationLink";
			const links = (await $axios.post(registrationQrEndpoint, payload)).data;
			commit("setQrLinks", links);
		},
	},
});

export const { state, getters, mutations, actions } = usersModule;

export default usersModule;
