import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
import { shallowMount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import {
	useBoardState,
	useBoardPermissions,
	useSharedEditMode,
	useSharedBoardPageInformation,
} from "@data-board";
import { useBoardNotifier } from "@util-board";
import { Board } from "@/types/board/Board";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import BoardVue from "./Board.vue";
import BoardColumnVue from "./BoardColumn.vue";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingI18n } from "@@/tests/test-utils/setup";

jest.mock("@data-board");
const mockedUseBoardState = jest.mocked(useBoardState);
const mockedUseBoardPermissions = jest.mocked(useBoardPermissions);
const mockedUseSharedEditMode = jest.mocked(useSharedEditMode);
const mockedUseSharedBoardPageInformation = jest.mocked(
	useSharedBoardPageInformation
);

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("Board", () => {
	const cards = cardSkeletonResponseFactory.buildList(3);
	const oneColumn = columnResponseFactory.build({ cards });
	const boardWithOneColumn = boardResponseFactory.build({
		columns: [oneColumn],
	});
	const notifierModule = createModuleMocks(NotifierModule);
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardStateCalls: DeepMocked<ReturnType<typeof useBoardState>>;

	const setup = (options?: {
		board?: Board;
		isLoading?: boolean;
		permissions?: Partial<BoardPermissionChecks>;
	}) => {
		const { board, isLoading } = options ?? {};
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
			editModeId: ref(""),
			setEditModeId: jest.fn(),
		});
		mockedUseSharedBoardPageInformation.mockReturnValue({
			createPageInformation: jest.fn(),
			breadcrumbs: ref([]),
			pageTitle: ref("page-title"),
		});

		const boardId = board?.id ?? boardWithOneColumn.id;
		const wrapper = shallowMount(BoardVue, {
			global: {
				plugins: [createTestingI18n()],
			},
			propsData: { boardId },
			provide: {
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			},
		});
		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should call 'useBoardState' composable", () => {
			const { wrapper } = setup();

			expect(mockedUseBoardState).toHaveBeenCalled();
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			expect(wrapper.vm.board).toStrictEqual(boardWithOneColumn);
		});

		it("should be found in the dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(BoardVue).exists()).toBeTruthy();
		});

		it("should fetch board from store and render it", () => {
			const { wrapper } = setup();
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
			setup({ board: boardWithTwoColumns });

			const boardColumnComponents = wrapper.findAllComponents({
				name: "BoardColumn",
			});
			expect(boardColumnComponents.at(0).props("columnCount")).toBe(2);
			expect(boardColumnComponents.at(1).props("columnCount")).toBe(2);
		});

		describe("Info message for teacher", () => {
			afterEach(() => {
				jest.clearAllMocks();
			});

			it("should call the board notifier when the user is teacher", () => {
				setup();
				expect(mockedBoardNotifierCalls.showInfo).toHaveBeenCalled();
			});

			it("should not call the board notifier when the user is not a teacher", async () => {
				defaultPermissions.isTeacher = false;
				setup();
				expect(mockedBoardNotifierCalls.showInfo).not.toHaveBeenCalled();
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

					expect(ghostColumnComponent.vm).not.toBeDefined();
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

				const dndContainer = wrapper.findComponent({ name: "Container" });
				expect(dndContainer.element.outerHTML).toContain(".drag-disabled");
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

		describe("@onCreateColumnWithCard", () => {
			describe("when user is permitted to create a column with card", () => {
				it("should call createColumn method", () => {
					const { wrapper } = setup();
					const ghostColumnComponent = wrapper.findComponent({
						name: "BoardColumnGhost",
					});
					ghostColumnComponent.vm.$emit("create:column-with-card");

					expect(mockedBoardStateCalls.createColumnWithCard).toHaveBeenCalled();
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
					const { wrapper } = setup();
					const containerComponent = wrapper.findComponent({
						name: "Container",
					});
					containerComponent.vm.$emit("drop");

					expect(mockedBoardStateCalls.moveColumn).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a column", () => {
				it("should not call moveColumn method", () => {
					const { wrapper } = setup({
						permissions: { hasMovePermission: false },
					});
					const containerComponent = wrapper.findComponent({
						name: "Container",
					});
					containerComponent.vm.$emit("drop");

					expect(mockedBoardStateCalls.moveColumn).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onMoveColumnLeft", () => {
			describe("when user is permitted to move a column", () => {
				it("should call moveColumn method", () => {
					setup();
					const boardColumnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					boardColumnComponent.vm.$emit("move:column-left");

					expect(mockedBoardStateCalls.moveColumn).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a column", () => {
				it("should not call moveColumn method", () => {
					setup({ permissions: { hasMovePermission: false } });
					const boardColumnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					boardColumnComponent.vm.$emit("move:column-left");

					expect(mockedBoardStateCalls.moveColumn).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onMoveColumnRight", () => {
			describe("when user is permitted to move a column", () => {
				it("should call moveColumn method", () => {
					setup();
					const boardColumnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					boardColumnComponent.vm.$emit("move:column-right");

					expect(mockedBoardStateCalls.moveColumn).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a column", () => {
				it("should not call moveColumn method", () => {
					setup({ permissions: { hasMovePermission: false } });
					const boardColumnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					boardColumnComponent.vm.$emit("move:column-right");

					expect(mockedBoardStateCalls.moveColumn).not.toHaveBeenCalled();
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
	});
});
