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
			const { fetchStatusAlerts, getStatusAlerts } = useStatusAlerts();
			await fetchStatusAlerts();

			expect(alertApi.alertControllerFind).toHaveBeenCalledOnce();
			expect(getStatusAlerts.value).toStrictEqual(mockStatusAlerts);
		});

		it("should handle exception", async () => {
			const error = { status: 418, statusText: "I'm a teapot" };
			alertApi.alertControllerFind.mockRejectedValueOnce(error);
			const { fetchStatusAlerts, businessError } = useStatusAlerts();
			await fetchStatusAlerts();
			expect(businessError.value).toStrictEqual(error);
		});
	});

	describe("setStatusAlerts", () => {
		it("should set the status alerts", () => {
			const { setStatusAlerts, getStatusAlerts } = useStatusAlerts();

			expect(getStatusAlerts.value).toEqual([]);
			setStatusAlerts(mockStatusAlerts);
			expect(getStatusAlerts.value).toStrictEqual(mockStatusAlerts);
		});
	});

	describe("setBusinessError", () => {
		it("should set the business error", () => {
			const { setBusinessError, businessError } = useStatusAlerts();
			const error = { statusCode: "500", message: "Internal Server Error" };
			expect(businessError.value).toEqual({ statusCode: "", message: "" });
			setBusinessError(error);
			expect(businessError.value).toStrictEqual(error);
		});

		it("should reset the business error", () => {
			const { setBusinessError, resetBusinessError, businessError } = useStatusAlerts();
			const error = { statusCode: "500", message: "Internal Server Error" };
			setBusinessError(error);
			expect(businessError.value).toStrictEqual(error);
			resetBusinessError();
			expect(businessError.value).toEqual({ statusCode: "", message: "" });
		});
	});

	describe("setStatus", () => {
		it("should set the status", () => {
			const { setStatus, status } = useStatusAlerts();
			expect(status.value).toEqual("");
			setStatus("pending");
			expect(status.value).toEqual("pending");
		});
	});
});
