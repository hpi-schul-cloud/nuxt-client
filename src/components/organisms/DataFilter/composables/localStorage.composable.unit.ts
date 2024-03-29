import { useFilterLocalStorage } from "./localStorage.composable";
import { useStorage } from "@vueuse/core";

const defaultState = {
	pagination: {},
	filter: {
		"pages.administration.students.index": {
			query: {},
		},
		"pages.administration.teachers.index": {
			query: {},
		},
	},
	sorting: {},
	version: 1,
};

jest.mock("@vueuse/core", () => {
	return {
		...jest.requireActual("@vueuse/core"),
		useStorage: jest.fn().mockReturnValue({ value: defaultState }),
	};
});

describe("localStorage composable", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should initialize the default state", () => {
		const { initializeUserType } = useFilterLocalStorage();
		initializeUserType("student");
		expect(useStorage).toHaveBeenCalledWith("uiState", defaultState);
	});

	it("should return the correct filter storage for students' filter", () => {
		const { initializeUserType, getFilterStorage, setFilterState, state } =
			useFilterLocalStorage();
		initializeUserType("student");
		const testQuery = { test: "test" };

		setFilterState(testQuery);

		expect(getFilterStorage()).toEqual(testQuery);
		expect(
			state.value.filter["pages.administration.students.index"]?.query
		).toEqual(testQuery);

		expect(
			state.value.filter["pages.administration.teachers.index"]?.query
		).toEqual({});
	});

	it("should return the correct filter storage for teachers' filter", () => {
		const { initializeUserType, getFilterStorage, setFilterState, state } =
			useFilterLocalStorage();
		initializeUserType("teacher");
		const testQuery = { test: "teachers" };

		setFilterState(testQuery);

		expect(getFilterStorage()).toEqual(testQuery);
		expect(
			state.value.filter["pages.administration.teachers.index"]?.query
		).toEqual(testQuery);
	});
});
