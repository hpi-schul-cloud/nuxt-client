import StatusAlertsModule from "./status-alerts";
import { StatusAlert } from "./types/status-alert";
import { initializeAxios } from "../utils/api";
import { AxiosInstance } from "axios";
import setupStores from "@@/tests/test-utils/setupStores";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";

describe("status alerts module", () => {
	describe("actions", () => {
		beforeEach(() => {
			initializeAxios({
				get: async (path) => {
					if (path === "/v1/alert") return mockStatusAlerts;
				},
			} as AxiosInstance);
			setupStores();
		});
		describe("fetchStatusAlerts", () => {
			it("should call api and set the alerts corectly", async () => {
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
				initializeAxios({
					get: async (path: string) => {
						throw new Error("");
						return;
					},
				} as AxiosInstance);
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
