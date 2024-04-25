import NotifierModule from "@/store/notifier";
import { Board } from "@/types/board/Board";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import {
	COPY_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	ROOM_MODULE_KEY,
	SHARE_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	boardCardFactory,
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
	envsFactory,
} from "@@/tests/test-utils/factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier, useSharedLastCreatedElement } from "@util-board";
import { mount } from "@vue/test-utils";
import { computed, nextTick, Ref, ref } from "vue";
import BoardVue from "./Board.vue";
import BoardColumnVue from "./BoardColumn.vue";
import BoardHeaderVue from "./BoardHeader.vue";

import CopyResultModal from "@/components/copy-result-modal/CopyResultModal.vue";
import { useCopy } from "@/composables/copy";
import {
	ConfigResponse,
	CopyApiResponse,
	ShareTokenBodyParamsParentTypeEnum,
} from "@/serverApi/v3";
import CopyModule from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import LoadingStateModule from "@/store/loading-state";
import RoomModule from "@/store/room";
import ShareModule from "@/store/share";
import { BoardCard } from "@/types/board/Card";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useBoardStore,
	useCardState,
	useEditMode,
	useSharedBoardPageInformation,
	useSharedEditMode,
} from "@data-board";
import { Router, useRouter } from "vue-router";
import { createTestingPinia } from "@pinia/testing";
import { set } from "lodash";

jest.mock("@data-board");
const mockeduseBoardStore = jest.mocked(useBoardStore);
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

jest.mock("@/composables/copy");
const mockUseCopy = jest.mocked(useCopy);

const mockedEditMode = jest.mocked(useEditMode);

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;

