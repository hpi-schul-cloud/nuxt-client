import {
	CreateElementFailurePayload,
	CreateElementSuccessPayload,
	DeleteCardFailurePayload,
	DeleteCardRequestPayload,
	DeleteElementFailurePayload,
	DuplicateCardFailurePayload,
	FetchCardFailurePayload,
	MoveElementFailurePayload,
	UpdateCardHeightFailurePayload,
	UpdateCardTitleFailurePayload,
	UpdateElementFailurePayload,
} from "./cardActionPayload.types";
import * as CardActions from "./cardActions";
import { useCardSocketApi } from "./cardSocketApi.composable";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { BoardLayout, ContentElementType } from "@/serverApi/v3";
import { cardResponseFactory, mockedPiniaStoreTyping, richTextElementContentFactory } from "@@/tests/test-utils";
import { richTextElementResponseFactory } from "@@/tests/test-utils/factory/richTextElementResponseFactory";
import { useBoardStore, useCardStore, useSocketConnection } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { useSharedLastCreatedElement } from "@util-board";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Router, useRouter } from "vue-router";

vi.mock("vue-i18n");
(useI18n as Mock).mockReturnValue({ t: (key: string) => key });

vi.mock("@data-board/socket/socket");
const mockedUseSocketConnection = vi.mocked(useSocketConnection);

vi.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = vi.mocked(useErrorHandler);

vi.mock("@util-board/LastCreatedElement.composable");
vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

const mockUseSharedLastCreatedElement = vi.mocked(useSharedLastCreatedElement);

