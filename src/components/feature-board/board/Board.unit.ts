import NotifierModule from "@/store/notifier";
import { Board } from "@/types/board/Board";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import { ENV_CONFIG_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	boardCardFactory,
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { useBoardNotifier, useSharedLastCreatedElement } from "@util-board";
import { mount } from "@vue/test-utils";
import { Ref, computed, nextTick, ref } from "vue";
import BoardVue from "./Board.vue";
import BoardColumnVue from "./BoardColumn.vue";
import BoardHeaderVue from "./BoardHeader.vue";

import EnvConfigModule from "@/store/env-config";
import { Envs } from "@/store/types/env-config";
import { BoardCard } from "@/types/board/Card";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useBoardState,
	useCardState,
	useEditMode,
	useSharedBoardPageInformation,
	useSharedEditMode,
} from "@data-board";

jest.mock("@data-board");
const mockedUseBoardState = jest.mocked(useBoardState);
const mockedUseBoardPermissions = jest.mocked(useBoardPermissions);
const mockedUseSharedEditMode = jest.mocked(useSharedEditMode);
const mockedUseSharedBoardPageInformation = jest.mocked(
	useSharedBoardPageInformation
);
const mockUseBoardFocusHandler = jest.mocked(useBoardFocusHandler);

jest.mock("@util-board", () => {
	return {
		useBoardNotifier: jest.fn(),
		useSharedLastCreatedElement: jest.fn(),
		extractDataAttribute: jest.fn(() => "column-id"),
	};
});
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);
const mockedUseCardState = jest.mocked(useCardState);

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

const mockUseSharedLastCreatedElement = jest.mocked(
	useSharedLastCreatedElement
);

const envConfigModule: jest.Mocked<EnvConfigModule> = createModuleMocks(
	EnvConfigModule,
	{
		getEnv: {
			FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
			FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: true,
			FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
		} as Envs,
	}
);
const mockedEditMode = jest.mocked(useEditMode);

