import { useSetFocusPrevious } from "./FocusPrevious.composable";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import {
	boardResponseFactory,
	cardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
	envsFactory,
	fileElementResponseFactory,
	richTextElementResponseFactory,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import { useBoardStore, useCardStore, useSocketConnection } from "@data-board";
import {
	COPY_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import CopyModule from "@/store/copy";
import NotifierModule from "@/store/notifier";
import LoadingStateModule from "@/store/loading-state";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { createModuleMocks } from "@/utils/mock-store-module";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { useBoardNotifier, useSharedLastCreatedElement } from "@util-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { computed } from "vue";
import { envConfigModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import { CardResponse } from "@/serverApi/v3";

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({
			t: jest.fn().mockImplementation((key: string) => key),
		}),
	};
});

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);
const mockUseSharedLastCreatedElement = jest.mocked(
	useSharedLastCreatedElement
);

jest.mock("@data-board/socket/socket");
const mockedUseSocketConnection = jest.mocked(useSocketConnection);

type ParamType = {
	id: string;
	parentId: string;
	level: "board" | "column" | "card" | "element";
};

const cards = cardSkeletonResponseFactory.buildList(3);
const firstColumn = columnResponseFactory.build({ cards });
const secondColumn = columnResponseFactory.build({});
const testBoard = boardResponseFactory.build({
	columns: [firstColumn, secondColumn],
});

const card = cardResponseFactory.build();
const elements = fileElementResponseFactory.buildList(3);
const richTextElement = richTextElementResponseFactory.build();
card.elements = [richTextElement, ...elements];

const mockQuerySelector = jest.fn();
Object.defineProperty(global.document, "querySelector", {
	value: mockQuerySelector,
});

describe("useSetFocusPrevios", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedSocketConnectionHandler: DeepMocked<
		ReturnType<typeof useSocketConnection>
	>;
	afterEach(() => {
		jest.clearAllMocks();
	});
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);
		mockUseSharedLastCreatedElement.mockReturnValue({
			lastCreatedElementId: computed(() => "element-id"),
			resetLastCreatedElementId: jest.fn(),
		});
		mockedSocketConnectionHandler =
			createMock<ReturnType<typeof useSocketConnection>>();
		mockedUseSocketConnection.mockReturnValue(mockedSocketConnectionHandler);
		envsFactory.build({
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
		});
	});

	const setup = (payload: ParamType) => {
		setupStores({ envConfigModule: EnvConfigModule });
		const envs = envsFactory.build({
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
		});
		envConfigModule.setEnvs(envs);
		const boardStore = mockedPiniaStoreTyping(useBoardStore);
		const cardStore = mockedPiniaStoreTyping(useCardStore);
		boardStore.board = testBoard;
		cardStore.cards = { [card.id]: card } as Record<string, CardResponse>;
		const copyModuleMock = createModuleMocks(CopyModule);
		const notifierModuleMock = createModuleMocks(NotifierModule);
		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);

		mountComposable(() => useSetFocusPrevious(payload), {
			global: {
				plugins: [createTestingI18n()],
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
					loadingStateModule: loadingStateModuleMock,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: {
						getEnv: { FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true },
					},
				},
			},
		});
	};

	describe("when level is element", () => {
		afterEach(() => {
			jest.clearAllMocks();
		});
		it("should call querySelector with parent id", async () => {
			const payload: ParamType = {
				id: "fileElementResponse1",
				parentId: "card1",
				level: "element",
			};

			setup(payload);
			expect(mockQuerySelector.mock.lastCall[0]).toContain(payload.parentId);
		});

		it("should call querySelector with previous element id", async () => {
			const payload: ParamType = {
				id: "fileElementResponse2",
				parentId: "card1",
				level: "element",
			};

			setup(payload);
			expect(mockQuerySelector.mock.lastCall[0]).toContain(
				"fileElementResponse1"
			);
		});
	});

	describe("when level is card", () => {
		afterEach(() => {
			jest.clearAllMocks();
		});
		it("should call querySelector with parent id", async () => {
			const payload: ParamType = {
				id: "card1",
				parentId: "column1",
				level: "card",
			};

			setup(payload);
			expect(mockQuerySelector.mock.lastCall[0]).toContain(payload.parentId);
		});

		it("should call querySelector with previous card id", async () => {
			const payload: ParamType = {
				id: "card2",
				parentId: "column1",
				level: "card",
			};

			setup(payload);
			expect(mockQuerySelector.mock.lastCall[0]).toContain("card1");
		});
	});

	describe("when level is column", () => {
		afterEach(() => {
			jest.clearAllMocks();
		});
		it("should call querySelector with parent id", async () => {
			const payload: ParamType = {
				id: "column1",
				parentId: "board1",
				level: "column",
			};

			setup(payload);
			expect(mockQuerySelector.mock.lastCall[0]).toContain(payload.parentId);
		});

		it("should call querySelector with previous column id", async () => {
			const payload: ParamType = {
				id: "column2",
				parentId: "board1",
				level: "column",
			};

			setup(payload);
			expect(mockQuerySelector.mock.lastCall[0]).toContain("column1");
		});
	});
});
