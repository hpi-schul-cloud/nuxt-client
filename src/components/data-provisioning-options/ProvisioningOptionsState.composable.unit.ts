import { axiosErrorFactory } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { BusinessError } from "../../store/types/commons";
import { mapAxiosErrorToResponseError } from "../../utils/api";
import { useProvisioningOptionsApi } from "./ProvisioningOptionsApi.composable";
import { useProvisioningOptionsState } from "./ProvisioningOptionsState.composable";
import { ProvisioningOptions } from "./type";
import { provisioningOptionsDataFactory } from "../../../tests/test-utils/factory/provisioningOptionsDataFactory";

jest.mock("@data-external-tool/ContextExternalToolApi.composable");

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

	describe("when no data is loaded", () => {
		it("should not have data", async () => {
			const { provisioningOptionsData } = useProvisioningOptionsState();

			expect(provisioningOptionsData.value).toBeUndefined();
		});
	});

	describe("when data is loaded", () => {
		const setup = () => {
			const provisioningOptionsDataMock: ProvisioningOptions =
				provisioningOptionsDataFactory.build();

			useProvisioningOptionsApiMock.getProvisioningOptions.mockResolvedValue(
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
			const { fetchProvisioningOptionsData, error } = setup();

			await fetchProvisioningOptionsData("systemId");

			expect(error.value).toBeUndefined();
		});

		it("should call the api for display data of the card", async () => {
			const { fetchProvisioningOptionsData } = setup();

			await fetchProvisioningOptionsData("systemId");

			expect(
				useProvisioningOptionsApiMock.getProvisioningOptions
			).toHaveBeenCalledWith("systemId");
		});

		it("should set the display data in the state", async () => {
			const {
				fetchProvisioningOptionsData,
				provisioningOptionsData,
				provisioningOptionsDataMock,
			} = setup();

			await fetchProvisioningOptionsData("systemId");

			expect(provisioningOptionsData.value).toEqual(
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

			return {
				errorResponse,
				apiError,
				...useProvisioningOptionsState(),
			};
		};

		it("should set the error", async () => {
			const { fetchProvisioningOptionsData, error, apiError } = setup();

			await fetchProvisioningOptionsData("systemid");

			expect(error.value).toEqual<BusinessError>({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		});
	});
});
// TODO N21-1479 test update / save
