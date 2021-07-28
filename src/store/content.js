import hash from "object-hash";
import { isCollectionHelper } from "@utils/helpers";
import EnvConfigModule from "@/store/env-config";

export const actions = {
	selectElement({ commit }, refId) {
		commit("selectElement", { id: refId, value: true });
	},
	unselectElement({ commit }, refId) {
		commit("selectElement", { id: refId, value: false });
	},
	async getResources({ commit }, payload = {}) {
		commit("incLoading");
		const query = {
			$limit: 12,
			$skip: 0,
			...payload,
		};
		const queryHash = hash(query);
		commit("setLastQuery", queryHash);
		try {
			const res = await this.$axios.$get("/edu-sharing", {
				params: query,
			});

			commit("setResources", { hash: queryHash, result: res });
		} catch (e) {
			console.error(e);
		} finally {
			commit("decLoading");
		}
	},
	async addResources({ commit }, payload = {}) {
		commit("incLoading");
		try {
			const res = await this.$axios.$get("/edu-sharing", {
				params: payload,
			});
			commit("addResources", res);
		} catch (e) {
			console.error("Error: ", e);
		} finally {
			commit("decLoading");
		}
	},

	async getElements({ commit }, payload = {}) {
		commit("incLoading");
		const query = {
			$limit: 12,
			$skip: 0,
			...payload,
		};
		const queryHash = hash(query);
		commit("setLastQuery", queryHash);
		try {
			const res = await this.$axios.$get("/edu-sharing", {
				params: query,
			});

			commit("setElements", { hash: queryHash, result: res });
		} catch (e) {
			console.error(e);
		} finally {
			commit("decLoading");
		}
	},

	async addElements({ commit }, payload = {}) {
		commit("incLoading");
		try {
			const res = await this.$axios.$get("/edu-sharing", {
				params: payload,
			});
			commit("addElements", res);
		} catch (e) {
			console.error("Error: ", e);
		} finally {
			commit("decLoading");
		}
	},

	async getLessons({ commit }, payload) {
		const params = {
			courseId: payload,
		};
		if (params.courseId) {
			//only search if courseId is existing
			const res = await this.$axios.$get("/lessons", { params });
			commit("setLessons", res);
		}
	},

	async addToLesson(ctx, payload = { material: {} }) {
		const { event } = payload;
		if (!event) throw new SyntaxError("eventBus missing");
		try {
			await this.$axios.post(
				`/lessons/${payload.lessonId}/material`,
				payload.material
			);
			event.$emit("showModal@content", "successModal");
		} catch (error) {
			event.$emit("showModal@content", "errorModal");
		}
	},
	async getResourceMetadata({ commit }, id) {
		commit("setStatus", "pending");
		const metadata = await this.$axios.$get(`/edu-sharing/${id}`);
		commit("setCurrentResource", metadata);
		commit("setStatus", "completed");
	},
	init({ commit }) {
		commit("init", {
			collectionsFeatureFlag:
				EnvConfigModule.getEnv.FEATURE_ES_COLLECTIONS_ENABLED,
		});
	},
};

const initialState = () => ({
	resources: {
		total: 0,
		limit: 0,
		skip: 0,
		data: [],
	},
	elements: {
		total: 0,
		limit: 0,
		skip: 0,
		data: [],
	},
	selected: 0,
	lessons: {
		data: [],
	},
	loadingCounter: 0,
	loading: false,
	lastQuery: "",
	collectionsFeatureFlag: null,
	currentResource: {},
	status: null,
});

export const getters = {
	getLessons(state) {
		return state.lessons;
	},
	getElements(state) {
		return state.elements;
	},
	getSelected(state) {
		return state.selected;
	},
	getLoading(state) {
		return state.loading;
	},
	getResources(state) {
		return state.resources;
	},
	getCollectionsFeatureFlag(state) {
		return state.collectionsFeatureFlag;
	},
	getCurrentResource: (state) => {
		return state.currentResource;
	},
	getStatus: (state) => {
		return state.status;
	},
	isCollection: (state) => {
		return (
			state.collectionsFeatureFlag === true &&
			isCollectionHelper(state.currentResource.properties)
		);
	},
};

export const mutations = {
	selectElement(state, payload) {
		for (let i = 0; i < state.elements.data.length; i++) {
			if (state.elements.data[i].ref.id === payload.id) {
				state.elements.data[i]["stateSelected"] = payload.value;
				break;
			}
		}
		state.selected = state.elements.data.filter(
			(element) => element.stateSelected === true
		).length;
	},
	setResources(state, payload) {
		if (state.lastQuery === payload.hash) state.resources = payload.result;
	},
	addResources(state, payload) {
		payload.data.forEach((resource) => state.resources.data.push(resource));
		state.resources = {
			...state.resources,
			pagination: payload.pagination,
		};
	},
	setElements(state, payload) {
		if (state.lastQuery === payload.hash) state.elements = payload.result;
	},
	addElements(state, payload) {
		payload.data.forEach((element) => state.elements.data.push(element));
		state.elements = {
			...state.elements,
			pagination: payload.pagination,
		};
	},
	clearResources(state) {
		state.resources = initialState().resources;
		state.selected = initialState().selected;
	},
	clearElements(state) {
		state.elements = initialState().elements;
		state.selected = initialState().selected;
	},
	clearLessons(state) {
		state.lessons = initialState().lessons;
	},
	setLastQuery(state, payload) {
		state.lastQuery = payload;
	},
	incLoading(state) {
		if (state.loadingCounter === 0) {
			state.loading = true;
		}
		state.loadingCounter += 1;
	},
	decLoading(state) {
		state.loadingCounter -= 1;
		if (state.loadingCounter === 0) {
			state.loading = false;
		}
	},
	setLessons(state, payload) {
		state.lessons = payload;
	},
	init(state, { collectionsFeatureFlag }) {
		state.collectionsFeatureFlag = collectionsFeatureFlag;
	},
	setCurrentResource(state, payload) {
		state.currentResource = payload;
	},
	setStatus(state, payload) {
		state.status = payload;
	},
};

export const state = initialState();
