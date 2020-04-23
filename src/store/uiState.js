const localStorageKey = "uiState";
const version = 1;
let initialize = false;

const getDefaultState = () => {
	return {
		pagination: {},
		filter: {},
		version,
	};
};

export const actions = {};

export const getters = {
	getStateByKey: (state) => ({ key, identifier }) => {
		if (!initialize) {
			throw new SyntaxError("uiState not initialize");
		}
		if (!key) {
			throw new SyntaxError("Key is missing!");
		}
		return identifier
			? state[key][identifier]
			: state[key]
	},
};

export const mutations = {
	initialise(state) {
		if (localStorage.getItem(localStorageKey)) {
			const uiState = JSON.parse(localStorage.getItem(localStorageKey));
			if (uiState.version == version) {
				Object.assign(state, uiState);
			} else {
				uiState.version = version;
			}
		}
		initialize = true;
	},
	alterState(state, { key, identifier, object }) {
		if (initialize) {
			if (key && object) {
				if (identifier && state[key]) {
					state[key][identifier] = object;
					localStorage.setItem(localStorageKey, JSON.stringify(state));
				} else if (!(key in getDefaultState())) {
					state[key] = object;
					localStorage.setItem(localStorageKey, JSON.stringify(state));
				} else {
					throw new Error("Overwriting the default state is not permitted!");
				}
			} else {
				throw new SyntaxError("Key or/and object is missing!");
			}
		} else {
			throw new SyntaxError("uiState not initialize");
		}
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
