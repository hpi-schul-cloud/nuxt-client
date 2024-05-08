import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { useCardSocketApi } from "./cardSocketApi.composable";
import { useSocketConnection, useCardStore } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";
import { DeleteCardRequestPayload } from "./cardActionPayload";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@data-board/socket/socket");
const mockedUseSocketConnection = jest.mocked(useSocketConnection);

jest.mock("@data-board/Card.store");
const mockedUseCardStore = jest.mocked(useCardStore);

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("useCardSocketApi", () => {
	let mockedSocketConnectionHandler: DeepMocked<
		ReturnType<typeof useSocketConnection>
	>;
	let mockedCardStore: DeepMocked<ReturnType<typeof useCardStore>>;
	let mockedErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		mockedSocketConnectionHandler =
			createMock<ReturnType<typeof useSocketConnection>>();
		mockedUseSocketConnection.mockReturnValue(mockedSocketConnectionHandler);

		mockedCardStore = createMock<ReturnType<typeof useCardStore>>();
		mockedUseCardStore.mockReturnValue(mockedCardStore);

		mockedErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);
	});

	describe("deleteCardRequest", () => {
		const payload: DeleteCardRequestPayload = { cardId: "cardId" };
		it("should call emitOnSocket with correct parameters", () => {
			const { deleteCardRequest } = useCardSocketApi();

			deleteCardRequest(payload);

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"delete-card-request",
				payload
			);
		});
	});
});
