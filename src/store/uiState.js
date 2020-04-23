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

export const actions = {};

export const getters = {
	getStateByKey: (state) => ({ key, identifier }) => {
		if (!initialize) throw new Error("uiState not initialize");
		if (!key) throw new SyntaxError("Key is missing!");

		return identifier ? state[key][identifier] : state[key];
	},
};

export const mutations = {
	alterState(state, { key, identifier, object }) {
		if (!initialize) throw new Error("uiState not initialize");
		if (!key || !object) throw new SyntaxError("Key or/and object is missing!");

		if (identifier && state[key]) {
			state[key][identifier] = object;
		} else {
			if (key in getDefaultState())
				throw new Error("Overwriting the default state is not permitted!");

			state[key] = object;
		}
		localStorage.setItem(localStorageKey, JSON.stringify(state));
	},
};

export const state = () => getDefaultState();

export default {
	namespaced: true,
	actions,
	mutations,
	getters,
	state,
};
