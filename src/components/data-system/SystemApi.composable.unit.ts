import * as serverApi from "@/serverApi/v3/api";
import { PublicSystemResponse, SystemsApiInterface } from "@/serverApi/v3/api";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mockApiResponse } from "@@/tests/test-utils";
import { useSystemApi } from "@data-system";

describe("SystemApi.composable", () => {
	let systemApi: DeepMocked<SystemsApiInterface>;

	beforeEach(() => {
		systemApi = createMock<SystemsApiInterface>();

		jest.spyOn(serverApi, "SystemsApiFactory").mockReturnValue(systemApi);
	});

	afterEach(() => {
		jest.clearAllMocks();
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
			});
		});
	});
});