describe("Board", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

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
			isLoading: ref(options?.isLoading ?? false),
			notifyWithTemplateAndReload: jest.fn(),
		});
		document.body.setAttribute("data-app", "true");

		mockedBoardStateCalls = createMock<ReturnType<typeof useBoardStore>>();

		mockedBoardStateCalls.board = ref<Board | undefined>(options?.board).value;

		mockedBoardStateCalls.isLoading = ref(false).value;
		mockeduseBoardStore.mockReturnValue(mockedBoardStateCalls);

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

		mockedCopyCalls = createMock<ReturnType<typeof useCopy>>();
		mockUseCopy.mockReturnValue(mockedCopyCalls);

		router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
	};

	const mockEnvConfigModule = (envs: Partial<ConfigResponse> | undefined) => {
		const envsMock = envsFactory.build({
			FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
			FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: true,
			FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
			FEATURE_COLUMN_BOARD_SHARE: true,
			...envs,
		});
		const envConfigModule: jest.Mocked<EnvConfigModule> = createModuleMocks(
			EnvConfigModule,
			{
				getEnv: envsMock,
			}
		);

		return envConfigModule;
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
	let mockedBoardStateCalls: DeepMocked<ReturnType<typeof useBoardStore>>;
	let mockedCopyCalls: DeepMocked<ReturnType<typeof useCopy>>;

	let router: DeepMocked<Router>;

	const copyModule = createModuleMocks(CopyModule, {
		getIsResultModalOpen: false,
		getCopyResult: createMock<CopyApiResponse>({ id: "42" }),
	});
	const loadingStateModule = createModuleMocks(LoadingStateModule);

	const shareModule = createModuleMocks(ShareModule);

	const roomModule = createModuleMocks(RoomModule, {
		getRoomId: "room1",
	});

	const setup = (options?: {
		board?: Board;
		isLoading?: boolean;
		permissions?: Partial<BoardPermissionChecks>;
		envs?: Partial<ConfigResponse>;
	}) => {
		mockRequiredParams(options);
		const envConfigModule = mockEnvConfigModule(options?.envs);

		const wrapper = mount(BoardVue, {
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							boardStore: {
								board: options?.board,
								isLoading: false,
								setBoard: jest.fn(),
							},
						},
					}),
					createTestingI18n(),
					createTestingVuetify(),
				],
				components: {
					BoardColumnVue,
				},
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					[COPY_MODULE_KEY.valueOf()]: copyModule,
					loadingStateModule,
					[SHARE_MODULE_KEY.valueOf()]: shareModule,
					[ROOM_MODULE_KEY.valueOf()]: roomModule,
				},
			},
			propsData: { boardId: options?.board?.id ?? boardWithOneColumn.id },
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should call 'useBoardState' composable", () => {
			const { wrapper } = setup({ board: boardWithOneColumn });

			expect(mockeduseBoardStore).toHaveBeenCalled();
			expect(mockedBoardStateCalls.board).toBeDefined();
			expect(wrapper).toBeDefined();

			expect(wrapper.vm.board).toStrictEqual(boardWithOneColumn);
		});

		it("should be found in the dom", () => {
			const { wrapper } = setup({ board: boardWithOneColumn });
			expect(wrapper.findComponent(BoardVue).exists()).toBeTruthy();
		});

		describe("BoardHeader component", () => {
			it("should fetch board from store and render board header", () => {
				const { wrapper } = setup({ board: boardWithOneColumn });
				expect(wrapper.findComponent(BoardHeaderVue).exists()).toBeTruthy();
			});

			it("should fetch board from store and render board header with title", async () => {
				const { wrapper } = setup({ board: boardWithOneColumn });
				const boardHeaderComponent = wrapper.findComponent(BoardHeaderVue);
				expect(boardHeaderComponent.props("title")).toBe(
					boardWithOneColumn.title
				);
			});
		});

		describe("when component is unMounted", () => {
			it("should set board to undefined when component is unmounted", async () => {
				const { wrapper } = setup({ board: boardWithOneColumn });
				wrapper.unmount();
				await nextTick();
				expect(mockedBoardStateCalls.setBoard).toHaveBeenCalledWith(undefined);
			});
		});

		describe("BoardColumn component", () => {
			it("should fetch board from store and render it", async () => {
				const { wrapper } = setup({ board: boardWithOneColumn });

				expect(wrapper.findComponent(BoardColumnVue).exists()).toBeTruthy();
			});

			it("should fetch board from store and render one column", () => {
				const { wrapper } = setup({ board: boardWithOneColumn });
				expect(wrapper.findAllComponents(BoardColumnVue)).toHaveLength(1);
			});

			it("should fetch board from store and render two columns", async () => {
				const cards = cardSkeletonResponseFactory.buildList(3);
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

				setup({ board: boardWithOneColumn });
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
					const { wrapper } = setup({ board: boardWithOneColumn });
					const ghostColumnComponent = wrapper.findComponent({
						name: "BoardColumnGhost",
					});

					expect(ghostColumnComponent.vm).toBeDefined();
				});
			});

			describe("when user doesn't have create column permission", () => {
				it("should not be rendered on DOM", () => {
					const { wrapper } = setup({
						board: boardWithOneColumn,
						permissions: { hasCreateColumnPermission: false },
					});
					const ghostColumnComponent = wrapper.findComponent({
						name: "BoardColumnGhost",
					});

					expect(ghostColumnComponent.exists()).toBe(false);
				});
			});
		});

		describe("CopyResultModal", () => {
			it("should have a result modal component", () => {
				const { wrapper } = setup({ board: boardWithOneColumn });
				expect(wrapper.findComponent(CopyResultModal).exists()).toBe(true);
			});
		});
	});

	describe("user permissions", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		describe("when user is not permitted to move", () => {
			it("should set drag-disabled", () => {
				const { wrapper } = setup({
					board: boardWithOneColumn,
					permissions: { hasMovePermission: false },
				});

				const dndContainer = wrapper.findComponent({ name: "Sortable" });
				expect(dndContainer.vm.options.disabled).toBe(true);
			});
		});

		describe("@onCreateCard", () => {
			describe("when user is permitted to create card", () => {
				it("should call the createCard method", () => {
					const { wrapper } = setup({ board: boardWithOneColumn });
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					mockedBoardStateCalls.dispatch.mockClear();
					columnComponent.vm.$emit("create:card");

					expect(mockedBoardStateCalls.dispatch).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to create card", () => {
				it("should not call the createCard method", () => {
					const { wrapper } = setup({
						board: boardWithOneColumn,
						permissions: { hasCreateCardPermission: false },
					});
					mockedBoardStateCalls.dispatch.mockClear();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});

					columnComponent.vm.$emit("create:card");

					expect(mockedBoardStateCalls.dispatch).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onCreateColumn", () => {
			describe("when user is permitted to create a column", () => {
				it("should call createColumn method", () => {
					const { wrapper } = setup({
						board: boardWithOneColumn,
						permissions: { hasCreateColumnPermission: true },
					});
					mockedBoardStateCalls.dispatch.mockClear();

					const ghostColumnComponent = wrapper.findComponent({
						name: "BoardColumnGhost",
					});
					ghostColumnComponent.vm.$emit("create:column");

					expect(mockedBoardStateCalls.dispatch).toHaveBeenCalled();
				});
			});
		});

		describe("@onDeleteCard", () => {
			describe("when user is permitted to delete a card", () => {
				it("should call deleteCard method", () => {
					const { wrapper } = setup({ board: boardWithOneColumn });
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					mockedBoardStateCalls.dispatch.mockClear();

					columnComponent.vm.$emit("delete:card");

					expect(mockedBoardStateCalls.dispatch).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to delete a card", () => {
				it("should not call deleteCard method", () => {
					const { wrapper } = setup({
						board: boardWithOneColumn,
						permissions: { hasCreateCardPermission: false },
					});
					mockedBoardStateCalls.dispatch.mockClear();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("delete:card");

					expect(mockedBoardStateCalls.dispatch).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onDeleteColumn", () => {
			describe("when user is permitted to delete a column", () => {
				it("should call deleteColumn method", () => {
					const { wrapper } = setup({ board: boardWithOneColumn });
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					mockedBoardStateCalls.dispatch.mockClear();
					columnComponent.vm.$emit("delete:column");

					expect(mockedBoardStateCalls.dispatch).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to delete a column", () => {
				it("should not call deleteColumn method", () => {
					const { wrapper } = setup({
						board: boardWithOneColumn,
						permissions: { hasDeletePermission: false },
					});
					mockedBoardStateCalls.dispatch.mockClear();

					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("delete:column");

					expect(mockedBoardStateCalls.dispatch).not.toHaveBeenCalled();
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
					mockedBoardStateCalls.dispatch.mockClear();

					const payload = {
						item: document.createElement("div"),
						newIndex: 1,
						oldIndex: 0,
					};

					containerComponent[0].vm.$emit("end", payload);

					expect(mockedBoardStateCalls.dispatch).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a column", () => {
				it("should not call moveColumn method", () => {
					const { wrapper } = setup({
						permissions: { hasMovePermission: false },
						board: boardWithTwoColumns,
					});
					mockedBoardStateCalls.dispatch.mockClear();
					const containerComponent = wrapper.findAllComponents({
						name: "Sortable",
					});
					containerComponent[0].vm.$emit("move");

					expect(mockedBoardStateCalls.dispatch).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onMoveColumnBackward", () => {
			describe("when user is permitted to move a column", () => {
				it("should call moveColumn method", () => {
					const { wrapper } = setup({ board: boardWithTwoColumns });
					const boardColumnComponent = wrapper.findAllComponents({
						name: "BoardColumn",
					});
					mockedBoardStateCalls.dispatch.mockClear();
					boardColumnComponent[1].vm.$emit("move:column-left");

					expect(mockedBoardStateCalls.dispatch).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a column", () => {
				it("should not call moveColumn method", () => {
					const { wrapper } = setup({
						permissions: { hasMovePermission: false },
						board: boardWithTwoColumns,
					});
					mockedBoardStateCalls.dispatch.mockClear();
					const boardColumnComponent = wrapper.findAllComponents({
						name: "BoardColumn",
					});
					boardColumnComponent[1].vm.$emit("move:column-up");

					expect(mockedBoardStateCalls.dispatch).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onMoveColumnForward", () => {
			describe("when user is permitted to move a column", () => {
				it("should call moveColumn method", () => {
					const { wrapper } = setup({ board: boardWithTwoColumns });
					const boardColumnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					mockedBoardStateCalls.dispatch.mockClear();
					boardColumnComponent.vm.$emit("move:column-right");

					expect(mockedBoardStateCalls.dispatch).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a column", () => {
				it("should not call moveColumn method", () => {
					const { wrapper } = setup({
						permissions: { hasMovePermission: false },
						board: boardWithTwoColumns,
					});
					mockedBoardStateCalls.dispatch.mockClear();
					const boardColumnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					boardColumnComponent.vm.$emit("move:column-down");

					expect(mockedBoardStateCalls.dispatch).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onUpdateBoardTitle", () => {
			describe("when user is permitted to edit", () => {
				it("should call updateBoardTitle method", () => {
					const { wrapper } = setup({ board: boardWithOneColumn });
					const headearComponent = wrapper.findComponent({
						name: "BoardHeader",
					});
					mockedBoardStateCalls.dispatch.mockClear();
					headearComponent.vm.$emit("update:title");

					expect(mockedBoardStateCalls.dispatch).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to edit", () => {
				it("should not call updateBoardTitle method", () => {
					const { wrapper } = setup({
						permissions: { hasEditPermission: false },
						board: boardWithOneColumn,
					});
					mockedBoardStateCalls.dispatch.mockClear();

					const headearComponent = wrapper.findComponent({
						name: "BoardHeader",
					});
					headearComponent.vm.$emit("update:title");

					expect(mockedBoardStateCalls.dispatch).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onUpdateCardPosition", () => {
			describe("when user is permitted to move a card", () => {
				it("should call moveCardMock method", () => {
					const { wrapper } = setup({ board: boardWithOneColumn });
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					mockedBoardStateCalls.dispatch.mockClear();
					columnComponent.vm.$emit("update:card-position");

					expect(mockedBoardStateCalls.dispatch).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a card", () => {
				it("should not call moveCardMock method", () => {
					const { wrapper } = setup({
						permissions: { hasMovePermission: false },
						board: boardWithOneColumn,
					});
					mockedBoardStateCalls.dispatch.mockClear();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("update:card-position");

					expect(mockedBoardStateCalls.dispatch).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onUpdateColumnTitle", () => {
			describe("when user is permitted to edit", () => {
				it("should call updateColumnTitle method", () => {
					const { wrapper } = setup({ board: boardWithOneColumn });
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					mockedBoardStateCalls.dispatch.mockClear();
					columnComponent.vm.$emit("update:column-title");

					expect(mockedBoardStateCalls.dispatch).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to edit", () => {
				it("should not call updateColumnTitle method", () => {
					const { wrapper } = setup({
						permissions: { hasEditPermission: false },
						board: boardWithOneColumn,
					});
					mockedBoardStateCalls.dispatch.mockClear();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("update:column-title");

					expect(mockedBoardStateCalls.dispatch).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onReloadBoard", () => {
			it("should reload the board", async () => {
				const { wrapper } = setup({ board: boardWithOneColumn });
				mockedBoardStateCalls.dispatch.mockClear();
				const boardColumnComponents = wrapper.findAllComponents({
					name: "BoardColumn",
				});
				await boardColumnComponents.at(0)?.vm.$emit("reload:board");

				expect(mockedBoardStateCalls.dispatch).toHaveBeenCalled();
			});
		});

		describe("@onUpdateBoardVisibility", () => {
			it("should update board visibility", async () => {
				const { wrapper } = setup({ board: boardWithOneColumn });
				mockedBoardStateCalls.dispatch.mockClear();
				const boardHeader = wrapper.findComponent({
					name: "BoardHeader",
				});
				await boardHeader.vm.$emit("update:visibility");

				expect(mockedBoardStateCalls.dispatch).toHaveBeenCalled();
			});
		});

		describe("@copy:board", () => {
			it("should call the copy function", async () => {
				const { wrapper } = setup({ board: boardWithOneColumn });

				const boardHeader = wrapper.findComponent({
					name: "BoardHeader",
				});
				await boardHeader.vm.$emit("copy:board");

				expect(mockedCopyCalls.copy).toHaveBeenCalled();
			});

			it("should redirect to the board copy", async () => {
				const { wrapper } = setup({ board: boardWithOneColumn });

				const boardHeader = wrapper.findComponent({
					name: "BoardHeader",
				});
				await boardHeader.vm.$emit("copy:board");

				expect(router.push).toHaveBeenCalledWith({
					name: "rooms-board",
					params: { id: copyModule.getCopyResult?.id },
				});
			});
		});

		describe("@share:board", () => {
			describe("when feature is enabled", () => {
				it("should start the share flow", async () => {
					const { wrapper } = setup({ board: boardWithOneColumn });

					const boardHeader = wrapper.findComponent({
						name: "BoardHeader",
					});
					await boardHeader.vm.$emit("share:board");

					expect(shareModule.startShareFlow).toHaveBeenCalledWith({
						id: boardWithOneColumn.id,
						type: ShareTokenBodyParamsParentTypeEnum.ColumnBoard,
					});
				});
			});

			describe("when feature is disabled", () => {
				it("should do nothing", async () => {
					const { wrapper } = setup({
						envs: { FEATURE_COLUMN_BOARD_SHARE: false },
						board: boardWithOneColumn,
					});

					const boardHeader = wrapper.findComponent({
						name: "BoardHeader",
					});
					await boardHeader.vm.$emit("share:board");

					expect(shareModule.startShareFlow).not.toHaveBeenCalled();
				});
			});
		});

		describe("when the 'delete' menu button is clicked", () => {
			const openDeleteBoardDialogMock = jest.fn();

			it("should call openDeleteBoardDialog method when board should be deleted", async () => {
				const { wrapper } = setup({
					permissions: { hasDeletePermission: true },
					board: boardWithOneColumn,
				});

				wrapper.vm.openDeleteBoardDialog = openDeleteBoardDialogMock;

				const columnComponent = wrapper.findComponent({
					name: "BoardHeader",
				});
				columnComponent.vm.$emit("delete:board");

				expect(openDeleteBoardDialogMock).toHaveBeenCalled();
				expect(openDeleteBoardDialogMock).toBeCalledWith("board1");
			});

			it("should call deleteBoard method to delete board and redirect to rooms board page", async () => {
				const { wrapper } = setup({
					permissions: { hasDeletePermission: true },
					board: boardWithOneColumn,
				});

				const columnComponent = wrapper.findComponent({
					name: "BoardHeader",
				});
				await columnComponent.vm.$emit("delete:board");

				expect(roomModule.deleteBoard).toBeCalledWith("board1");

				expect(router.push).toHaveBeenCalledTimes(1);
				expect(router.push).toHaveBeenCalledWith({
					path: "/rooms/" + roomModule.getRoomId,
				});
			});
		});
	});
});
