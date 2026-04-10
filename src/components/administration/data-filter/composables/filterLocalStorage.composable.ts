import { FilterLocalStorage, FilterQuery, User } from "../types";
import { useStorage } from "@vueuse/core";
import { computed, Ref } from "vue";

export const useFilterLocalStorage = (userType: User) => {
	const filterStorageKey: Record<User, string> = {
		[User.STUDENT]: "studentsManagementPage",
		[User.TEACHER]: "teachersManagementPage",
	};

	const state: Ref<FilterLocalStorage> = useStorage("filterState", {
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
	});

	const currentFilterQuery = computed({
		get: () => state.value.filter[filterStorageKey[userType]]?.query ?? {},
		set: (query: FilterQuery) => {
			state.value.filter[filterStorageKey[userType]] = { ...state.value.filter[filterStorageKey[userType]], query };
		},
	});
	const searchQuery = computed({
		get: () => state.value.filter[filterStorageKey[userType]]?.searchQuery ?? "",
		set: (searchQuery: string) => {
			state.value.filter[filterStorageKey[userType]] = {
				query: state.value.filter[filterStorageKey[userType]]?.query ?? {},
				searchQuery,
			};
		},
	});
	const page = computed({
		get: () => state.value.pagination[filterStorageKey[userType]]?.page ?? 1,
		set: (page: number) => {
			state.value.pagination[filterStorageKey[userType]] = {
				...state.value.pagination[filterStorageKey[userType]],
				page,
			};
		},
	});
	const limit = computed({
		get: () => state.value.pagination[filterStorageKey[userType]]?.limit ?? 25,
		set: (limit: number) => {
			state.value.pagination[filterStorageKey[userType]] = {
				...state.value.pagination[filterStorageKey[userType]],
				limit,
			};
		},
	});
	const sortBy = computed({
		get: () => state.value.sorting[filterStorageKey[userType]]?.sortBy ?? "firstName",
		set: (sortBy: string) => {
			state.value.sorting[filterStorageKey[userType]] = {
				...state.value.sorting[filterStorageKey[userType]],
				sortBy,
			};
		},
	});
	const sortOrder = computed({
		get: () => state.value.sorting[filterStorageKey[userType]]?.sortOrder ?? "asc",
		set: (sortOrder: string) => {
			state.value.sorting[filterStorageKey[userType]] = {
				...state.value.sorting[filterStorageKey[userType]],
				sortOrder,
			};
		},
	});

	return {
		currentFilterQuery,
		page,
		limit,
		sortBy,
		sortOrder,
		searchQuery,
	};
};
