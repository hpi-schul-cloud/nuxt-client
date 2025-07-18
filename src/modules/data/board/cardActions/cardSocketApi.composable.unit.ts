import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ContentElementType } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import {
	cardResponseFactory,
	envsFactory,
	mockedPiniaStoreTyping,
	richTextElementContentFactory,
} from "@@/tests/test-utils";
import { richTextElementResponseFactory } from "@@/tests/test-utils/factory/richTextElementResponseFactory";
import setupStores from "@@/tests/test-utils/setupStores";
import { useCardStore, useSocketConnection } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier, useSharedLastCreatedElement } from "@util-board";
import { setActivePinia } from "pinia";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import {
	CreateElementFailurePayload,
	CreateElementSuccessPayload,
	DeleteCardFailurePayload,
	DeleteCardRequestPayload,
	DeleteElementFailurePayload,
	FetchCardFailurePayload,
	MoveElementFailurePayload,
	UpdateCardHeightFailurePayload,
	UpdateCardTitleFailurePayload,
	UpdateElementFailurePayload,
} from "./cardActionPayload.types";
import * as CardActions from "./cardActions";
import { useCardSocketApi } from "./cardSocketApi.composable";
import { Router, useRouter } from "vue-router";
import { Mock } from "vitest";

vi.mock("vue-i18n");
(useI18n as Mock).mockReturnValue({ t: (key: string) => key });

vi.mock("@data-board/socket/socket");
const mockedUseSocketConnection = vi.mocked(useSocketConnection);

vi.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = vi.mocked(useErrorHandler);

