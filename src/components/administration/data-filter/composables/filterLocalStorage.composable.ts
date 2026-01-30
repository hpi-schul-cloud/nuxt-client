import { UiState } from "../types";
import { RoleName } from "@/serverApi/v3";
import { useStorage } from "@vueuse/core";
import { Ref } from "vue";

export const useFilterLocalStorage = (userType: RoleName.Student | RoleName.Teacher = RoleName.Student) => {
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

	const getFilterState = () => state.value.filter[filterStorageKey[userType]]?.query;

	const setFilterState = (val: object) => (state.value.filter[filterStorageKey[userType]] = { query: val });

	const getPaginationState = () => state.value.pagination[filterStorageKey[userType]];

	const setPaginationState = (val: { page: number; limit: number }) =>
		(state.value.pagination[filterStorageKey[userType]] = val);

	const getSortingState = () => state.value.sorting[filterStorageKey[userType]];

	const setSortingState = (val: { sortBy: string; sortOrder: string }) =>
		(state.value.sorting[filterStorageKey[userType]] = val);

	return {
		getFilterState,
		setFilterState,
		state,
		getPaginationState,
		setPaginationState,
		getSortingState,
		setSortingState,
	};
};
