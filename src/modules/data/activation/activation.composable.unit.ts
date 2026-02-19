import { useActivation } from "./activation.composable";
import { initializeAxios } from "@/utils/api";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";

describe("useActivation", () => {
	const mockResponse = {
		data: {
			data: [
				{ code: "ACT123", status: "active" },
				{ code: "ACT456", status: "inactive" },
			],
		},
	};
	let axiosMock: DeepMocked<AxiosInstance>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		axiosMock = createMock<AxiosInstance>();
		axiosMock.put.mockResolvedValueOnce({
			data: {
				data: [
					{ code: "ACT123", status: "active" },
					{ code: "ACT456", status: "inactive" },
				],
			},
		});
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should update list ", async () => {
		const { list, updateActivations } = useActivation();

		await updateActivations("ACT123");

		expect(list.value).toEqual(mockResponse.data.data);
	});
});
