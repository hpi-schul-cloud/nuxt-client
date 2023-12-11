import { createSharedComposable } from "@vueuse/core";
import { useStorage } from "@/composables/locale-storage.composable";
import { UiState, FilterQuery } from "../types/filterTypes";

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

	const getFilterState = (): UiState => {
		return JSON.parse(get(stateName) ?? "") || defaultState;
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

	const getFilterStorage = (): FilterQuery => {
		return defaultFilterState.filter["pages.administration.students.index"]
			.query;
	};

	const state = getDefaultState();

	const setFilterState = (val: FilterQuery) => {
		state.filter["pages.administration.students.index"] = { query: {} };

		state.filter["pages.administration.students.index"].query = {
			...state.filter["pages.administration.students.index"]?.query,
			...val,
		};

		set(stateName, JSON.stringify(state));
	};

	return { setFilterState, getFilterStorage };
};

export const useFilterLocalStorage = createSharedComposable(filterLocalStorage);
