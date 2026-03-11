import { useClasses } from "./classes.composable";
import { initializeAxios } from "@/utils/api";
import { mockAxiosInstance } from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

describe("useClasses", () => {
	const mockResponse = {
		data: {
			total: 2,
			limit: 1000,
			skip: 0,
			data: [
				{
					id: "some-id-1",
					gradeLevel: 1,
					displayName: "a",
				},
				{
					id: "some-id-2",
					gradeLevel: 1,
					displayName: "b",
				},
			],
		},
	};
	let axiosMock: Mocked<AxiosInstance>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should fetch and update list ", async () => {
		const { classNameList, fetchClasses } = useClasses();
		axiosMock.get.mockResolvedValueOnce(mockResponse);

		await fetchClasses({ $limit: 1000, year: "year-id" });

		const expectedClassNames = mockResponse.data.data.map((item) => ({
			label: item.displayName,
			value: item.displayName,
		}));

		expect(axiosMock.get).toHaveBeenCalledWith("/v1/classes", { params: { $limit: 1000, year: "year-id" } });

		expect(classNameList.value).toEqual(expectedClassNames);
	});

	it("should handle missing data gracefully", async () => {
		const { classNameList, fetchClasses } = useClasses();
		// Mock axios to return undefined data
		axiosMock.get.mockResolvedValueOnce({ data: { data: undefined } });
		await fetchClasses({ $limit: 1000, year: "year-id" });

		expect(classNameList.value).toEqual([]);
	});
});
