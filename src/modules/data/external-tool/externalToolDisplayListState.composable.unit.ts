import { useExternalToolDisplayListState } from "./externalToolDisplayListState.composable";
import { useExternalToolReferenceApi } from "./externalToolReferenceApi.composable";
import { ExternalToolDisplayData } from "./types";
import { ToolContextType } from "@/serverApi/v3";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { axiosErrorFactory, externalToolDisplayDataFactory } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";

vi.mock("@data-external-tool/externalToolReferenceApi.composable");

describe("externalToolDisplayListState.composable", () => {
	let useExternalToolReferenceApiMock: DeepMocked<ReturnType<typeof useExternalToolReferenceApi>>;

	beforeEach(() => {
		useExternalToolReferenceApiMock = createMock<ReturnType<typeof useExternalToolReferenceApi>>();

		vi.mocked(useExternalToolReferenceApi).mockReturnValue(useExternalToolReferenceApiMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when no data is loaded", () => {
		it("should not have data", async () => {
			const { displayData } = useExternalToolDisplayListState();

			expect(displayData.value).toEqual([]);
		});
	});

	describe("fetchDisplayData", () => {
		describe("when data is loaded", () => {
			const setup = () => {
				const displayDataMock: ExternalToolDisplayData = externalToolDisplayDataFactory.build();

				useExternalToolReferenceApiMock.fetchDisplayDataForContext.mockResolvedValue([displayDataMock]);

				const composable = useExternalToolDisplayListState();

				composable.error.value = {
					statusCode: 418,
					message: "error",
				};

				return {
					displayDataMock,
					composable,
				};
			};

			it("should reset the error", async () => {
				const { composable } = setup();

				await composable.fetchDisplayData("contextId", ToolContextType.Course);

				expect(composable.error.value).toBeUndefined();
			});

			it("should call the api for display", async () => {
				const { composable } = setup();

				await composable.fetchDisplayData("contextId", ToolContextType.Course);

				expect(useExternalToolReferenceApiMock.fetchDisplayDataForContext).toHaveBeenCalledWith(
					"contextId",
					ToolContextType.Course
				);
			});

			it("should set the display data in the state", async () => {
				const { composable, displayDataMock } = setup();

				await composable.fetchDisplayData("contextId", ToolContextType.Course);

				expect(composable.displayData.value).toEqual([displayDataMock]);
			});
		});

		describe("when an error occurs during loading", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				useExternalToolReferenceApiMock.fetchDisplayDataForContext.mockRejectedValueOnce(errorResponse);

				const composable = useExternalToolDisplayListState();

				return {
					errorResponse,
					apiError,
					composable,
				};
			};

			it("should set the error", async () => {
				const { composable, apiError } = setup();

				await composable.fetchDisplayData("contextId", ToolContextType.Course);

				expect(composable.error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});
		});
	});
});
