import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ToolContextType } from "@/serverApi/v3";
import { ExternalToolDisplayData } from "@/store/external-tool";
import { externalToolDisplayDataFactory } from "@@/tests/test-utils";
import { useContextExternalToolApi } from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useExternalToolElementDisplayState } from "./ExternalToolElementDisplayState.composable";

jest.mock("@data-external-tool");
jest.mock("@/components/error-handling/ErrorHandler.composable");

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

			return {
				displayDataMock,
				...useExternalToolElementDisplayState(),
			};
		};

		it("should call the api for display data of the card", async () => {
			const { fetchDisplayData } = setup();

			await fetchDisplayData("contextId");

			expect(
				useContextExternalToolApiMock.fetchDisplayDataCall
			).toHaveBeenCalledWith("contextId", ToolContextType.BoardElement);
		});

		it("should set the display data in the state", async () => {
			const { fetchDisplayData, displayData, displayDataMock } = setup();

			await fetchDisplayData("contextId");

			expect(displayData.value).toEqual(displayDataMock);
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
				...useExternalToolElementDisplayState(),
			};
		};

		it("should handle the error", async () => {
			const { fetchDisplayData, error } = setup();

			await fetchDisplayData("contextId");

			expect(useErrorHandlerMock.handleError).toHaveBeenCalledWith(error);
		});
	});
});
