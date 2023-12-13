import * as serverApi from "@/serverApi/v3/api";
import {
	SchoolApiInterface,
	SchulConneXProvisioningOptionsResponse,
} from "@/serverApi/v3/api";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mockApiResponse } from "@@/tests/test-utils";
import { useProvisioningOptionsApi } from "./ProvisioningOptionsApi.composable";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ProvisioningOptions } from "./type";
import setupStores from "@@/tests/test-utils/setupStores";
import SchoolsModule from "@/store/schools";

jest.mock("@/components/error-handling/ErrorHandler.composable");

describe("SystemApi.composable", () => {
	let schoolApi: DeepMocked<SchoolApiInterface>;
	let useErrorHandlerMock: DeepMocked<ReturnType<typeof useErrorHandler>>;

	beforeAll(() => {
		schoolApi = createMock<SchoolApiInterface>();
		useErrorHandlerMock = createMock<ReturnType<typeof useErrorHandler>>();

		jest.spyOn(serverApi, "SchoolApiFactory").mockReturnValue(schoolApi);
		jest.mocked(useErrorHandler).mockReturnValue(useErrorHandlerMock);

		setupStores({ schoolsModule: SchoolsModule });
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

			schoolApi.schoolControllerGetProvisioningOptions.mockResolvedValue(
				mockApiResponse({ data: provisioningOptions })
			);

			return {
				provisioningOptions,
			};
		};

		describe("when the api call succeeds", () => {
			it("should call the api for provisioning options", async () => {
				setup();

				await useProvisioningOptionsApi().getProvisioningOptions("systemId");

				expect(
					schoolApi.schoolControllerGetProvisioningOptions
				).toHaveBeenCalledWith("", "systemId");
			});

			it("should return provisioning options", async () => {
				const { provisioningOptions } = setup();

				const result =
					await useProvisioningOptionsApi().getProvisioningOptions("systemId");

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

				const provisioningOptionsDefaultValues: ProvisioningOptions = {
					class: true,
					course: false,
					others: false,
				};

				return {
					error,
					provisioningOptionsDefaultValues,
				};
			};

			it("should call the error handler", async () => {
				const { error } = setup();

				await useProvisioningOptionsApi().getProvisioningOptions("systemId");

				expect(useErrorHandlerMock.handleError).toHaveBeenCalledWith(error, {
					404: undefined,
					500: undefined,
				});
			});

			it("should return provisioning options default values", async () => {
				const { provisioningOptionsDefaultValues } = setup();

				const result =
					await useProvisioningOptionsApi().getProvisioningOptions("systemid");

				expect(result).toEqual(provisioningOptionsDefaultValues);
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

			schoolApi.schoolControllerSetProvisioningOptions.mockResolvedValue(
				mockApiResponse({ data: provisioningOptions })
			);

			return {
				provisioningOptionsEntry,
				provisioningOptions,
			};
		};

		describe("when the api call succeeds", () => {
			it("should call the api to save provisioning options", async () => {
				const { provisioningOptionsEntry, provisioningOptions } = setup();

				await useProvisioningOptionsApi().saveProvisioningOptions(
					"systemId",
					provisioningOptionsEntry
				);

				expect(
					schoolApi.schoolControllerSetProvisioningOptions
				).toHaveBeenCalledWith("", "systemId", provisioningOptions);
			});

			it("should return provisioning options", async () => {
				const { provisioningOptionsEntry } = setup();

				const result =
					await useProvisioningOptionsApi().saveProvisioningOptions(
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

				const provisioningOptionsDefaultValues: ProvisioningOptions = {
					class: true,
					course: false,
					others: false,
				};
				const provisioningOptionsEntry: ProvisioningOptions = {
					class: true,
					course: true,
					others: true,
				};

				return {
					error,
					provisioningOptionsDefaultValues,
					provisioningOptionsEntry,
				};
			};

			it("should call the error handler", async () => {
				const { error, provisioningOptionsEntry } = setup();

				await useProvisioningOptionsApi().saveProvisioningOptions(
					"systemId",
					provisioningOptionsEntry
				);

				expect(useErrorHandlerMock.handleError).toHaveBeenCalledWith(error, {
					404: undefined,
					500: undefined,
				});
			});

			it("should return provisioning options default values", async () => {
				const { provisioningOptionsDefaultValues, provisioningOptionsEntry } =
					setup();

				const result =
					await useProvisioningOptionsApi().saveProvisioningOptions(
						"systemid",
						provisioningOptionsEntry
					);

				expect(result).toEqual(provisioningOptionsDefaultValues);
			});
		});
	});
});
