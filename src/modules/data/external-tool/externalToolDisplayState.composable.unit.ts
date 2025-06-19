import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import {
	axiosErrorFactory,
	externalToolDisplayDataFactory,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { useExternalToolDisplayState } from "./externalToolDisplayState.composable";
import { useExternalToolReferenceApi } from "./externalToolReferenceApi.composable";
import { ExternalToolDisplayData } from "./types";

vi.mock("@data-external-tool/externalToolReferenceApi.composable");

describe("externalToolDisplayState.composable", () => {
	let useExternalToolReferenceApiMock: DeepMocked<
		ReturnType<typeof useExternalToolReferenceApi>
	>;

	beforeEach(() => {
		useExternalToolReferenceApiMock =
			createMock<ReturnType<typeof useExternalToolReferenceApi>>();

		vi.mocked(useExternalToolReferenceApi).mockReturnValue(
			useExternalToolReferenceApiMock
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when no data is loaded", () => {
		it("should not have data", async () => {
			const { displayData } = useExternalToolDisplayState();

			expect(displayData.value).toBeUndefined();
		});
	});

	describe("fetchDisplayData", () => {
		describe("when data is loaded", () => {
			const setup = () => {
				const displayDataMock: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build();

				useExternalToolReferenceApiMock.fetchDisplayDataCall.mockResolvedValue(
					displayDataMock
				);

				const composable = useExternalToolDisplayState();

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

			it("should call the api for display data", async () => {
				const { fetchDisplayData } = setup();

				await fetchDisplayData("contextId");

				expect(
					useExternalToolReferenceApiMock.fetchDisplayDataCall
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

				useExternalToolReferenceApiMock.fetchDisplayDataCall.mockRejectedValueOnce(
					errorResponse
				);

				return {
					errorResponse,
					apiError,
					...useExternalToolDisplayState(),
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
});