vi.mock("@util-board/BoardNotifier.composable");
vi.mock("@util-board/LastCreatedElement.composable");
vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);
const mockUseSharedLastCreatedElement = vi.mocked(useSharedLastCreatedElement);

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
		vi.useFakeTimers();

		mockUseSharedLastCreatedElement.mockReturnValue({
			lastCreatedElementId: computed(() => "element-id"),
			resetLastCreatedElementId: vi.fn(),
		});

		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	describe("dispatch", () => {
		it("should call disconnectSocket for corresponding action", () => {
			const { dispatch } = useCardSocketApi();

			dispatch(CardActions.disconnectSocket({}));

			expect(mockedSocketConnectionHandler.disconnectSocket).toHaveBeenCalled();
		});

		describe("success actions", () => {
			it("should call createElementSuccess for corresponding action", () => {
				const cardStore = mockedPiniaStoreTyping(useCardStore);
				const { dispatch } = useCardSocketApi();

				const payload: CreateElementSuccessPayload = {
					cardId: "cardId",
					type: ContentElementType.RichText,
					toPosition: 0,
					newElement: richTextElementResponseFactory.build(),
					isOwnAction: true,
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
					isOwnAction: true,
				};
				dispatch(CardActions.deleteElementSuccess(payload));

				expect(cardStore.deleteElementSuccess).toHaveBeenCalledWith(payload);
			});

			it("should call moveElementSuccess for corresponding action", () => {
				const cardStore = mockedPiniaStoreTyping(useCardStore);
				const { dispatch } = useCardSocketApi();

				const payload = {
					elementId: "elementId",
					toCardId: "toCardId",
					toPosition: 0,
					isOwnAction: true,
				};
				dispatch(CardActions.moveElementSuccess(payload));

				expect(cardStore.moveElementSuccess).toHaveBeenCalledWith(payload);
			});

			it("should call updateElementSuccess for corresponding action", () => {
				const cardStore = mockedPiniaStoreTyping(useCardStore);
				const { dispatch } = useCardSocketApi();

				const payload = {
					elementId: "elementId",
					data: {
						type: ContentElementType.RichText,
						content: richTextElementContentFactory.build(),
					},
					isOwnAction: true,
				};
				dispatch(CardActions.updateElementSuccess(payload));

				expect(cardStore.updateElementSuccess).toHaveBeenCalledWith(payload);
			});

			it("should call deleteCardSuccess for corresponding action", () => {
				const cardStore = mockedPiniaStoreTyping(useCardStore);
				const { dispatch } = useCardSocketApi();

				const payload = {
					cardId: "cardId",
					isOwnAction: true,
				};
				dispatch(CardActions.deleteCardSuccess(payload));

				expect(cardStore.deleteCardSuccess).toHaveBeenCalledWith(payload);
			});

			it("should call fetchCardSuccess for corresponding action", () => {
				const cardStore = mockedPiniaStoreTyping(useCardStore);
				const { dispatch } = useCardSocketApi();

				const payload = {
					cards: cardResponseFactory.buildList(2),
					isOwnAction: true,
				};
				dispatch(CardActions.fetchCardSuccess(payload));

				expect(cardStore.fetchCardSuccess).toHaveBeenCalledWith(payload);
			});

			it("should call updateCardTitleSuccess for corresponding action", () => {
				const cardStore = mockedPiniaStoreTyping(useCardStore);
				const { dispatch } = useCardSocketApi();

				const payload = {
					cardId: "cardId",
					newTitle: "newTitle",
					isOwnAction: true,
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
					isOwnAction: true,
				};
				dispatch(CardActions.updateCardHeightSuccess(payload));

				expect(cardStore.updateCardHeightSuccess).toHaveBeenCalledWith(payload);
			});
		});

		describe("failure actions", () => {
			it("should call notifySocketError for createElementFailure action", () => {
				const { dispatch } = useCardSocketApi();

				const payload: CreateElementFailurePayload = {
					cardId: "cardId",
					type: ContentElementType.RichText,
				};
				dispatch(CardActions.createElementFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notCreated",
					"boardElement"
				);
			});

			it("should call notifySocketError for deleteElementFailure action", () => {
				const { dispatch } = useCardSocketApi();

				const payload: DeleteElementFailurePayload = {
					cardId: "cardId",
					elementId: "elementId",
				};
				dispatch(CardActions.deleteElementFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notDeleted",
					"boardElement"
				);
			});

			it("should call notifySocketError for moveElementFailure action", () => {
				const { dispatch } = useCardSocketApi();

				const payload: MoveElementFailurePayload = {
					elementId: "elementId",
					toCardId: "toCardId",
					toPosition: 0,
				};
				dispatch(CardActions.moveElementFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notUpdated",
					"boardElement"
				);
			});

			it("should call notifySocketError for updateElementFailure action", () => {
				const { dispatch } = useCardSocketApi();

				const payload: UpdateElementFailurePayload = {
					element: richTextElementResponseFactory.build(),
				};
				dispatch(CardActions.updateElementFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notUpdated",
					"boardElement"
				);
			});

			it("should call notifySocketError for deleteCardFailure action", () => {
				const { dispatch } = useCardSocketApi();

				const payload: DeleteCardFailurePayload = {
					cardId: "cardId",
				};
				dispatch(CardActions.deleteCardFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notDeleted",
					"boardCard"
				);
			});

			it("should call notifySocketError for fetchCardFailure action", () => {
				const { dispatch } = useCardSocketApi();

				const payload: FetchCardFailurePayload = {
					cardIds: ["cardId"],
				};
				dispatch(CardActions.fetchCardFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notLoaded",
					"boardCard"
				);
			});

			it("should call notifySocketError for updateCardTitleFailure action", () => {
				const { dispatch } = useCardSocketApi();

				const payload: UpdateCardTitleFailurePayload = {
					cardId: "cardId",
					newTitle: "newTitle",
				};
				dispatch(CardActions.updateCardTitleFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notUpdated",
					"boardCard"
				);
			});

			it("should call notifySocketError for updateCardHeightFailure action", () => {
				const { dispatch } = useCardSocketApi();

				const payload: UpdateCardHeightFailurePayload = {
					cardId: "cardId",
					newHeight: 100,
				};
				dispatch(CardActions.updateCardHeightFailure(payload));

				expect(mockedErrorHandler.notifySocketError).toHaveBeenCalledWith(
					"notUpdated",
					"boardCard"
				);
			});
		});
	});

	describe("disconnectSocketRequest", () => {
		it("should call disconnectSocket", () => {
			const { disconnectSocketRequest } = useCardSocketApi();

			disconnectSocketRequest();

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

	describe("moveElementRequest", () => {
		it("should call emitOnSocket with correct parameters", () => {
			const { moveElementRequest } = useCardSocketApi();

			const payload = {
				elementId: "elementId",
				toCardId: "toCardId",
				toPosition: 0,
			};

			moveElementRequest(payload);

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"move-element-request",
				payload
			);
		});
	});

	describe("updateElementRequest", () => {
		it("should call emitOnSocket with correct parameters", () => {
			const { updateElementRequest } = useCardSocketApi();

			const element = richTextElementResponseFactory.build();

			updateElementRequest({ element });

			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"update-element-request",
				{
					elementId: element.id,
					data: {
						type: element.type,
						content: element.content,
					},
				}
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

			vi.advanceTimersByTime(1000);
			expect(mockedSocketConnectionHandler.emitOnSocket).toHaveBeenCalledWith(
				"fetch-card-request",
				payload
			);
		});
	});
});
