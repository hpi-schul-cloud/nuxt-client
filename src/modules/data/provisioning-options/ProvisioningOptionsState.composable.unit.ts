import NotifierModule from "@/store/notifier";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	apiResponseErrorFactory,
	axiosErrorFactory,
	i18nMock,
	mountComposable,
	provisioningOptionsDataFactory,
} from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { DeepMocked, createMock } from "@golevelup/ts-vitest";
import { useProvisioningOptionsApi } from "./ProvisioningOptionsApi.composable";
import { useProvisioningOptionsState } from "./ProvisioningOptionsState.composable";
import { ProvisioningOptions } from "./type/ProvisioningOptions";

vi.mock("@data-provisioning-options/ProvisioningOptionsApi.composable");

describe("ProvisioningOptionsState.composable", () => {
	let useProvisioningOptionsApiMock: DeepMocked<
		ReturnType<typeof useProvisioningOptionsApi>
	>;
	const notifierModule = createModuleMocks(NotifierModule);

	beforeEach(() => {
		useProvisioningOptionsApiMock =
			createMock<ReturnType<typeof useProvisioningOptionsApi>>();

		vi.mocked(useProvisioningOptionsApi).mockReturnValue(
			useProvisioningOptionsApiMock
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchProvisioningOptionsData", () => {
		describe("when no data is loaded", () => {
			const setup = () => {
				const composable = mountComposable(
					() => useProvisioningOptionsState(),
					{
						global: {
							provide: {
								[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
							},
							plugins: [createTestingI18n()],
							mocks: i18nMock,
						},
					}
				);

				return {
					composable,
				};
			};

			it("should have default values", async () => {
				const { composable } = setup();

				expect(
					composable.provisioningOptionsData.value
				).toEqual<ProvisioningOptions>({
					class: true,
					course: false,
					others: false,
					schoolExternalTools: false,
				});
			});
		});

		describe("when data is loaded", () => {
			const setup = () => {
				const provisioningOptionsDataMock: ProvisioningOptions =
					provisioningOptionsDataFactory.build();

				useProvisioningOptionsApiMock.getProvisioningOptions.mockResolvedValue(
					provisioningOptionsDataMock
				);

				const composable = mountComposable(
					() => useProvisioningOptionsState(),
					{
						global: {
							provide: {
								[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
							},
							plugins: [createTestingI18n()],
							mocks: i18nMock,
						},
					}
				);

				composable.error.value = {
					statusCode: 418,
					message: "error",
				};

				return {
					provisioningOptionsDataMock,
					composable,
				};
			};

			it("should reset the error", async () => {
				const { composable } = setup();

				await composable.fetchProvisioningOptionsData("systemId");

				expect(composable.error.value).toBeUndefined();
			});

			it("should call the api for provisioning options data", async () => {
				const { composable } = setup();

				await composable.fetchProvisioningOptionsData("systemId");

				expect(
					useProvisioningOptionsApiMock.getProvisioningOptions
				).toHaveBeenCalledWith("systemId");
			});

			it("should set the provisioning data in the state", async () => {
				const { composable, provisioningOptionsDataMock } = setup();

				await composable.fetchProvisioningOptionsData("systemId");

				expect(composable.provisioningOptionsData.value).toEqual(
					provisioningOptionsDataMock
				);
			});
		});

		describe("when an error occurs during loading", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				useProvisioningOptionsApiMock.getProvisioningOptions.mockRejectedValueOnce(
					errorResponse
				);

				const provisioningOptionsDefaultData: ProvisioningOptions =
					provisioningOptionsDataFactory.build();

				const composable = mountComposable(
					() => useProvisioningOptionsState(),
					{
						global: {
							provide: {
								[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
							},
							plugins: [createTestingI18n()],
							mocks: i18nMock,
						},
					}
				);

				return {
					errorResponse,
					apiError,
					provisioningOptionsDefaultData,
					composable,
				};
			};

			it("should set loading to false", async () => {
				const { composable } = setup();

				await composable.fetchProvisioningOptionsData("systemid");

				expect(composable.isLoading.value).toEqual(false);
			});

			it("should set the error", async () => {
				const { composable, apiError } = setup();

				await composable.fetchProvisioningOptionsData("systemid");

				expect(composable.error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});

			it("should return default provisioning options data", async () => {
				const { composable, provisioningOptionsDefaultData } = setup();

				await composable.fetchProvisioningOptionsData("systemid");

				expect(composable.provisioningOptionsData.value).toEqual(
					provisioningOptionsDefaultData
				);
			});

			it("should show notification", async () => {
				const { composable } = setup();

				await composable.fetchProvisioningOptionsData("systemId");

				expect(notifierModule.show).toHaveBeenCalled();
			});
		});

		describe("when occured error during loading is a NOT_FOUND", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build({
					response: {
						data: apiResponseErrorFactory.build({
							message: "mockMessage",
							code: 404,
						}),
					},
				});

				useProvisioningOptionsApiMock.getProvisioningOptions.mockRejectedValueOnce(
					errorResponse
				);

				const composable = mountComposable(
					() => useProvisioningOptionsState(),
					{
						global: {
							provide: {
								[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
							},
							plugins: [createTestingI18n()],
							mocks: i18nMock,
						},
					}
				);

				return {
					composable,
				};
			};

			it("should not show notification", async () => {
				const { composable } = setup();

				await composable.fetchProvisioningOptionsData("systemId");

				expect(notifierModule.show).not.toHaveBeenCalled();
			});
		});
	});

	describe("updateProvisioningOptionsData", () => {
		describe("when data is saved", () => {
			const setup = () => {
				const provisioningOptionsDataMock: ProvisioningOptions =
					provisioningOptionsDataFactory.build({
						class: true,
						course: true,
						others: true,
					});

				useProvisioningOptionsApiMock.saveProvisioningOptions.mockResolvedValue(
					provisioningOptionsDataMock
				);

				const composable = mountComposable(
					() => useProvisioningOptionsState(),
					{
						global: {
							provide: {
								[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
							},
							plugins: [createTestingI18n()],
							mocks: i18nMock,
						},
					}
				);

				composable.error.value = {
					statusCode: 418,
					message: "error",
				};

				return {
					provisioningOptionsDataMock,
					composable,
				};
			};

			it("should reset the error", async () => {
				const { composable, provisioningOptionsDataMock } = setup();

				await composable.updateProvisioningOptionsData(
					"systemId",
					provisioningOptionsDataMock
				);

				expect(composable.error.value).toBeUndefined();
			});

			it("should call the api to save provisioning options data", async () => {
				const { composable, provisioningOptionsDataMock } = setup();

				await composable.updateProvisioningOptionsData(
					"systemId",
					provisioningOptionsDataMock
				);

				expect(
					useProvisioningOptionsApiMock.saveProvisioningOptions
				).toHaveBeenCalledWith("systemId", provisioningOptionsDataMock);
			});

			it("should set the provisioning data in the state", async () => {
				const { composable, provisioningOptionsDataMock } = setup();

				await composable.updateProvisioningOptionsData(
					"systemId",
					provisioningOptionsDataMock
				);

				expect(composable.provisioningOptionsData.value).toEqual(
					provisioningOptionsDataMock
				);
			});
		});

		describe("when an error occurs during saving", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				const provisioningOptionsDataMock: ProvisioningOptions =
					provisioningOptionsDataFactory.build({
						class: true,
						course: true,
						others: true,
					});
				const provisioningOptionsDefaultData: ProvisioningOptions =
					provisioningOptionsDataFactory.build();

				const composable = mountComposable(
					() => useProvisioningOptionsState(),
					{
						global: {
							provide: {
								[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
							},
							plugins: [createTestingI18n()],
							mocks: i18nMock,
						},
					}
				);

				useProvisioningOptionsApiMock.saveProvisioningOptions.mockRejectedValueOnce(
					errorResponse
				);

				return {
					errorResponse,
					apiError,
					provisioningOptionsDataMock,
					provisioningOptionsDefaultData,
					composable,
				};
			};

			it("should set loading to false", async () => {
				const { composable, provisioningOptionsDataMock } = setup();

				await composable.updateProvisioningOptionsData(
					"systemid",
					provisioningOptionsDataMock
				);

				expect(composable.isLoading.value).toEqual(false);
			});

			it("should set the error", async () => {
				const { composable, apiError, provisioningOptionsDataMock } = setup();

				await composable.updateProvisioningOptionsData(
					"systemid",
					provisioningOptionsDataMock
				);

				expect(composable.error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});

			it("should show notification", async () => {
				const { composable, provisioningOptionsDataMock } = setup();

				await composable.updateProvisioningOptionsData(
					"systemid",
					provisioningOptionsDataMock
				);

				expect(notifierModule.show).toHaveBeenCalled();
			});
		});
	});
});