describe("Board", () => {
	const card = boardCardFactory.build();

	const mockRequiredParams = (options?: {
		board?: Board;
		isLoading?: boolean;
		permissions?: Partial<BoardPermissionChecks>;
	}) => {
		mockedUseCardState.mockReturnValue({
			fetchCard: jest.fn(),
			updateTitle: jest.fn(),
			deleteCard: jest.fn(),
			updateCardHeight: jest.fn(),
			addElement: jest.fn(),
			addTextAfterTitle: jest.fn(),
			moveElementDown: jest.fn(),
			moveElementUp: jest.fn(),
			deleteElement: jest.fn(),
			card: card as unknown as Ref<BoardCard>,
			isLoading: ref(false),
			notifyWithTemplateAndReload: jest.fn(),
		});
		const { board, isLoading = false } = options ?? {};
		document.body.setAttribute("data-app", "true");

		mockedBoardStateCalls = createMock<ReturnType<typeof useBoardState>>();
		mockedBoardStateCalls.board = ref<Board | undefined>(
			board ?? boardWithOneColumn
		);
		mockedBoardStateCalls.isLoading = ref(isLoading ?? false);
		mockedUseBoardState.mockReturnValue(mockedBoardStateCalls);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		mockedUseBoardPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});
		mockedUseSharedEditMode.mockReturnValue({
			editModeId: ref(undefined),
			setEditModeId: jest.fn(),
		});
		mockedUseSharedBoardPageInformation.mockReturnValue({
			createPageInformation: jest.fn(),
			breadcrumbs: ref([]),
			pageTitle: ref("page-title"),
		});

		mockedEditMode.mockReturnValue({
			isEditMode: computed(() => false),
			startEditMode: jest.fn(),
			stopEditMode: jest.fn(),
		});

		mockUseBoardFocusHandler.mockReturnValue({
			isFocusContained: ref(false),
		});

		mockUseSharedLastCreatedElement.mockReturnValue({
			lastCreatedElementId: computed(() => "element-id"),
			resetLastCreatedElementId: jest.fn(),
		});
	};

	const cards = cardSkeletonResponseFactory.buildList(3);
	const oneColumn = columnResponseFactory.build({ cards });
	const boardWithOneColumn = boardResponseFactory.build({
		columns: [oneColumn],
	});

	const twoColumns = columnResponseFactory.buildList(2, { cards });
	const boardWithTwoColumns = boardResponseFactory.build({
		columns: twoColumns,
	});
	const notifierModule = createModuleMocks(NotifierModule);
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardStateCalls: DeepMocked<ReturnType<typeof useBoardState>>;

	const setup = (options?: {
		board?: Board;
		isLoading?: boolean;
		permissions?: Partial<BoardPermissionChecks>;
	}) => {
		mockRequiredParams(options);

		const { board } = options ?? {};
		const boardId = board?.id ?? boardWithOneColumn.id;
		const wrapper = mount(BoardVue, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
			},
			propsData: { boardId },
		});
		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should call 'useBoardState' composable", () => {
			const { wrapper } = setup();

			expect(mockedUseBoardState).toHaveBeenCalled();
			expect(wrapper.vm.board).toStrictEqual(boardWithOneColumn);
		});

		it("should be found in the dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(BoardVue).exists()).toBeTruthy();
		});

		describe("BoardHeader component", () => {
			it("should fetch board from store and render board header", () => {
				const { wrapper } = setup();
				expect(wrapper.findComponent(BoardHeaderVue).exists()).toBeTruthy();
			});

			it("should fetch board from store and render board header with title", () => {
				const { wrapper } = setup();
				const boardHeaderComponent = wrapper.findComponent(BoardHeaderVue);
				expect(boardHeaderComponent.props("title")).toBe(
					boardWithOneColumn.title
				);
			});
		});

		describe("BoardColumn component", () => {
			it("should fetch board from store and render it", async () => {
				const { wrapper } = setup({ isLoading: false });

				expect(wrapper.findComponent(BoardColumnVue).exists()).toBeTruthy();
			});

			it("should fetch board from store and render one column", () => {
				const { wrapper } = setup();
				expect(wrapper.findAllComponents(BoardColumnVue)).toHaveLength(1);
			});

			it("should fetch board from store and render two columns", () => {
				const twoColumns = columnResponseFactory.buildList(2, { cards });
				const boardWithTwoColumns = boardResponseFactory.build({
					columns: twoColumns,
				});
				const { wrapper } = setup({ board: boardWithTwoColumns });

				expect(wrapper.findAllComponents(BoardColumnVue)).toHaveLength(2);
			});

			it("should propagate columnCount to BoardColumn components", () => {
				const twoColumns = columnResponseFactory.buildList(2, { cards });
				const boardWithTwoColumns = boardResponseFactory.build({
					columns: twoColumns,
				});
				const { wrapper } = setup({ board: boardWithTwoColumns });

				const boardColumnComponents = wrapper.findAllComponents({
					name: "BoardColumn",
				});
				expect(boardColumnComponents[0].props("columnCount")).toBe(2);
				expect(boardColumnComponents[1].props("columnCount")).toBe(2);
			});
		});

		describe("Info message for teacher", () => {
			afterEach(() => {
				jest.clearAllMocks();
			});

			it("should call the board notifier when the user is teacher", async () => {
				jest.useFakeTimers();

				setup();
				jest.runAllTimers();

				expect(mockedBoardNotifierCalls.showCustomNotifier).toHaveBeenCalled();
			});

			it("should not call the board notifier when the user is not a teacher", async () => {
				defaultPermissions.isTeacher = false;
				setup();
				expect(
					mockedBoardNotifierCalls.showCustomNotifier
				).not.toHaveBeenCalled();
			});
		});

		describe("BoardColumnGhost component", () => {
			describe("when user has create column permission", () => {
				it("should not be rendered on DOM", () => {
					const { wrapper } = setup();
					const ghostColumnComponent = wrapper.findComponent({
						name: "BoardColumnGhost",
					});

					expect(ghostColumnComponent.vm).toBeDefined();
				});
			});

			describe("when user doesn't have create column permission", () => {
				it("should not be rendered on DOM", () => {
					const { wrapper } = setup({
						permissions: { hasCreateColumnPermission: false },
					});
					const ghostColumnComponent = wrapper.findComponent({
						name: "BoardColumnGhost",
					});

					expect(ghostColumnComponent.exists()).toBe(false);
				});
			});
		});
	});

	describe("when component is unMounted", () => {
		it("should reset the notifier message", () => {
			const { wrapper } = setup();
			wrapper.unmount();

			expect(mockedBoardNotifierCalls.resetNotifier).toHaveBeenCalled();
		});
	});

	describe("user permissions", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		describe("when user is not permitted to move", () => {
			it("should set drag-disabled", () => {
				const { wrapper } = setup({
					permissions: { hasMovePermission: false },
				});

				const dndContainer = wrapper.findComponent({ name: "Sortable" });
				expect(dndContainer.vm.options.disabled).toBe(true);
			});
		});

		describe("@onCreateCard", () => {
			describe("when user is permitted to create card", () => {
				it("should call the createCard method", () => {
					const { wrapper } = setup();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("create:card");

					expect(mockedBoardStateCalls.createCard).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to create card", () => {
				it("should not call the createCard method", () => {
					const { wrapper } = setup({
						permissions: { hasCreateCardPermission: false },
					});
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("create:card");

					expect(mockedBoardStateCalls.createCard).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onCreateColumn", () => {
			describe("when user is permitted to create a column", () => {
				it("should call createColumn method", () => {
					const { wrapper } = setup();
					const ghostColumnComponent = wrapper.findComponent({
						name: "BoardColumnGhost",
					});
					ghostColumnComponent.vm.$emit("create:column");

					expect(mockedBoardStateCalls.createColumn).toHaveBeenCalled();
				});
			});
		});

		describe("@onDeleteCard", () => {
			describe("when user is permitted to delete a card", () => {
				it("should call deleteCard method", () => {
					const { wrapper } = setup();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("delete:card");

					expect(mockedBoardStateCalls.deleteCard).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to delete a card", () => {
				it("should not call deleteCard method", () => {
					const { wrapper } = setup({
						permissions: { hasCreateCardPermission: false },
					});
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("delete:card");

					expect(mockedBoardStateCalls.deleteCard).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onDeleteColumn", () => {
			describe("when user is permitted to delete a column", () => {
				it("should call deleteColumn method", () => {
					const { wrapper } = setup();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("delete:column");

					expect(mockedBoardStateCalls.deleteColumn).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to delete a column", () => {
				it("should not call deleteColumn method", () => {
					const { wrapper } = setup({
						permissions: { hasDeletePermission: false },
					});
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("delete:column");

					expect(mockedBoardStateCalls.deleteColumn).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onDropColumn", () => {
			describe("when user is permitted to move a column", () => {
				it("should call moveColumn method", () => {
					const { wrapper } = setup({ board: boardWithTwoColumns });
					const containerComponent = wrapper.findAllComponents({
						name: "Sortable",
					});

					const payload = {
						item: document.createElement("div"),
						newIndex: 1,
						oldIndex: 0,
					};

					containerComponent[0].vm.$emit("end", payload);

					expect(mockedBoardStateCalls.moveColumn).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a column", () => {
				it("should not call moveColumn method", () => {
					const { wrapper } = setup({
						permissions: { hasMovePermission: false },
						board: boardWithTwoColumns,
					});
					const containerComponent = wrapper.findAllComponents({
						name: "Sortable",
					});
					containerComponent[0].vm.$emit("move");

					expect(mockedBoardStateCalls.moveColumn).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onMoveColumnLeft", () => {
			describe("when user is permitted to move a column", () => {
				it("should call moveColumn method", () => {
					const { wrapper } = setup({ board: boardWithTwoColumns });
					const boardColumnComponent = wrapper.findAllComponents({
						name: "BoardColumn",
					});
					boardColumnComponent[1].vm.$emit("move:column-left");

					expect(mockedBoardStateCalls.moveColumn).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a column", () => {
				it("should not call moveColumn method", () => {
					const { wrapper } = setup({
						permissions: { hasMovePermission: false },
						board: boardWithTwoColumns,
					});
					const boardColumnComponent = wrapper.findAllComponents({
						name: "BoardColumn",
					});
					boardColumnComponent[1].vm.$emit("move:column-left");

					expect(mockedBoardStateCalls.moveColumn).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onMoveColumnRight", () => {
			describe("when user is permitted to move a column", () => {
				it("should call moveColumn method", () => {
					const { wrapper } = setup({ board: boardWithTwoColumns });
					const boardColumnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					boardColumnComponent.vm.$emit("move:column-right");

					expect(mockedBoardStateCalls.moveColumn).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a column", () => {
				it("should not call moveColumn method", () => {
					const { wrapper } = setup({
						permissions: { hasMovePermission: false },
						board: boardWithTwoColumns,
					});
					const boardColumnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					boardColumnComponent.vm.$emit("move:column-right");

					expect(mockedBoardStateCalls.moveColumn).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onUpdateBoardTitle", () => {
			describe("when user is permitted to edit", () => {
				it("should call updateBoardTitle method", () => {
					const { wrapper } = setup();
					const headearComponent = wrapper.findComponent({
						name: "BoardHeader",
					});
					headearComponent.vm.$emit("update:title");

					expect(mockedBoardStateCalls.updateBoardTitle).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to edit", () => {
				it("should not call updateBoardTitle method", () => {
					const { wrapper } = setup({
						permissions: { hasEditPermission: false },
					});
					const headearComponent = wrapper.findComponent({
						name: "BoardHeader",
					});
					headearComponent.vm.$emit("update:title");

					expect(mockedBoardStateCalls.updateBoardTitle).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onUpdateCardPosition", () => {
			describe("when user is permitted to move a card", () => {
				it("should call moveCardMock method", () => {
					const { wrapper } = setup();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("update:card-position");

					expect(mockedBoardStateCalls.moveCard).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a card", () => {
				it("should not call moveCardMock method", () => {
					const { wrapper } = setup({
						permissions: { hasMovePermission: false },
					});
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("update:card-position");

					expect(mockedBoardStateCalls.moveCard).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onUpdateColumnTitle", () => {
			describe("when user is permitted to edit", () => {
				it("should call updateColumnTitle method", () => {
					const { wrapper } = setup();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("update:column-title");

					expect(mockedBoardStateCalls.updateColumnTitle).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to edit", () => {
				it("should not call updateColumnTitle method", () => {
					const { wrapper } = setup({
						permissions: { hasEditPermission: false },
					});
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("update:column-title");

					expect(
						mockedBoardStateCalls.updateColumnTitle
					).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onReloadBoard", () => {
			it("should reload the board", async () => {
				const { wrapper } = setup();

				const boardColumnComponents = wrapper.findAllComponents({
					name: "BoardColumn",
				});
				boardColumnComponents.at(0)?.vm.$emit("reload:board");
				await nextTick();

				expect(mockedBoardStateCalls.reloadBoard).toHaveBeenCalled();
			});
		});

		describe("@onUpdateBoardVisibility", () => {
			it("should update board visibility", async () => {
				const { wrapper } = setup();

				const boardHeader = wrapper.findComponent({
					name: "BoardHeader",
				});
				boardHeader.vm.$emit("update:visibility");
				await nextTick();

				expect(mockedBoardStateCalls.updateBoardVisibility).toHaveBeenCalled();
			});
		});
	});
});
