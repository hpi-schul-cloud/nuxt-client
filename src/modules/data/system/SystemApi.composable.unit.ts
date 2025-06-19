import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import * as serverApi from "@/serverApi/v3/api";
import { PublicSystemResponse, SystemsApiInterface } from "@/serverApi/v3/api";
import { mockApiResponse } from "@@/tests/test-utils";
import { useSystemApi } from "@data-system";
import { createMock, DeepMocked } from "@golevelup/ts-jest";

vi.mock("@/components/error-handling/ErrorHandler.composable");

describe("SystemApi.composable", () => {
	let systemApi: DeepMocked<SystemsApiInterface>;
	let useErrorHandlerMock: DeepMocked<ReturnType<typeof useErrorHandler>>;

	beforeEach(() => {
		systemApi = createMock<SystemsApiInterface>();
		useErrorHandlerMock = createMock<ReturnType<typeof useErrorHandler>>();

		vi.spyOn(serverApi, "SystemsApiFactory").mockReturnValue(systemApi);
		vi.mocked(useErrorHandler).mockReturnValue(useErrorHandlerMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("getSystem", () => {
		const setup = () => {
			const system: PublicSystemResponse = {
				id: "systemId",
				displayName: "displayName",
			};

			systemApi.systemControllerGetSystem.mockResolvedValue(
				mockApiResponse({ data: system })
			);

			return {
				system,
			};
		};

		describe("when the api call succeeds", () => {
			it("should call the api for systems", async () => {
				setup();

				await useSystemApi().getSystem("systemId");

				expect(systemApi.systemControllerGetSystem).toHaveBeenCalledWith(
					"systemId"
				);
			});

			it("should return a system", async () => {
				const { system } = setup();

				const result = await useSystemApi().getSystem("systemId");

				expect(result).toEqual({
					id: system.id,
					displayName: system.displayName,
					hasEndSessionEndpoint: false,
				});
			});
		});

		describe("when the api call fails", () => {
			const setup = () => {
				const error = new Error();
				systemApi.systemControllerGetSystem.mockRejectedValue(error);

				return {
					error,
				};
			};

			it("should call the error handler", async () => {
				const { error } = setup();

				await useSystemApi().getSystem("systemId");

				expect(useErrorHandlerMock.handleError).toHaveBeenCalledWith(error, {
					404: undefined,
					500: undefined,
				});
			});
		});
	});
});
