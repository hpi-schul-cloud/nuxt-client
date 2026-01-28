import { UiState, User } from "../types";
import { useStorage } from "@vueuse/core";
import { Ref, ref } from "vue";

export const useFilterLocalStorage = () => {
	const userType = ref<string>();

	const initializeUserType = (user: string) => {
		userType.value = user;
	};

	type FilterStorage = {
		[User.STUDENT]: string;
		[User.TEACHER]: string;
	};

	const filterStorageKey: FilterStorage = {
		[User.STUDENT]: "pages.administration.students.index",
		[User.TEACHER]: "pages.administration.teachers.index",
	};

	const defaultState: UiState = {
		pagination: {},
		filter: {
			[filterStorageKey[User.STUDENT]]: {
				query: {},
				searchQuery: "",
			},
			[filterStorageKey[User.TEACHER]]: {
				query: {},
				searchQuery: "",
			},
		},
		sorting: {},
		version: 1,
	};

	const state: Ref<UiState> = useStorage("uiState", defaultState);

	const getFilterState = () => state.value.filter[filterStorageKey[userType.value as User]]?.query;

	const setFilterState = (val: object) =>
		(state.value.filter[filterStorageKey[userType.value as User]] = { query: val });

	const getPaginationState = () => state.value.pagination[filterStorageKey[userType.value as User]];

	const setPaginationState = (val: { page: number; limit: number }) =>
		(state.value.pagination[filterStorageKey[userType.value as User]] = val);

	const getSortingState = () => state.value.sorting[filterStorageKey[userType.value as User]];

	const setSortingState = (val: { sortBy: string; sortOrder: string }) =>
		(state.value.sorting[filterStorageKey[userType.value as User]] = val);

	return {
		getFilterState,
		setFilterState,
		initializeUserType,
		state,
		getPaginationState,
		setPaginationState,
		getSortingState,
		setSortingState,
	};
};
