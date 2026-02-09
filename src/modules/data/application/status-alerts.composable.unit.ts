import { useStatusAlerts } from "./status-alerts.composable";
import * as serverApi from "@/serverApi/v3/api";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import { DeepMocked } from "@golevelup/ts-vitest";

let alertApi: DeepMocked<serverApi.AlertApiInterface>;

describe("status alerts composable", () => {
	beforeEach(() => {
		alertApi = {
			alertControllerFind: vi.fn(() => ({
				data: {
					data: mockStatusAlerts,
				},
			})),
		} as unknown as DeepMocked<serverApi.AlertApiInterface>;
		vi.spyOn(serverApi, "AlertApiFactory").mockReturnValue(alertApi);
	});

	describe("fetchStatusAlerts", () => {
		it("should call api and set the alerts corectly", async () => {
			const { fetchStatusAlerts, statusAlerts, businessError, status } = useStatusAlerts();
			await fetchStatusAlerts();

			expect(alertApi.alertControllerFind).toHaveBeenCalledOnce();
			expect(statusAlerts.value).toStrictEqual(mockStatusAlerts);
			expect(businessError.value).toEqual({ statusCode: "", message: "" });
			expect(status.value).toEqual("completed");
		});

		it("should handle exception", async () => {
			const error = { status: 418, statusText: "I'm a teapot" };
			alertApi.alertControllerFind.mockRejectedValueOnce(error);
			const { fetchStatusAlerts, businessError, status } = useStatusAlerts();
			await fetchStatusAlerts();
			expect(businessError.value).toStrictEqual(error);
			expect(status.value).toEqual("error");
		});
	});
});
