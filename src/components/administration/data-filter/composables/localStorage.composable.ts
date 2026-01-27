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

	const getFilterStorage = () => {
		const user = userType.value as User;
		return state.value.filter[filterStorageKey[user]]?.query;
	};

	const setFilterState = (val: object) => {
		const user = userType.value as User;
		if (user && filterStorageKey[user]) {
			state.value.filter[filterStorageKey[user]] = { query: val };
		}
	};

	const getPaginationState = () => {
		const user = userType.value as User;
		return state.value.pagination[filterStorageKey[user]];
	};

	const setPaginationState = (val: { page: number; limit: number }) => {
		const user = userType.value as User;
		if (user && filterStorageKey[user]) {
			state.value.pagination[filterStorageKey[user]] = val;
		}
	};

	const getSortingState = () => {
		const user = userType.value as User;
		return state.value.sorting[filterStorageKey[user]];
	};

	const setSortingState = (val: { sortBy: string; sortOrder: string }) => {
		const user = userType.value as User;
		if (user && filterStorageKey[user]) {
			state.value.sorting[filterStorageKey[user]] = val;
		}
	};

	return {
		getFilterStorage,
		setFilterState,
		initializeUserType,
		state,
		getPaginationState,
		setPaginationState,
		getSortingState,
		setSortingState,
	};
};
