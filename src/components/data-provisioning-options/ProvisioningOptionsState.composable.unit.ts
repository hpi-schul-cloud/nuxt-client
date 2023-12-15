import { axiosErrorFactory, mountComposable } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { useProvisioningOptionsApi } from "./ProvisioningOptionsApi.composable";
import { useProvisioningOptionsState } from "./ProvisioningOptionsState.composable";
import { ProvisioningOptions } from "./type";
import { provisioningOptionsDataFactory } from "@@/tests/test-utils/factory/provisioningOptionsDataFactory";
import { NOTIFIER_MODULE_KEY } from "../../utils/inject";
import { notifierModule } from "../../store";

jest.mock("@data-provisioning-options/ProvisioningOptionsApi.composable");

describe("ProvisioningOptionsState.composable", () => {
	let useProvisioningOptionsApiMock: DeepMocked<
		ReturnType<typeof useProvisioningOptionsApi>
	>;

	beforeEach(() => {
		useProvisioningOptionsApiMock =
			createMock<ReturnType<typeof useProvisioningOptionsApi>>();

		jest
			.mocked(useProvisioningOptionsApi)
			.mockReturnValue(useProvisioningOptionsApiMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("fetchProvisioningOptionsData", () => {
		describe("when no data is loaded", () => {
			it("should have default values", async () => {
				const { provisioningOptionsData } = useProvisioningOptionsState();

				expect(provisioningOptionsData.value).toEqual({
					class: true,
					course: false,
					others: false,
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
						[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
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
						[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
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

				expect(useProvisioningOptionsState().isLoading.value).toEqual(false);
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
			// TODO N21-1479 adjust test cases for new error handling moved from api composable
			it;
		});

		describe("when ");
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

				const composable = useProvisioningOptionsState();

				composable.error.value = {
					statusCode: 418,
					message: "error",
				};

				return {
					provisioningOptionsDataMock,
					...composable,
				};
			};

			it("should reset the error", async () => {
				const {
					updateProvisioningOptionsData,
					error,
					provisioningOptionsDataMock,
				} = setup();

				await updateProvisioningOptionsData(
					"systemId",
					provisioningOptionsDataMock
				);

				expect(error.value).toBeUndefined();
			});

			it("should call the api to save provisioning options data", async () => {
				const { updateProvisioningOptionsData, provisioningOptionsDataMock } =
					setup();

				await updateProvisioningOptionsData(
					"systemId",
					provisioningOptionsDataMock
				);

				expect(
					useProvisioningOptionsApiMock.saveProvisioningOptions
				).toHaveBeenCalledWith("systemId", provisioningOptionsDataMock);
			});

			it("should set the provisioning data in the state", async () => {
				const {
					updateProvisioningOptionsData,
					provisioningOptionsData,
					provisioningOptionsDataMock,
				} = setup();

				await updateProvisioningOptionsData(
					"systemId",
					provisioningOptionsDataMock
				);

				expect(provisioningOptionsData.value).toEqual(
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

				useProvisioningOptionsApiMock.saveProvisioningOptions.mockRejectedValueOnce(
					errorResponse
				);

				return {
					errorResponse,
					apiError,
					provisioningOptionsDataMock,
					provisioningOptionsDefaultData,
					...useProvisioningOptionsState(),
				};
			};

			it("should set loading to false", async () => {
				const { updateProvisioningOptionsData, provisioningOptionsDataMock } =
					setup();

				await updateProvisioningOptionsData(
					"systemid",
					provisioningOptionsDataMock
				);

				expect(useProvisioningOptionsState().isLoading.value).toEqual(false);
			});

			it("should set the error", async () => {
				const {
					updateProvisioningOptionsData,
					error,
					apiError,
					provisioningOptionsDataMock,
				} = setup();

				await updateProvisioningOptionsData(
					"systemid",
					provisioningOptionsDataMock
				);

				expect(error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});

			it("should return default provisioning options data", async () => {
				const {
					provisioningOptionsData,
					updateProvisioningOptionsData,
					provisioningOptionsDataMock,
					provisioningOptionsDefaultData,
				} = setup();

				await updateProvisioningOptionsData(
					"systemid",
					provisioningOptionsDataMock
				);

				expect(provisioningOptionsData.value).toEqual(
					provisioningOptionsDefaultData
				);
			});
		});
	});
});
