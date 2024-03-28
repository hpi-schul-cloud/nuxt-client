import { ExternalToolDisplayData } from "@/store/external-tool";
import {
	axiosErrorFactory,
	externalToolDisplayDataFactory,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { useContextExternalToolApi } from "./ContextExternalToolApi.composable";
import { useExternalToolElementDisplayState } from "./ExternalToolElementDisplayState.composable";

jest.mock("@data-external-tool/ContextExternalToolApi.composable");

describe("ExternalToolElementDisplayState.composable", () => {
	let useContextExternalToolApiMock: DeepMocked<
		ReturnType<typeof useContextExternalToolApi>
	>;

	beforeEach(() => {
		useContextExternalToolApiMock =
			createMock<ReturnType<typeof useContextExternalToolApi>>();

		jest
			.mocked(useContextExternalToolApi)
			.mockReturnValue(useContextExternalToolApiMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("when no data is loaded", () => {
		it("should not have data", async () => {
			const { displayData } = useExternalToolElementDisplayState();

			expect(displayData.value).toBeUndefined();
		});
	});

	describe("when data is loaded", () => {
		const setup = () => {
			const displayDataMock: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			useContextExternalToolApiMock.fetchDisplayDataCall.mockResolvedValue(
				displayDataMock
			);

			const composable = useExternalToolElementDisplayState();

			composable.error.value = {
				statusCode: 418,
				message: "error",
			};

			return {
				displayDataMock,
				...composable,
			};
		};

		it("should reset the error", async () => {
			const { fetchDisplayData, error } = setup();

			await fetchDisplayData("contextId");

			expect(error.value).toBeUndefined();
		});

		it("should call the api for display data of the card", async () => {
			const { fetchDisplayData } = setup();

			await fetchDisplayData("contextId");

			expect(
				useContextExternalToolApiMock.fetchDisplayDataCall
			).toHaveBeenCalledWith("contextId");
		});

		it("should set the display data in the state", async () => {
			const { fetchDisplayData, displayData, displayDataMock } = setup();

			await fetchDisplayData("contextId");

			expect(displayData.value).toEqual(displayDataMock);
		});
	});

	describe("when an error occurs during loading", () => {
		const setup = () => {
			const errorResponse = axiosErrorFactory.build();
			const apiError = mapAxiosErrorToResponseError(errorResponse);

			useContextExternalToolApiMock.fetchDisplayDataCall.mockRejectedValueOnce(
				errorResponse
			);

			return {
				errorResponse,
				apiError,
				...useExternalToolElementDisplayState(),
			};
		};

		it("should set the error", async () => {
			const { fetchDisplayData, error, apiError } = setup();

			await fetchDisplayData("contextId");

			expect(error.value).toEqual<BusinessError>({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		});
	});
});
