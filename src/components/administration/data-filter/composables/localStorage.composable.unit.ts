import { useLocalStorage } from "./localStorage.composable";
import { RoleName } from "@/serverApi/v3";
import { useStorage } from "@vueuse/core";

const defaultState = {
	pagination: {},
	filter: {
		"pages.administration.students.index": {
			query: {},
			searchQuery: "",
		},
		"pages.administration.teachers.index": {
			query: {},
			searchQuery: "",
		},
	},
	sorting: {},
	version: 1,
};

const filterStorageKey: Partial<Record<RoleName, string>> = {
	[RoleName.Student]: "pages.administration.students.index",
	[RoleName.Teacher]: "pages.administration.teachers.index",
};

vi.mock("@vueuse/core", async (importOriginal) => {
	const defaultState = {
		pagination: {},
		filter: {
			"pages.administration.students.index": {
				query: {},
				searchQuery: "",
			},
			"pages.administration.teachers.index": {
				query: {},
				searchQuery: "",
			},
		},
		sorting: {},
		version: 1,
	};

	const actual = await importOriginal<typeof import("@vueuse/core")>();
	return {
		...actual,
		useStorage: vi.fn().mockReturnValue({ value: defaultState }),
	};
});

describe("localStorage composable", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should initialize the default state", () => {
		const { initializeUserType } = useLocalStorage();
		initializeUserType(RoleName.Student);
		expect(useStorage).toHaveBeenCalledWith("uiState", defaultState);
	});

	describe("filter storage", () => {
		it("should return the correct filter storage for students' filter", () => {
			const { initializeUserType, getFilterState, setFilterState, state } = useLocalStorage();
			initializeUserType(RoleName.Student);

			const testQuery = { query: "value", searchQuery: "search" };

			setFilterState(testQuery);

			expect(getFilterState()).toEqual(testQuery);
			expect(state.value.filter[filterStorageKey[RoleName.Student]!]?.query).toEqual(testQuery);

			expect(state.value.filter[filterStorageKey[RoleName.Teacher]!]?.query).toEqual({});
		});

		it("should return the correct filter storage for teachers' filter", () => {
			const { initializeUserType, getFilterState, setFilterState, state } = useLocalStorage();
			initializeUserType(RoleName.Teacher);
			const testQuery = { test: "teachers" };

			setFilterState(testQuery);

			expect(getFilterState()).toEqual(testQuery);
			expect(state.value.filter[filterStorageKey[RoleName.Teacher]!]?.query).toEqual(testQuery);
		});
	});

	describe("pagination storage", () => {
		it("should return the correct pagination storage for students' filter", () => {
			const { initializeUserType, getPaginationState, setPaginationState, state } = useLocalStorage();
			initializeUserType(RoleName.Student);
			const testPagination = { page: 2, limit: 50 };

			setPaginationState(testPagination);

			expect(getPaginationState()).toEqual(testPagination);
			expect(state.value.pagination[filterStorageKey[RoleName.Student]!]).toEqual(testPagination);

			expect(state.value.pagination[filterStorageKey[RoleName.Teacher]!]).toBeUndefined();
		});

		it("should return the correct pagination storage for teachers' filter", () => {
			const { initializeUserType, getPaginationState, setPaginationState, state } = useLocalStorage();
			initializeUserType(RoleName.Teacher);
			const testPagination = { page: 3, limit: 30 };

			setPaginationState(testPagination);

			expect(getPaginationState()).toEqual(testPagination);
			expect(state.value.pagination[filterStorageKey[RoleName.Teacher]!]).toEqual(testPagination);
		});
	});

	describe("sorting storage", () => {
		it("should return the correct sorting storage for students' filter", () => {
			const { initializeUserType, getSortingState, setSortingState, state } = useLocalStorage();
			initializeUserType(RoleName.Student);
			const testSorting = { sortBy: "firstName", sortOrder: "asc" };

			setSortingState(testSorting);

			expect(getSortingState()).toEqual(testSorting);
			expect(state.value.sorting[filterStorageKey[RoleName.Student]!]).toEqual(testSorting);

			expect(state.value.sorting[filterStorageKey[RoleName.Teacher]!]).toBeUndefined();
		});

		it("should return the correct sorting storage for teachers' filter", () => {
			const { initializeUserType, getSortingState, setSortingState, state } = useLocalStorage();
			initializeUserType(RoleName.Teacher);
			const testSorting = { sortBy: "lastName", sortOrder: "desc" };

			setSortingState(testSorting);

			expect(getSortingState()).toEqual(testSorting);
			expect(state.value.sorting[filterStorageKey[RoleName.Teacher]!]).toEqual(testSorting);
		});
	});
});
