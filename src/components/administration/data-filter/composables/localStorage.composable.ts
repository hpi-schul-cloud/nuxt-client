import { UiState } from "../types";
import { RoleName } from "@/serverApi/v3";
import { useStorage } from "@vueuse/core";
import { Ref, ref } from "vue";

export const useLocalStorage = () => {
	const userType = ref<RoleName.Student | RoleName.Teacher>(RoleName.Student);

	const initializeUserType = (user: RoleName.Student | RoleName.Teacher) => {
		userType.value = user;
	};
	type FilterStorage = {
		[RoleName.Student]: string;
		[RoleName.Teacher]: string;
	};

	const filterStorageKey: FilterStorage = {
		[RoleName.Student]: "pages.administration.students.index",
		[RoleName.Teacher]: "pages.administration.teachers.index",
	};

	const defaultState: UiState = {
		pagination: {},
		filter: {
			[filterStorageKey[RoleName.Student]]: {
				query: {},
				searchQuery: "",
			},
			[filterStorageKey[RoleName.Teacher]]: {
				query: {},
				searchQuery: "",
			},
		},
		sorting: {},
		version: 1,
	};

	const state: Ref<UiState> = useStorage("uiState", defaultState);

	const getFilterState = () => state.value.filter[filterStorageKey[userType.value]]?.query;

	const setFilterState = (val: object) => (state.value.filter[filterStorageKey[userType.value]] = { query: val });

	const getPaginationState = () => state.value.pagination[filterStorageKey[userType.value]];

	const setPaginationState = (val: { page: number; limit: number }) =>
		(state.value.pagination[filterStorageKey[userType.value]] = val);

	const getSortingState = () => state.value.sorting[filterStorageKey[userType.value]];

	const setSortingState = (val: { sortBy: string; sortOrder: string }) =>
		(state.value.sorting[filterStorageKey[userType.value]] = val);

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
