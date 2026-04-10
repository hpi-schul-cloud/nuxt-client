import { FilterLocalStorage, User } from "../types";
import { useFilterLocalStorage } from "./filterLocalStorage.composable";
import { useStorage } from "@vueuse/core";
import { Mock } from "vitest";
import { Ref, ref } from "vue";

const filterStorageKey: Record<User, string> = {
	[User.STUDENT]: "studentsManagementPage",
	[User.TEACHER]: "teachersManagementPage",
};

vi.mock("@vueuse/core", () => ({
	useStorage: vi.fn(),
}));

describe("localStorage composable", () => {
	let stateMock: Ref<FilterLocalStorage>;

	beforeEach(() => {
		vi.clearAllMocks();

		stateMock = ref({
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
		(useStorage as Mock).mockReturnValue(stateMock);
	});

	it.each([[User.STUDENT], [User.TEACHER]])("should get correct values for %s", (userType) => {
		const { currentFilterQuery, searchQuery, page, limit, sortBy, sortOrder } = useFilterLocalStorage(userType);

		expect(currentFilterQuery.value).toEqual({});
		expect(searchQuery.value).toBe("");
		expect(page.value).toBe(1);
		expect(limit.value).toBe(25);
		expect(sortBy.value).toBe("firstName");
		expect(sortOrder.value).toBe("asc");
	});

	describe("filter storage", () => {
		it.each([[User.STUDENT], [User.TEACHER]])("should return the correct filter storage for %s", (userType) => {
			const { currentFilterQuery, searchQuery } = useFilterLocalStorage(userType);

			const testQuery = { query: { consentStatus: ["ok"] }, searchQuery: "search" };
			currentFilterQuery.value = testQuery.query;
			searchQuery.value = testQuery.searchQuery;

			expect(stateMock.value.filter[filterStorageKey[userType]]).toEqual(testQuery);
		});
	});

	describe("pagination storage", () => {
		it("should return the correct pagination storage for students' filter", () => {
			const { page, limit } = useFilterLocalStorage(User.STUDENT);
			const testPagination = { page: 2, limit: 50 };

			page.value = testPagination.page;
			limit.value = testPagination.limit;

			expect(stateMock.value.pagination[filterStorageKey[User.STUDENT]]).toEqual(testPagination);
			expect(stateMock.value.pagination[filterStorageKey[User.TEACHER]]).toBeUndefined();
		});

		it("should return the correct pagination storage for teachers' filter", () => {
			const { page, limit } = useFilterLocalStorage(User.TEACHER);
			const testPagination = { page: 3, limit: 25 };

			page.value = testPagination.page;
			limit.value = testPagination.limit;

			expect(stateMock.value.pagination[filterStorageKey[User.TEACHER]]).toEqual(testPagination);
			expect(stateMock.value.pagination[filterStorageKey[User.STUDENT]]).toBeUndefined();
		});
	});

	describe("sorting storage", () => {
		it("should return the correct sorting storage for students' filter", () => {
			const { sortBy, sortOrder } = useFilterLocalStorage(User.STUDENT);
			const testSorting = { sortBy: "firstName", sortOrder: "asc" };

			sortBy.value = testSorting.sortBy;
			sortOrder.value = testSorting.sortOrder;

			expect(sortBy.value).toEqual(testSorting.sortBy);
			expect(sortOrder.value).toEqual(testSorting.sortOrder);
			expect(stateMock.value.sorting[filterStorageKey[User.STUDENT]]).toEqual(testSorting);
			expect(stateMock.value.sorting[filterStorageKey[User.TEACHER]]).toBeUndefined();
		});

		it("should return the correct sorting storage for teachers' filter", () => {
			const { sortBy, sortOrder } = useFilterLocalStorage(User.TEACHER);
			const testSorting = { sortBy: "lastName", sortOrder: "desc" };

			sortBy.value = testSorting.sortBy;
			sortOrder.value = testSorting.sortOrder;

			expect(sortBy.value).toEqual(testSorting.sortBy);
			expect(sortOrder.value).toEqual(testSorting.sortOrder);
			expect(stateMock.value.sorting[filterStorageKey[User.TEACHER]]).toEqual(testSorting);
		});
	});
});
