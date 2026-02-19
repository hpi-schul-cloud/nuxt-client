import { useClasses } from "./classes.composable";
import { initializeAxios } from "@/utils/api";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";

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
					name: "a",
				},
				{
					id: "some-id-2",
					gradeLevel: 1,
					name: "b",
				},
			],
		},
	};
	let axiosMock: DeepMocked<AxiosInstance>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		axiosMock = createMock<AxiosInstance>();
		axiosMock.get.mockResolvedValueOnce(mockResponse);
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should fetch and update list ", async () => {
		const { list, fetchClasses } = useClasses();
		await fetchClasses({ $limit: 1000, year: "year-id" });

		expect(list.value).toEqual(mockResponse.data.data);
	});
});
