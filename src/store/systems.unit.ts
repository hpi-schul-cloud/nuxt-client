import * as serverApi from "../serverApi/v3/api";
import SystemsModule from "./systems";
import { System } from "./types/system";

// const createAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
// 	data,
// 	status: 200,
// 	statusText: "OK",
// 	headers: {},
// 	config: {},
// });

describe("SystemsModule", () => {
	let module: SystemsModule;

	beforeEach(() => {
		module = new SystemsModule({});
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	// const mockApi = () => {
	// 	const apiMock: jest.Mocked<SystemApiInterface> = {
	// 		systemControllerFind: jest.fn(),
	// 	};

	// 	jest.spyOn(serverApi, "SystemApiFactory").mockReturnValue(apiMock);

	// 	return { apiMock };
	// };

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

		describe("Error", () => {
			it("should return the default state", () => {
				const error: {} | null = module.getError;

				expect(error).toEqual(null);
			});

			it("should return the changed state", () => {
				const error: {} | null = new Error();

				module.setError(error);

				expect(module.getError).toEqual(error);
			});
		});
	});

	describe("actions", () => {
		describe("fetchSystems", () => {
			const setup = () => {
				const system: System = {
					id: "systemId",
					name: "systemName",
				};

				const mockApi = {
					systemControllerFind: jest.fn().mockResolvedValue({
						data: {
							data: [
								{
									id: "systemId",
									displayName: "systemName",
								},
							],
						},
					}),
				};

				jest
					.spyOn(serverApi, "SystemsApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.SystemsApiInterface);

				return {
					apiMock: mockApi,
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
				const error: Error = new Error();
				apiMock.systemControllerFind.mockRejectedValue(error);

				await module.fetchSystems();

				expect(module.getError).toEqual(error);
			});
		});
	});
});
