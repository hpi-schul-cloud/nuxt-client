import { useStatusAlerts } from "./status-alerts.composable";
import * as serverApi from "@/serverApi/v3/api";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import { DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

let alertApi: DeepMocked<serverApi.AlertApiInterface>;

describe("status alerts composable", () => {
	const logger = { error: vi.fn(), log: vi.fn() };
	vi.spyOn(logger, "log").mockImplementation(vi.fn());
	vi.spyOn(logger, "error").mockImplementation(vi.fn());
	vi.spyOn(console, "error").mockImplementation(vi.fn());

	beforeEach(() => {
		alertApi = {
			alertControllerFind: vi.fn(() => ({
				data: {
					data: mockStatusAlerts,
				},
			})),
		} as unknown as DeepMocked<serverApi.AlertApiInterface>;
		vi.spyOn(serverApi, "AlertApiFactory").mockReturnValue(alertApi);
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchStatusAlerts", () => {
		it("should call api and set the alerts corectly", async () => {
			const { fetchStatusAlerts, statusAlerts, status } = useStatusAlerts();
			await fetchStatusAlerts();

			expect(alertApi.alertControllerFind).toHaveBeenCalledOnce();
			expect(statusAlerts.value).toStrictEqual(mockStatusAlerts);

			expect(status.value).toEqual("completed");
		});

		it("should handle exception", async () => {
			const error = new Error("Failed");
			alertApi.alertControllerFind.mockRejectedValueOnce(error);
			const { fetchStatusAlerts, status } = useStatusAlerts();
			await fetchStatusAlerts();

			expect(status.value).toEqual("error");
		});
	});
});
