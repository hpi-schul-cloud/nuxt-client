import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { UiState, UserType } from "../types/filterTypes";
import { computed, ref } from "vue";

export const useFilterLocalStorage = defineStore("filterStorageStore", () => {
	const userType = ref<string>();

	const initializeUserType = (user: string) => {
		userType.value = user;
	};

	type FilterStorage = {
		[UserType.STUDENT]: string;
		[UserType.TEACHER]: string;
	};

	const filterStorageKey: FilterStorage = {
		[UserType.STUDENT]: "pages.administration.students.index",
		[UserType.TEACHER]: "pages.administration.teachers.index",
	};

	const defaultState: UiState = {
		pagination: {},
		filter: {
			[filterStorageKey[UserType.STUDENT]]: {
				query: {},
			},
			[filterStorageKey[UserType.TEACHER]]: {
				query: {},
			},
		},
		sorting: {},
		version: 1,
	};

	const state = useStorage("uiState", defaultState);

	const getFilterStorage = computed(() => {
		return userType.value == UserType.STUDENT
			? state.value.filter["pages.administration.students.index"]?.query
			: state.value.filter["pages.administration.teachers.index"]?.query;
	});

	const setFilterState = (val: object) => {
		if (userType.value == UserType.STUDENT)
			state.value.filter["pages.administration.students.index"] = {
				query: val,
			};
		if (userType.value == UserType.TEACHER)
			state.value.filter["pages.administration.teachers.index"] = {
				query: val,
			};
	};

	return { getFilterStorage, setFilterState, initializeUserType, userType };
});
