import { SystemApiInterface, SystemOauthResponse } from "../serverApi/v3";
import * as serverApi from "../serverApi/v3/api";
import SystemsModule from "./systems";
import { System } from "./types/system";
import { AxiosResponse } from "axios";

const createAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
	data,
	status: 200,
	statusText: "OK",
	headers: {},
	config: {},
});

describe("SystemsModule", () => {
	let module: SystemsModule;

	beforeEach(() => {
		module = new SystemsModule({});
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	const mockApi = () => {
		const apiMock: jest.Mocked<SystemApiInterface> = {
			systemControllerFind: jest.fn(),
		};

		jest.spyOn(serverApi, "SystemApiFactory").mockReturnValue(apiMock);

		return { apiMock };
	};

	describe("getter/setter", () => {
		describe("Loading", () => {
			it("should return the default state", () => {
				const loading: boolean = module.getLoading;

				expect(loading).toEqual(false);
			});

			it("should return the changed state", () => {
				module.setLoading(true);

				expect(module.getLoading).toEqual(true);
			});
		});

		describe("Systems", () => {
			it("should return the default state", () => {
				const systems: System[] = module.getSystems;

				expect(systems).toEqual([]);
			});

			it("should return the changed state", () => {
				const systems: System[] = [
					{
						id: "systemId",
						name: "systemName",
					},
				];

				module.setSystems(systems);

				expect(module.getSystems).toEqual(systems);
			});
		});
	});

	describe("actions", () => {
		describe("fetchSystems", () => {
			const setup = () => {
				const { apiMock } = mockApi();
				const system: System = {
					id: "systemId",
					name: "systemName",
				};
				const response: SystemOauthResponse = {
					data: [
						{
							id: "systemId",
							displayName: "systemName",
						},
					],
				};

				apiMock.systemControllerFind.mockResolvedValue(
					createAxiosResponse(response)
				);

				return {
					apiMock,
					system,
				};
			};

			it("should call the systemApi.systemControllerFind", async () => {
				const { apiMock } = setup();

				await module.fetchSystems();

				expect(apiMock.systemControllerFind).toHaveBeenCalled();
			});

			it("should set the systems", async () => {
				const { system } = setup();

				await module.fetchSystems();

				expect(module.getSystems).toEqual([system]);
			});

			it("should log an error", async () => {
				const { apiMock } = setup();
				apiMock.systemControllerFind.mockRejectedValue(new Error());
				jest.spyOn(console, "log");

				await module.fetchSystems();

				expect(console.log).toHaveBeenCalledWith(
					expect.stringContaining("error")
				);
			});
		});
	});
});