describe("useCardSocketApi", () => {
	let socketMock: DeepMocked<ReturnType<typeof useSocketConnection>>;
	let mockedErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({}));

		socketMock = createMock<ReturnType<typeof useSocketConnection>>();
		mockedUseSocketConnection.mockReturnValue(socketMock);

		mockedErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);

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

			expect(socketMock.disconnectSocket).toHaveBeenCalled();
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

			it("should call duplicateCardSuccess for corresponding action", () => {
				const cardStore = mockedPiniaStoreTyping(useCardStore);
				const { dispatch } = useCardSocketApi();

				const payload = {
					newCard: cardResponseFactory.build(),
					isOwnAction: true,
				};
				dispatch(CardActions.duplicateCardSuccess(payload));

				expect(cardStore.duplicateCardSuccess).toHaveBeenCalledWith(payload);
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
			const setupWithFakeBoard = () => {
				const boardStore = mockedPiniaStoreTyping(useBoardStore);
				boardStore.board = {
					id: "someid",
					title: "sometitle",
					columns: [],
					isVisible: true,
					layout: BoardLayout.Columns,
					timestamps: {
						createdAt: new Date().toISOString(),
						lastUpdatedAt: new Date().toISOString(),
						deletedAt: undefined,
					},
					readersCanEdit: false,
					features: [],
					permissions: [],
				};
				const { dispatch } = useCardSocketApi();
				return { dispatch, boardStore };
			};

			it("should reload the board for createElementFailure action", () => {
				const { dispatch, boardStore } = setupWithFakeBoard();

				const payload: CreateElementFailurePayload = {
					cardId: "cardId",
					type: ContentElementType.RichText,
				};
				dispatch(CardActions.createElementFailure(payload));

				expect(boardStore.reloadBoard).toHaveBeenCalled();
			});

			it("should reload the board for deleteElementFailure action", () => {
				const { dispatch, boardStore } = setupWithFakeBoard();

				const payload: DeleteElementFailurePayload = {
					cardId: "cardId",
					elementId: "elementId",
				};
				dispatch(CardActions.deleteElementFailure(payload));

				expect(boardStore.reloadBoard).toHaveBeenCalled();
			});

			it("should reload the board for moveElementFailure action", () => {
				const { dispatch, boardStore } = setupWithFakeBoard();

				const payload: MoveElementFailurePayload = {
					elementId: "elementId",
					toCardId: "toCardId",
					toPosition: 0,
				};
				dispatch(CardActions.moveElementFailure(payload));

				expect(boardStore.reloadBoard).toHaveBeenCalled();
			});

			it("should reload the board for updateElementFailure action", () => {
				const { dispatch, boardStore } = setupWithFakeBoard();

				const payload: UpdateElementFailurePayload = {
					element: richTextElementResponseFactory.build(),
				};
				dispatch(CardActions.updateElementFailure(payload));

				expect(boardStore.reloadBoard).toHaveBeenCalled();
			});

			it("should reload the board for deleteCardFailure action", () => {
				const { dispatch, boardStore } = setupWithFakeBoard();

				const payload: DeleteCardFailurePayload = {
					cardId: "cardId",
				};
				dispatch(CardActions.deleteCardFailure(payload));

				expect(boardStore.reloadBoard).toHaveBeenCalled();
			});

			it("should reload the board for duplicateCardFailure action", () => {
				const { dispatch, boardStore } = setupWithFakeBoard();

				const payload: DuplicateCardFailurePayload = {
					cardId: "cardId",
				};
				dispatch(CardActions.duplicateCardFailure(payload));

				expect(boardStore.reloadBoard).toHaveBeenCalled();
			});

			it("should reload the board for fetchCardFailure action", () => {
				const { dispatch, boardStore } = setupWithFakeBoard();

				const payload: FetchCardFailurePayload = {
					cardIds: ["cardId"],
				};
				dispatch(CardActions.fetchCardFailure(payload));

				expect(boardStore.reloadBoard).toHaveBeenCalled();
			});

			it("should reload the board for updateCardTitleFailure action", () => {
				const { dispatch, boardStore } = setupWithFakeBoard();

				const payload: UpdateCardTitleFailurePayload = {
					cardId: "cardId",
					newTitle: "newTitle",
				};
				dispatch(CardActions.updateCardTitleFailure(payload));

				expect(boardStore.reloadBoard).toHaveBeenCalled();
			});

			it("should do nothing on updateCardHeightFailure action", () => {
				const { dispatch, boardStore } = setupWithFakeBoard();

				const payload: UpdateCardHeightFailurePayload = {
					cardId: "cardId",
					newHeight: 100,
				};
				dispatch(CardActions.updateCardHeightFailure(payload));

				expect(boardStore.reloadBoard).not.toHaveBeenCalled();
			});
		});
	});

	describe("disconnectSocketRequest", () => {
		it("should call disconnectSocket", () => {
			const { disconnectSocketRequest } = useCardSocketApi();

			disconnectSocketRequest();

			expect(socketMock.disconnectSocket).toHaveBeenCalled();
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

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("create-element-request", payload);
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

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("delete-element-request", payload);
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

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("move-element-request", payload);
		});
	});

	describe("updateElementRequest", () => {
		it("should call emitOnSocket with correct parameters", () => {
			const { updateElementRequest } = useCardSocketApi();

			const element = richTextElementResponseFactory.build();

			updateElementRequest({ element });

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("update-element-request", {
				elementId: element.id,
				data: {
					type: element.type,
					content: element.content,
				},
			});
		});
	});

	describe("deleteCardRequest", () => {
		const payload: DeleteCardRequestPayload = { cardId: "cardId" };

		it("should call emitOnSocket with correct parameters", () => {
			const { deleteCardRequest } = useCardSocketApi();

			deleteCardRequest(payload);

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("delete-card-request", payload);
		});
	});

	describe("duplicateCardRequest", () => {
		it("should call emitOnSocket with correct parameters", () => {
			const { duplicateCardRequest } = useCardSocketApi();

			duplicateCardRequest("card-id");

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("duplicate-card-request", {
				cardId: "card-id",
			});
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

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("update-card-title-request", payload);
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

			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("update-card-height-request", payload);
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
			expect(socketMock.emitOnSocket).toHaveBeenCalledWith("fetch-card-request", payload);
		});
	});
});
