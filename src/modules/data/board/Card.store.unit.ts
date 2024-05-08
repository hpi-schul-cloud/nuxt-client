import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { useBoardNotifier } from "@util-board";
import { useBoardApi } from "./BoardApi.composable";
import { useSharedEditMode } from "./EditMode.composable";
import { useI18n } from "vue-i18n";
import { useSocketConnection, useCardStore } from "@data-board";
import { useCardSocketApi } from "./cardActions/cardSocketApi.composable";
import { useCardRestApi } from "./cardActions/cardRestApi.composable";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { createPinia, setActivePinia } from "pinia";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import { ref } from "vue";
import { envConfigModule } from "@/store";
import { boardCardFactory, envsFactory } from "@@/tests/test-utils";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@data-board/BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

jest.mock("./cardActions/cardSocketApi.composable");
const mockedUseCardSocketApi = jest.mocked(useCardSocketApi);

jest.mock("./cardActions/cardRestApi.composable");
const mockedUseCardRestApi = jest.mocked(useCardRestApi);

jest.mock("./EditMode.composable");
const mockedSharedEditMode = jest.mocked(useSharedEditMode);

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

jest.mock("@data-board/socket/socket");
const mockedUseSocketConnection = jest.mocked(useSocketConnection);

describe("CardStore", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;
	let mockedErrorHandlerCalls: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedSocketApiHandler: DeepMocked<
		ReturnType<typeof useSocketConnection>
	>;
	let mockedCardSocketApiActions: DeepMocked<
		ReturnType<typeof useCardSocketApi>
	>;
	let mockedCardRestApiActions: DeepMocked<ReturnType<typeof useCardRestApi>>;
	let setEditModeId: jest.Mock;

	beforeEach(() => {
		setActivePinia(createPinia());
		setupStores({ envConfigModule: EnvConfigModule });
		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		mockedErrorHandlerCalls = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandlerCalls);

		mockedSocketApiHandler =
			createMock<ReturnType<typeof useSocketConnection>>();
		mockedUseSocketConnection.mockReturnValue(mockedSocketApiHandler);

		mockedCardSocketApiActions =
			createMock<ReturnType<typeof useCardSocketApi>>();
		mockedUseCardSocketApi.mockReturnValue(mockedCardSocketApiActions);

		mockedCardRestApiActions = createMock<ReturnType<typeof useCardRestApi>>();
		mockedUseCardRestApi.mockReturnValue(mockedCardRestApiActions);

		setEditModeId = jest.fn();
		mockedSharedEditMode.mockReturnValue({
			setEditModeId,
			editModeId: ref(undefined),
		});
	});

	const setup = (socketFlag = false) => {
		if (socketFlag) {
			const envs = envsFactory.build({
				FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
			});
			envConfigModule.setEnvs(envs);
		}

		const cardStore = useCardStore();
		cardStore.cards = boardCardFactory.buildList(3);

		return { cardStore };
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("updateCardTitleRequest", () => {
		it("should call socket Api if feature flag is enabled", () => {
			const { cardStore } = setup(true);

			cardStore.updateCardTitleRequest({
				cardId: cardStore.cards[0].id,
				newTitle: "newTitle",
			});

			expect(
				mockedCardSocketApiActions.updateCardTitleRequest
			).toHaveBeenCalledWith({
				cardId: cardStore.cards[0].id,
				newTitle: "newTitle",
			});
		});

		it("should call rest Api if feature flag is enabled", () => {
			const { cardStore } = setup();

			cardStore.updateCardTitleRequest({
				cardId: cardStore.cards[0].id,
				newTitle: "newTitle",
			});

			expect(
				mockedCardRestApiActions.updateCardTitleRequest
			).toHaveBeenCalledWith({
				cardId: cardStore.cards[0].id,
				newTitle: "newTitle",
			});
		});
	});

	describe("updateCardTitleSuccess", () => {
		const NEW_TITLE = "newTitle";
		it("should not update card title when card is undefined", async () => {
			const { cardStore } = setup();

			const cardTitles = cardStore.cards.map((card) => card.title);

			cardStore.updateCardTitleSuccess({
				cardId: "unkownId",
				newTitle: NEW_TITLE,
			});

			expect(cardStore.cards.map((card) => card.title)).toEqual(cardTitles);
		});

		it("should update card title", async () => {
			const { cardStore } = setup();

			cardStore.updateCardTitleSuccess({
				cardId: cardStore.cards[0].id,
				newTitle: NEW_TITLE,
			});

			expect(cardStore.cards[0].title).toEqual(NEW_TITLE);
		});
	});

	describe("updateCardHeightRequest", () => {
		it("should call socket Api if feature flag is enabled", () => {
			const { cardStore } = setup(true);

			cardStore.updateCardHeightRequest({
				cardId: cardStore.cards[0].id,
				newHeight: 100,
			});

			expect(
				mockedCardSocketApiActions.updateCardHeightRequest
			).toHaveBeenCalledWith({
				cardId: cardStore.cards[0].id,
				newHeight: 100,
			});
		});

		it("should call rest Api if feature flag is enabled", () => {
			const { cardStore } = setup();

			cardStore.updateCardHeightRequest({
				cardId: cardStore.cards[0].id,
				newHeight: 100,
			});

			expect(
				mockedCardRestApiActions.updateCardHeightRequest
			).toHaveBeenCalledWith({
				cardId: cardStore.cards[0].id,
				newHeight: 100,
			});
		});
	});

	describe("updateCardHeightSuccess", () => {
		const NEW_HEIGHT = 100;
		it("should not update card height when card is undefined", async () => {
			const { cardStore } = setup();

			const cardHeights = cardStore.cards.map((card) => card.height);

			cardStore.updateCardHeightSuccess({
				cardId: "unkownId",
				newHeight: NEW_HEIGHT,
			});

			expect(cardStore.cards.map((card) => card.height)).toEqual(cardHeights);
		});

		it("should update card height", async () => {
			const { cardStore } = setup();

			cardStore.updateCardHeightSuccess({
				cardId: cardStore.cards[0].id,
				newHeight: NEW_HEIGHT,
			});

			expect(cardStore.cards[0].height).toEqual(NEW_HEIGHT);
		});
	});
});
