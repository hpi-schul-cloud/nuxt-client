import { useFilterLocalStorage } from "./filterLocalStorage.composable";
import { RoleName } from "@/serverApi/v3";
import { useStorage } from "@vueuse/core";

const defaultState = {
	pagination: {},
	filter: {
		studentsManagementPage: {
			query: {},
			searchQuery: "",
		},
		teachersManagementPage: {
			query: {},
			searchQuery: "",
		},
	},
	sorting: {},
	version: 1,
};

const filterStorageKey: Partial<Record<RoleName, string>> = {
	[RoleName.Student]: "studentsManagementPage",
	[RoleName.Teacher]: "teachersManagementPage",
};

vi.mock("@vueuse/core", async (importOriginal) => {
	const defaultState = {
		pagination: {},
		filter: {
			studentsManagementPage: {
				query: {},
				searchQuery: "",
			},
			teachersManagementPage: {
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
		useFilterLocalStorage(RoleName.Student);

		expect(useStorage).toHaveBeenCalledWith("FilterState", defaultState);
	});

	describe("filter storage", () => {
		it("should return the correct filter storage for students' filter", () => {
			const { getFilterState, setFilterState, state } = useFilterLocalStorage(RoleName.Student);

			const testQuery = { query: "value", searchQuery: "search" };

			setFilterState(testQuery);

			expect(getFilterState()).toEqual(testQuery);
			expect(state.value.filter[filterStorageKey[RoleName.Student]!]?.query).toEqual(testQuery);

			expect(state.value.filter[filterStorageKey[RoleName.Teacher]!]?.query).toEqual({});
		});

		it("should return the correct filter storage for teachers' filter", () => {
			const { getFilterState, setFilterState, state } = useFilterLocalStorage(RoleName.Teacher);
			const testQuery = { test: "teachers" };

			setFilterState(testQuery);

			expect(getFilterState()).toEqual(testQuery);
			expect(state.value.filter[filterStorageKey[RoleName.Teacher]!]?.query).toEqual(testQuery);
		});
	});

	describe("pagination storage", () => {
		it("should return the correct pagination storage for students' filter", () => {
			const { getPaginationState, setPaginationState, state } = useFilterLocalStorage(RoleName.Student);
			const testPagination = { page: 2, limit: 50 };

			setPaginationState(testPagination);

			expect(getPaginationState()).toEqual(testPagination);
			expect(state.value.pagination[filterStorageKey[RoleName.Student]!]).toEqual(testPagination);

			expect(state.value.pagination[filterStorageKey[RoleName.Teacher]!]).toBeUndefined();
		});

		it("should return the correct pagination storage for teachers' filter", () => {
			const { getPaginationState, setPaginationState, state } = useFilterLocalStorage(RoleName.Teacher);
			const testPagination = { page: 3, limit: 30 };

			setPaginationState(testPagination);

			expect(getPaginationState()).toEqual(testPagination);
			expect(state.value.pagination[filterStorageKey[RoleName.Teacher]!]).toEqual(testPagination);
		});
	});

	describe("sorting storage", () => {
		it("should return the correct sorting storage for students' filter", () => {
			const { getSortingState, setSortingState, state } = useFilterLocalStorage(RoleName.Student);
			const testSorting = { sortBy: "firstName", sortOrder: "asc" };

			setSortingState(testSorting);

			expect(getSortingState()).toEqual(testSorting);
			expect(state.value.sorting[filterStorageKey[RoleName.Student]!]).toEqual(testSorting);

			expect(state.value.sorting[filterStorageKey[RoleName.Teacher]!]).toBeUndefined();
		});

		it("should return the correct sorting storage for teachers' filter", () => {
			const { getSortingState, setSortingState, state } = useFilterLocalStorage(RoleName.Teacher);
			const testSorting = { sortBy: "lastName", sortOrder: "desc" };

			setSortingState(testSorting);

			expect(getSortingState()).toEqual(testSorting);
			expect(state.value.sorting[filterStorageKey[RoleName.Teacher]!]).toEqual(testSorting);
		});
	});
});
