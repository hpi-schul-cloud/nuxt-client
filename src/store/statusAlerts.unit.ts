import StatusAlertsModule, {AlertStatus, StatusAlert} from './statusAlerts';
import {initializeAxios} from "../utils/api";
import {NuxtAxiosInstance} from "@nuxtjs/axios";
import setupStores from "@@/tests/test-utils/setupStores";

const mockStatusAlerts: StatusAlert[] = [
	{
		title: "Important info",
		text: "Description of the alert",
		status: "info",
		origin: {
			page: "status",
			message_id: 1
		},
		timestamp: "2022-08-25 10:33:38",
		url: "https://status.test.cloud"
	},
	{
		title: "Problem resolved",
		text: "Description of the alert 2",
		status: "done",
		origin: {
			page: "status",
			message_id: 2
		},
		timestamp: "2022-08-25 10:33:38",
		url: "https://status.test.cloud"
	},
	{
		title: "Critical problem in progress info2",
		text: "Description of the alert 3",
		status: "danger",
		origin: {
			page: "status",
			message_id: 3
		},
		timestamp: "2022-08-25 10:33:38",
		url: "https://status.test.cloud"
	}
];

describe('statusAlerts module', () => {
	describe('actions', () => {
		beforeEach(() => {
			initializeAxios({
				$get: async (path) => {
					if (path === '/v1/alert') return mockStatusAlerts;
				},
			} as NuxtAxiosInstance);
			setupStores();
		});
		describe('fetchStatusAlerts', () => {
			it('should call api and set the alerts corectly', async () => {
				const statusAlertsModule = new StatusAlertsModule({});
				const setStatusAlertsSpy = jest.spyOn(statusAlertsModule, 'setStatusAlerts');
				const setStatusSpy = jest.spyOn(statusAlertsModule, 'setStatus');
				const resetBusinessErrorSpy = jest.spyOn(statusAlertsModule, 'resetBusinessError');
				await statusAlertsModule.fetchStatusAlerts();

				expect(resetBusinessErrorSpy).toHaveBeenCalled();
				expect(setStatusSpy).toBeCalledTimes(2);
				expect(setStatusSpy.mock.calls).toEqual([
					['pending'],
					['completed']
				]);
				expect(setStatusAlertsSpy).toHaveBeenCalledWith(mockStatusAlerts);
			});
			it('should handle exception', async () => {
				initializeAxios({
					$get: async (path: string) => {
						throw new Error("");
						return;
					},
				} as NuxtAxiosInstance);
				const statusAlertsModule = new StatusAlertsModule({});
				const setBusinessErrorSpy = jest.spyOn(statusAlertsModule, 'setBusinessError');
				await statusAlertsModule.fetchStatusAlerts();
				expect(setBusinessErrorSpy).toHaveBeenCalled();
			});
		});
	});
	describe('mutations', () => {
		describe('setStatusAlerts', () => {
			it('should set the status alerts', () => {
				const statusAlertsModule = new StatusAlertsModule({});
				expect(statusAlertsModule.statusAlerts).toEqual([]);
				statusAlertsModule.setStatusAlerts(mockStatusAlerts as StatusAlert[]);
				expect(statusAlertsModule.statusAlerts).toBe(mockStatusAlerts);
			});
		});
	});

	describe('getters', () => {
		describe('getStatusAlerts', () => {
			it('should get the status alerts', () => {
				const statusAlertsModule = new StatusAlertsModule({});
				expect(statusAlertsModule.getStatusAlerts).toEqual([]);
				statusAlertsModule.statusAlerts = mockStatusAlerts;
				expect(statusAlertsModule.getStatusAlerts).toBe(mockStatusAlerts);
			});
		});
	});
});