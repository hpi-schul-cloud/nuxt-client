import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ContentElementType } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import { envsFactory, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { richTextElementResponseFactory } from "@@/tests/test-utils/factory/richTextElementResponseFactory";
import setupStores from "@@/tests/test-utils/setupStores";
import { useCardStore, useSocketConnection } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier } from "@util-board";
import { setActivePinia } from "pinia";
import { useI18n } from "vue-i18n";
import {
	CreateElementSuccessPayload,
	DeleteCardRequestPayload,
	DisconnectSocketRequestPayload,
	UpdateCardHeightFailurePayload,
	UpdateCardTitleFailurePayload,
} from "./cardActionPayload";
import * as CardActions from "./cardActions";
import { useCardSocketApi } from "./cardSocketApi.composable";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@data-board/socket/socket");
const mockedUseSocketConnection = jest.mocked(useSocketConnection);

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("useCardSocketApi", () => {
	let mockedSocketConnectionHandler: DeepMocked<
		ReturnType<typeof useSocketConnection>
	>;
	let mockedErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({}));

		setupStores({ envConfigModule: EnvConfigModule });
		const envs = envsFactory.build({
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
		});
		envConfigModule.setEnvs(envs);

		mockedSocketConnectionHandler =
			createMock<ReturnType<typeof useSocketConnection>>();
		mockedUseSocketConnection.mockReturnValue(mockedSocketConnectionHandler);

		mockedErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	describe("dispatch", () => {
		it("should call disconnectSocket for corresponding action", () => {
			const { dispatch } = useCardSocketApi();

			dispatch(CardActions.disconnectSocket({}));

			expect(mockedSocketConnectionHandler.disconnectSocket).toHaveBeenCalled();
		});

		it("should call createElementSuccess for corresponding action", () => {
			const cardStore = mockedPiniaStoreTyping(useCardStore);
			const { dispatch } = useCardSocketApi();

			const payload: CreateElementSuccessPayload = {
				cardId: "cardId",
				type: ContentElementType.RichText,
				toPosition: 0,
				newElement: richTextElementResponseFactory.build(),
			};
			dispatch(CardActions.createElementSuccess(payload));

			expect(cardStore.createElementSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call deleteElementSuccess for corresponding action", () => {
			const cardStore = mockedPiniaStoreTyping(useCardStore);
			const { dispatch } = useCardSocketApi();

			const payload = {
				cardId: "cardId",
				elementId: "elementId",
			};
			dispatch(CardActions.deleteElementSuccess(payload));

			expect(cardStore.deleteElementSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call updateCardTitleSuccess for corresponding action", () => {
			const cardStore = mockedPiniaStoreTyping(useCardStore);
			const { dispatch } = useCardSocketApi();

			const payload = {
				cardId: "cardId",
				newTitle: "newTitle",
			};
			dispatch(CardActions.updateCardTitleSuccess(payload));

			expect(cardStore.updateCardTitleSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call updateCardHeightSuccess for corresponding action", () => {
			const cardStore = mockedPiniaStoreTyping(useCardStore);
			const { dispatch } = useCardSocketApi();

			const payload = {
				cardId: "cardId",
				newHeight: 100,
			};
			dispatch(CardActions.updateCardHeightSuccess(payload));

			expect(cardStore.updateCardHeightSuccess).toHaveBeenCalledWith(payload);
		});

		it("should call notifySocketError for updateCardTitleFailure action", () => {
			const { dispatch } = useCardSocketApi();

			const payload: UpdateCardTitleFailurePayload = {
				errorType: "notUpdated",
				boardObjectType: "boardCard",
			};
			dispatch(CardActions.updateCardTitleFailure(payload));

			expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
				payload.errorType,
				payload.boardObjectType
			);
		});

		it("should call notifySocketError for updateCardHeightFailure action", () => {
			const { dispatch } = useCardSocketApi();

			const payload: UpdateCardHeightFailurePayload = {
				errorType: "notUpdated",
				boardObjectType: "boardCard",
			};
			dispatch(CardActions.updateCardHeightFailure(payload));

			expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
				payload.errorType,
				payload.boardObjectType
			);
		});
	});

	describe("disconnectSocketRequest", () => {
		const payload: DisconnectSocketRequestPayload = {};

		it("should call disconnectSocket", () => {
			const { disconnectSocketRequest } = useCardSocketApi();

			disconnectSocketRequest(payload);

			expect(mockedSocketConnectionHandler.disconnectSocket).toHaveBeenCalled();
		});
	});

	describe("createElementRequest", () => {
		it("should call emitOnSocket with correct parameters", () => {
			const { createElementRequest } = useCardSocketApi();

			const payload = {
				cardId: "cardId",
				type: ContentElementType.RichText,
			};

			createElementRequest(payload);

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"create-element-request",
				payload
			);
		});
	});

	describe("deleteElementRequest", () => {
		it("should call emitOnSocket with correct parameters", () => {
			const { deleteElementRequest } = useCardSocketApi();

			const payload = {
				cardId: "cardId",
				elementId: "elementId",
			};

			deleteElementRequest(payload);

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"delete-element-request",
				payload
			);
		});
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

	describe("updateCardTitleRequest", () => {
		const payload = {
			cardId: "cardId",
			newTitle: "newTitle",
		};

		it("should call emitOnSocket with correct parameters", () => {
			const { updateCardTitleRequest } = useCardSocketApi();

			updateCardTitleRequest(payload);

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"update-card-title-request",
				payload
			);
		});
	});

	describe("updateCardHeightRequest", () => {
		const payload = {
			cardId: "cardId",
			newHeight: 100,
		};

		it("should call emitOnSocket with correct parameters", () => {
			const { updateCardHeightRequest } = useCardSocketApi();

			updateCardHeightRequest(payload);

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"update-card-height-request",
				payload
			);
		});
	});
	describe("fetchCardRequest", () => {
		const payload = {
			cardIds: ["fake-card-id-234"],
		};

		it("should call emitOnSocket with correct parameters", () => {
			const { fetchCardRequest } = useCardSocketApi();
			fetchCardRequest(payload);

			jest.advanceTimersByTime(1000);
			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"fetch-card-request",
				payload
			);
		});
	});
});
