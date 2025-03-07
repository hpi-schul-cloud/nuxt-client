import { reactive } from "vue";
import { $axios } from "@/utils/api";
import { Logger } from "@util-logger";

export default function (endpoint) {
	const baseUrl = "/v1/" + endpoint;
	const getDefaultState = () => {
		return {
			current: null,
			list: [],
			pagination: {},
			businessError: null,
			status: null,
		};
	};
	return {
		namespaced: true,
		baseUrl,
		actions: {
			async find({ commit }, payload = {}) {
				const { qid = "default", query } = payload;
				commit("setStatus", "pending");
				const res = (
					await $axios.get(baseUrl, {
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
			async get({ commit }, payload = {}) {
				let id;
				if (Array.isArray(payload)) {
					id = payload[0];
				} else if (typeof payload === "string") {
					id = payload;
				}
				commit("setStatus", "pending");
				const data = (await $axios.get(baseUrl + "/" + id)).data;
				commit("setCurrent", data);
				commit("setStatus", "completed");
			},
			async create({ commit }, payload = {}) {
				commit("setStatus", "pending");
				const data = (await $axios.post(baseUrl, payload)).data;
				commit("set", {
					items: Array.isArray(data) ? data : [data],
				});
				commit("setStatus", "completed");
			},
			async patch({ commit }, payload = []) {
				commit("setStatus", "pending");
				const data = (
					await $axios.patch(baseUrl + "/" + payload[0], payload[1])
				).data;
				commit("set", {
					items: [data],
				});
				commit("setStatus", "completed");
			},
			async update({ commit }, payload = []) {
				commit("setStatus", "pending");
				const data = (await $axios.put(baseUrl + "/" + payload[0], payload[1]))
					.data;
				commit("set", {
					items: [data],
				});
				commit("setStatus", "completed");
			},
			async remove({ commit }, idOrPayload) {
				if (typeof idOrPayload === "string") {
					const id = idOrPayload;
					commit("setStatus", "pending");
					await $axios.delete(baseUrl + "/" + id);
					commit("remove", idOrPayload);
					commit("setStatus", "completed");
				} else {
					const payload = idOrPayload;
					const { query } = payload;
					commit("setStatus", "pending");
					await $axios.delete(baseUrl, {
						params: query,
						// paramsSerializer: (params) => {
						// 	return qs.stringify(params);
						// },
					});
					commit("setStatus", "completed");
				}
			},
		},
		getters: {
			getCurrent: (state) => {
				return state.current;
			},
			getList: (state) => {
				return state.list;
			},
			getBusinessError: (state) => {
				return state.businessError;
			},
			getPagination: (state) => {
				return state.pagination;
			},
			getStatus: (state) => {
				return state.status;
			},
			/**
			 * @deprecated use getStatus instead
			 */
			getLoading: (state) => {
				return state.status === "pending";
			},
		},
		mutations: {
			set(state, { items }) {
				state.list = items;
			},
			reset(state) {
				Object.assign(state, getDefaultState());
			},
			resetBusinessError(state) {
				state.businessError = null;
			},
			patchSingleItem(state, item) {
				const index = state.list.findIndex(
					(e) => e._id === item._id || item.id
				);
				if (index === -1) {
					Logger.error(
						"patchSingleItem error: No element in state.list found."
					);
				}
				state.list[index] = Object.assign(state.list[index], item);
			},
			setBusinessError(state, { statusCode, message }) {
				state.businessError = { statusCode, message };
			},
			remove(state, id) {
				const index = state.list.findIndex((e) => e._id === id);
				if (index === -1) {
					Logger.warn(`Can't remove item with id "${id}" (Not found)`);
					return;
				}
				state.list.splice(index, 1);
			},
			setCurrent(state, item) {
				state.current = item;
			},
			// Stores pagination data on state.pagination based on the query identifier (qid)
			// The qid must be manually assigned to `params.qid`
			updatePaginationForQuery(state, { res, qid, query }) {
				const { limit, skip, total } = res;

				state.pagination = reactive({
					...state.pagination,
					[qid]: {
						limit: parseInt(limit),
						skip: parseInt(skip),
						total: parseInt(total),
						query: parseInt(query),
					},
				});
			},
			setStatus(state, status) {
				state.status = status;
			},
		},
		state: () => getDefaultState(),
	};
}
