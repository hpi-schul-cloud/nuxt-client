import { UiState, User } from "../types";
import { useStorage } from "@vueuse/core";
import { ref } from "vue";

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
			},
			[filterStorageKey[User.TEACHER]]: {
				query: {},
			},
		},
		sorting: {},
		version: 1,
	};

	const state = useStorage("uiState", defaultState);

	const getFilterStorage = () =>
		userType.value == User.STUDENT
			? state.value.filter["pages.administration.students.index"]?.query
			: state.value.filter["pages.administration.teachers.index"]?.query;

	const setFilterState = (val: object) => {
		if (userType.value == User.STUDENT)
			state.value.filter["pages.administration.students.index"] = {
				query: val,
			};
		if (userType.value == User.TEACHER)
			state.value.filter["pages.administration.teachers.index"] = {
				query: val,
			};
	};

	return { getFilterStorage, setFilterState, initializeUserType, state };
};
