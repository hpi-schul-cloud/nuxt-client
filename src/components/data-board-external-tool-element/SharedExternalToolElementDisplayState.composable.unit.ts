import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ToolContextType } from "@/serverApi/v3";
import { ExternalToolDisplayData } from "@/store/external-tool";
import { externalToolDisplayDataFactory } from "@@/tests/test-utils";
import { useContextExternalToolApi } from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { Ref } from "vue";
import { useSharedExternalToolElementDisplayState } from "./SharedExternalToolElementDisplayState.composable";

jest.mock("@data-external-tool");
jest.mock("@/components/error-handling/ErrorHandler.composable");
jest.mock<typeof import("@/utils/create-shared-composable")>(
	"@/utils/create-shared-composable",
	() => ({
		createTestableSharedComposable: (composable) => composable,
	})
);

describe("SharedExternalToolElementDisplayState.composable", () => {
	let useContextExternalToolApiMock: DeepMocked<
		ReturnType<typeof useContextExternalToolApi>
	>;
	let useErrorHandlerMock: DeepMocked<ReturnType<typeof useErrorHandler>>;

	beforeEach(() => {
		useContextExternalToolApiMock =
			createMock<ReturnType<typeof useContextExternalToolApi>>();
		useErrorHandlerMock = createMock<ReturnType<typeof useErrorHandler>>();

		jest
			.mocked(useContextExternalToolApi)
			.mockReturnValue(useContextExternalToolApiMock);
		jest.mocked(useErrorHandler).mockReturnValue(useErrorHandlerMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("when no data is loaded", () => {
		it("should have no data lists", async () => {
			const displayDataState = useSharedExternalToolElementDisplayState();

			const result: Ref<ExternalToolDisplayData[]> | undefined =
				displayDataState.getDisplayDataList("cardId");

			expect(result).toBeUndefined();
		});

		it("should not find data", async () => {
			const displayDataState = useSharedExternalToolElementDisplayState();

			const result: ExternalToolDisplayData | undefined =
				displayDataState.findDisplayData("cardId", "contextExternalToolId");

			expect(result).toBeUndefined();
		});
	});

	describe("when data is loaded", () => {
		const setup = () => {
			const displayData: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			useContextExternalToolApiMock.fetchDisplayDataCall.mockResolvedValue([
				displayData,
			]);

			return {
				displayData,
				...useSharedExternalToolElementDisplayState(),
			};
		};

		it("should call the api for display data of the card", async () => {
			const { fetchDisplayData } = setup();

			await fetchDisplayData("cardId");

			expect(
				useContextExternalToolApiMock.fetchDisplayDataCall
			).toHaveBeenCalledWith("cardId", ToolContextType.BoardCard);
		});

		it("should set the display data in the state", async () => {
			const { fetchDisplayData, getDisplayDataList, displayData } = setup();

			await fetchDisplayData("cardId");
			const result: Ref<ExternalToolDisplayData[]> | undefined =
				getDisplayDataList("cardId");

			expect(result?.value).toEqual([displayData]);
		});

		it("should find the display data for a specific tool", async () => {
			const { fetchDisplayData, findDisplayData, displayData } = setup();

			await fetchDisplayData("cardId");
			const result: ExternalToolDisplayData | undefined = findDisplayData(
				"cardId",
				displayData.contextExternalToolId
			);

			expect(result).toEqual(displayData);
		});

		it("should not find data for non-existing tools", async () => {
			const { fetchDisplayData, findDisplayData } = setup();

			await fetchDisplayData("cardId");
			const result: ExternalToolDisplayData | undefined = findDisplayData(
				"cardId",
				"otherId"
			);

			expect(result).toBeUndefined();
		});
	});

	describe("when an error occurs during loading", () => {
		const setup = () => {
			const error = new Error("unable to load");

			useContextExternalToolApiMock.fetchDisplayDataCall.mockRejectedValue(
				error
			);

			return {
				error,
				...useSharedExternalToolElementDisplayState(),
			};
		};

		it("should handle the error", async () => {
			const { fetchDisplayData, error } = setup();

			await fetchDisplayData("cardId");

			expect(useErrorHandlerMock.handleError).toHaveBeenCalledWith(error);
		});
	});
});
