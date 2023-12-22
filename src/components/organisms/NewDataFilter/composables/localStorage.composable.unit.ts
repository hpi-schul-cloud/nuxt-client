import { useFilterLocalStorage } from "./localStorage.composable";
import { useStorage } from "@vueuse/core";

jest.mock("@vueuse/core", () => {
	return {
		...jest.requireActual("@vueuse/core"),
		useStorage: jest.fn(),
	};
});

describe("localStorage composable", () => {
	const { initializeUserType } = useFilterLocalStorage();

	it("should initialize userType", () => {
		initializeUserType("student");

		expect(useStorage).toHaveBeenCalledWith("uiState", {
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
		});
	});
});
