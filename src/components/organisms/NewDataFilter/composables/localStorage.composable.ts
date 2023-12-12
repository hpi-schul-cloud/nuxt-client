import { createSharedComposable } from "@vueuse/core";
import { useStorage } from "@/composables/locale-storage.composable";
import { UiState, FilterQuery, UserType } from "../types/filterTypes";

const filterLocalStorage = (userType: UserType) => {
	const { get, set } = useStorage();

	type UserBasedFilter = {
		[UserType.STUDENT]: string;
		[UserType.TEACHER]: string;
	};

	const filterStorageKey: UserBasedFilter = {
		[UserType.STUDENT]: "pages.administration.students.index",
		[UserType.TEACHER]: "pages.administration.teachers.index",
	};

	console.log(filterStorageKey[userType]);

	const stateName = "uiState";
	const defaultState: UiState = {
		pagination: {},
		filter: {
			[filterStorageKey[UserType.STUDENT]]: {
				query: {},
			},
			[filterStorageKey[UserType.STUDENT]]: {
				query: {},
			},
		},
		sorting: {},
		version: 1,
	};

	const defaultFilterState = {
		filter: {
			[filterStorageKey[userType]]: {
				query: {},
			},
		},
	};

	const getFilterState = (): UiState => {
		const state = get(stateName);
		if (!state) return defaultState;

		return JSON.parse(state);
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

	const getFilterStorage = () => {
		// @ts-expect-error TODO: check type here
		return getDefaultState().filter[filterStorageKey[userType]]?.query;
	};

	const state = getDefaultState();

	const setFilterState = (val: FilterQuery) => {
		const newState = JSON.parse(JSON.stringify(state));
		newState.filter[filterStorageKey[userType]] = { query: {} };

		newState.filter[filterStorageKey[userType]].query = {
			...newState.filter[filterStorageKey[userType]].query,
			...val,
		};
		set(stateName, JSON.stringify(state));
	};

	return { setFilterState, getFilterStorage };
};

export const useFilterLocalStorage = createSharedComposable(filterLocalStorage);
