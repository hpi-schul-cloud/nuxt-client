import StatusAlertsModule from "./status-alerts";
import { StatusAlert } from "./types/status-alert";
import setupStores from "@@/tests/test-utils/setupStores";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import * as serverApi from "@/serverApi/v3/api";

describe("status alerts module", () => {
	describe("actions", () => {
		beforeEach(() => {
			setupStores();
		});
		describe("fetchStatusAlerts", () => {
			it("should call api and set the alerts corectly", async () => {
				const mockApi = {
					alertControllerFind: jest.fn(() => ({
						data: {
							data: mockStatusAlerts,
						},
					})),
				};
				jest
					.spyOn(serverApi, "AlertApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.AlertApiInterface);
				const statusAlertsModule = new StatusAlertsModule({});
				const setStatusAlertsSpy = jest.spyOn(
					statusAlertsModule,
					"setStatusAlerts"
				);
				const setStatusSpy = jest.spyOn(statusAlertsModule, "setStatus");
				const resetBusinessErrorSpy = jest.spyOn(
					statusAlertsModule,
					"resetBusinessError"
				);
				await statusAlertsModule.fetchStatusAlerts();

				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(setStatusSpy).toBeCalledTimes(2);
				expect(setStatusSpy.mock.calls).toEqual([["pending"], ["completed"]]);
				expect(setStatusAlertsSpy).toHaveBeenCalledWith(mockStatusAlerts);
			});
			it("should handle exception", async () => {
				const error = { status: 418, statusText: "I'm a teapot" };
				const mockApi = {
					alertControllerFind: jest.fn(() => Promise.reject({ ...error })),
				};
				jest
					.spyOn(serverApi, "AlertApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.AlertApiInterface);
				const statusAlertsModule = new StatusAlertsModule({});
				const setBusinessErrorSpy = jest.spyOn(
					statusAlertsModule,
					"setBusinessError"
				);
				await statusAlertsModule.fetchStatusAlerts();
				expect(setBusinessErrorSpy).toHaveBeenCalled();
			});
		});
	});
	describe("mutations", () => {
		describe("setStatusAlerts", () => {
			it("should set the status alerts", () => {
				const statusAlertsModule = new StatusAlertsModule({});
				expect(statusAlertsModule.statusAlerts).toEqual([]);
				statusAlertsModule.setStatusAlerts(mockStatusAlerts as StatusAlert[]);
				expect(statusAlertsModule.statusAlerts).toBe(mockStatusAlerts);
			});
		});
	});

	describe("getters", () => {
		describe("getStatusAlerts", () => {
			it("should get the status alerts", () => {
				const statusAlertsModule = new StatusAlertsModule({});
				expect(statusAlertsModule.getStatusAlerts).toEqual([]);
				statusAlertsModule.statusAlerts = mockStatusAlerts;
				expect(statusAlertsModule.getStatusAlerts).toBe(mockStatusAlerts);
			});
		});
	});
});
