import { createSharedComposable } from "@vueuse/core";
import { useStorage } from "@/composables/locale-storage.composable";
import { UiState } from "../types/filterTypes";

const filterLocalStorage = () => {
	const { get, set } = useStorage();

	const stateName = "uiState";
	const defaultState: UiState = {
		pagination: {},
		filter: {
			"pages.administration.students.index": {
				query: {},
			},
			"pages.administration.teachers.index": {
				query: {},
			},
		},
		sorting: {},
		version: 1,
	};

	const defaultFilterState = {
		filter: {
			"pages.administration.students.index": {
				query: {},
			},
		},
	};
	const getFilterState = () => {
		return JSON.parse(get(stateName) ?? "{}");
	};
	const getDefaultState = (): UiState => {
		const uiState = getFilterState();

		if (!uiState?.filter) {
			defaultState.filter = defaultFilterState.filter;
			set(stateName, JSON.stringify(defaultState));
			return defaultState;
		}
		return uiState;
	};

	const state = getDefaultState();

	const setFilterState = (val: object) => {
		state.filter["pages.administration.students.index"] = { query: {} };

		state.filter["pages.administration.students.index"].query = {
			...state.filter["pages.administration.students.index"]?.query,
			...val,
		};

		set(stateName, JSON.stringify(state));
	};

	return { setFilterState, getFilterState };
};

export const useFilterLocalStorage = createSharedComposable(filterLocalStorage);
