import mergeDeep from "@utils/merge-deep";

const localStorageKey = "uiState";
const version = 1;
let initialize = false;

const defaultState = {
	pagination: {},
	filter: {},
	version,
};

const getDefaultState = () => {
	if (localStorage.getItem(localStorageKey)) {
		const uiState = JSON.parse(localStorage.getItem(localStorageKey));
		if (uiState.version == version) {
			Object.assign(defaultState, uiState);
		} else {
			uiState.version = version;
		}
	}
	initialize = true;

	return defaultState;
};

/**
 * Create/return unified data
 * @param {string} key
 * @param {string} methode set or get
 * @param {*} value what is to be saved
 */
const createPattern = (key, methode, value) => {
	switch (key) {
		case "pagination":
			return handlePagination(methode, value);

		case "filter":
			return handleFilter(methode, value);

		default:
			return value;
	}
};

const handlePagination = (methode, value) => {
	if (methode === "set") {
		const object = {};
		if (value.currentPage && Number.isInteger(value.currentPage)) {
			object.page = value.currentPage;
		}
		if (value.itemsPerPage && Number.isInteger(value.itemsPerPage)) {
			object.limit = value.itemsPerPage;
		}
		return object;
	} else if (methode === "get") {
		if (!value) {
			return { page: undefined, limit: undefined };
		}
	}
	return value;
};

const handleFilter = (methode, value) => {
	if (methode === "get") {
		return value?.query || {};
	}
	return value;
};

export const getters = {
	get: (state) => ({ key, identifier }) => {
		if (!initialize) throw new Error("uiState not initialize");
		if (!key) throw new SyntaxError("Key is missing!");

		const value = identifier ? state[key][identifier] : state[key];
		return createPattern(key, "get", value);
	},
};

export const mutations = {
	set(state, { key, identifier, object }) {
		if (!initialize) throw new Error("uiState not initialize");
		if (!key || !object) throw new SyntaxError("Key or/and object is missing!");

		const value = createPattern(key, "set", object);

		if (identifier && state[key]) {
			if (!state[key][identifier]) {
				state[key][identifier] = value;
			} else {
				state[key][identifier] = mergeDeep(state[key][identifier], value);
			}
		} else {
			if (key in getDefaultState())
				throw new Error("Overwriting the default state is not permitted!");
			if (!state[key]) {
				state[key] = value;
			} else {
				state[key] = mergeDeep(state[key], value);
			}
		}
		localStorage.setItem(localStorageKey, JSON.stringify(state));
	},
};

export const state = () => getDefaultState();

export default {
	namespaced: true,
	mutations,
	getters,
	state,
};
