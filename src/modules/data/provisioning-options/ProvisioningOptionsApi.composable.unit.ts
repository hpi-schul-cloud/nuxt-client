import * as serverApi from "@/serverApi/v3/api";
import {
	SchoolApiInterface,
	SchulConneXProvisioningOptionsResponse,
} from "@/serverApi/v3/api";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mockApiResponse, mountComposable } from "@@/tests/test-utils";
import { useProvisioningOptionsApi } from "./ProvisioningOptionsApi.composable";
import { ProvisioningOptions } from "./type";
import setupStores from "@@/tests/test-utils/setupStores";
import SchoolsModule from "@/store/schools";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";

describe("ProvisioningOptionsApi.composable", () => {
	let schoolApi: DeepMocked<SchoolApiInterface>;
	const notifierModule = createModuleMocks(NotifierModule);

	beforeAll(() => {
		schoolApi = createMock<SchoolApiInterface>();

		jest.spyOn(serverApi, "SchoolApiFactory").mockReturnValue(schoolApi);

		setupStores({
			schoolsModule: SchoolsModule,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getProvisioningOptions", () => {
		const setup = () => {
			const provisioningOptions: SchulConneXProvisioningOptionsResponse = {
				groupProvisioningClassesEnabled: true,
				groupProvisioningCoursesEnabled: true,
				groupProvisioningOtherEnabled: true,
			};

			const composable = mountComposable(() => useProvisioningOptionsApi(), {
				global: {
					provide: { [NOTIFIER_MODULE_KEY.valueOf()]: notifierModule },
				},
			});

			schoolApi.schoolControllerGetProvisioningOptions.mockResolvedValue(
				mockApiResponse({ data: provisioningOptions })
			);

			return {
				provisioningOptions,
				composable,
			};
		};

		describe("when the api call succeeds", () => {
			it("should call the api for provisioning options", async () => {
				const { composable } = setup();

				await composable.getProvisioningOptions("systemId");

				expect(
					schoolApi.schoolControllerGetProvisioningOptions
				).toHaveBeenCalledWith("", "systemId");
			});

			it("should return provisioning options", async () => {
				const { composable, provisioningOptions } = setup();

				const result = await composable.getProvisioningOptions("systemId");

				expect(result).toEqual<ProvisioningOptions>({
					class: provisioningOptions.groupProvisioningClassesEnabled,
					course: provisioningOptions.groupProvisioningCoursesEnabled,
					others: provisioningOptions.groupProvisioningOtherEnabled,
				});
			});
		});

		describe("when the api call fails", () => {
			const setup = () => {
				const error = new Error();
				schoolApi.schoolControllerGetProvisioningOptions.mockRejectedValue(
					error
				);

				const composable = mountComposable(() => useProvisioningOptionsApi(), {
					global: {
						provide: { [NOTIFIER_MODULE_KEY.valueOf()]: notifierModule },
					},
				});

				return {
					error,
					composable,
				};
			};

			it("should throw error", async () => {
				const { composable, error } = setup();

				await expect(
					composable.getProvisioningOptions("systemid")
				).rejects.toThrow(error);
			});
		});
	});

	describe("saveProvisioningOptions", () => {
		const setup = () => {
			const provisioningOptions: SchulConneXProvisioningOptionsResponse = {
				groupProvisioningClassesEnabled: true,
				groupProvisioningCoursesEnabled: true,
				groupProvisioningOtherEnabled: true,
			};
			const provisioningOptionsEntry: ProvisioningOptions = {
				class: true,
				course: true,
				others: true,
			};

			const composable = mountComposable(() => useProvisioningOptionsApi(), {
				global: {
					provide: { [NOTIFIER_MODULE_KEY.valueOf()]: notifierModule },
				},
			});

			schoolApi.schoolControllerSetProvisioningOptions.mockResolvedValue(
				mockApiResponse({ data: provisioningOptions })
			);

			return {
				provisioningOptionsEntry,
				provisioningOptions,
				composable,
			};
		};

		describe("when the api call succeeds", () => {
			it("should call the api to save provisioning options", async () => {
				const { composable, provisioningOptionsEntry, provisioningOptions } =
					setup();

				await composable.saveProvisioningOptions(
					"systemId",
					provisioningOptionsEntry
				);

				expect(
					schoolApi.schoolControllerSetProvisioningOptions
				).toHaveBeenCalledWith("", "systemId", provisioningOptions);
			});

			it("should return provisioning options", async () => {
				const { composable, provisioningOptionsEntry } = setup();

				const result = await composable.saveProvisioningOptions(
					"systemId",
					provisioningOptionsEntry
				);

				expect(result).toEqual({
					class: true,
					course: true,
					others: true,
				});
			});
		});

		describe("when the api call fails", () => {
			const setup = () => {
				const error = new Error();
				schoolApi.schoolControllerSetProvisioningOptions.mockRejectedValue(
					error
				);

				const composable = mountComposable(() => useProvisioningOptionsApi(), {
					global: {
						provide: { [NOTIFIER_MODULE_KEY.valueOf()]: notifierModule },
					},
				});

				const provisioningOptionsEntry: ProvisioningOptions = {
					class: true,
					course: true,
					others: true,
				};

				return {
					error,
					provisioningOptionsEntry,
					composable,
				};
			};

			it("should throw error", async () => {
				const { composable, error, provisioningOptionsEntry } = setup();

				await expect(
					composable.saveProvisioningOptions(
						"systemid",
						provisioningOptionsEntry
					)
				).rejects.toThrow(error);
			});
		});
	});
});
