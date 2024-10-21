import CopyResultModal from "@/components/copy-result-modal/CopyResultModal.vue";
import { useCopy } from "@/composables/copy";
import {
	ConfigResponse,
	CopyApiResponse,
	CopyApiResponseTypeEnum,
	ShareTokenBodyParamsParentTypeEnum,
} from "@/serverApi/v3";
import { envConfigModule, applicationErrorModule } from "@/store";
import ApplicationErrorModule from "@/store/application-error";
import CopyModule from "@/store/copy";
import CourseRoomDetailsModule from "@/store/course-room-details";
import EnvConfigModule from "@/store/env-config";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import ShareModule from "@/store/share";
import { Board } from "@/types/board/Board";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import {
	COPY_MODULE_KEY,
	COURSE_ROOM_DETAILS_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	SHARE_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
	envsFactory,
} from "@@/tests/test-utils/factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import {
	useBoardInactivity,
	useBoardPermissions,
	useBoardStore,
	useCardStore,
	useSharedBoardPageInformation,
} from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import {
	extractDataAttribute,
	useBoardNotifier,
	useCourseBoardEditMode,
	useSharedEditMode,
	useSharedLastCreatedElement,
} from "@util-board";
import { mount } from "@vue/test-utils";
import { computed, nextTick, ref } from "vue";
import { Router, useRoute, useRouter } from "vue-router";
import BoardVue from "./Board.vue";
import BoardColumnVue from "./BoardColumn.vue";
import BoardHeaderVue from "./BoardHeader.vue";
import { useApplicationError } from "@/composables/application-error.composable";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { createApplicationError } from "@/utils/create-application-error.factory";

vi.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);

vi.mock("@util-board/LastCreatedElement.composable");
const mockUseSharedLastCreatedElement = vi.mocked(useSharedLastCreatedElement);

vi.mock("@util-board/extractDataAttribute.util");
const mockExtractDataAttribute = vi.mocked(extractDataAttribute);

vi.mock("@util-board/editMode.composable");
const mockedUseSharedEditMode = vi.mocked(useSharedEditMode);
const mockedUseEditMode = vi.mocked(useCourseBoardEditMode);

vi.mock("@data-board/BoardPageInformation.composable");
const mockedUseSharedBoardPageInformation = vi.mocked(
	useSharedBoardPageInformation
);

vi.mock("@data-board/BoardPermissions.composable");
const mockedUseBoardPermissions = vi.mocked(useBoardPermissions);

vi.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

vi.mock("@/composables/copy");
const mockUseCopy = vi.mocked(useCopy);

vi.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;
const useRouteMock = <jest.Mock>useRoute;

vi.mock("@data-board/boardInactivity.composable");
const mockUseBoardInactivity = <jest.Mock>useBoardInactivity;

vi.mock("@/composables/application-error.composable");
const mockedCreateApplicationError = vi.mocked(useApplicationError);

describe("Board", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedCopyCalls: DeepMocked<ReturnType<typeof useCopy>>;
	let mockedBoardPermissionsHandler: DeepMocked<
		ReturnType<typeof useBoardPermissions>
	>;
	let router: DeepMocked<Router>;
	let mockedBoardPermissions: BoardPermissionChecks;
	let mockedUsePageInactivity: DeepMocked<
		ReturnType<typeof useBoardInactivity>
	>;
	let route: DeepMocked<ReturnType<typeof useRoute>>;
	let mockedCreateApplicationErrorCalls: ReturnType<typeof useApplicationError>;
	const setErrorMock = vi.fn();

	beforeEach(() => {
		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		mockedCopyCalls = createMock<ReturnType<typeof useCopy>>();
		mockUseCopy.mockReturnValue(mockedCopyCalls);

		mockedBoardPermissionsHandler =
			createMock<ReturnType<typeof useBoardPermissions>>();
		mockedUseBoardPermissions.mockReturnValue(mockedBoardPermissionsHandler);

		mockedCreateApplicationErrorCalls =
			createMock<ReturnType<typeof useApplicationError>>();
		mockedCreateApplicationError.mockReturnValue(
			mockedCreateApplicationErrorCalls
		);

		mockedUseSharedEditMode.mockReturnValue({
			editModeId: ref(undefined),
			setEditModeId: vi.fn(),
			isInEditMode: computed(() => true),
		});

		mockedUseSharedBoardPageInformation.mockReturnValue({
			createPageInformation: vi.fn(),
			breadcrumbs: ref([]),
			contextType: ref(),
			pageTitle: ref("page-title"),
			roomId: ref("room-id"),
		});

		mockedUseEditMode.mockReturnValue({
			isEditMode: computed(() => false),
			startEditMode: vi.fn(),
			stopEditMode: vi.fn(),
		});

		mockUseSharedLastCreatedElement.mockReturnValue({
			lastCreatedElementId: computed(() => "element-id"),
			resetLastCreatedElementId: vi.fn(),
		});
		mockExtractDataAttribute.mockReturnValue("column-id");

		route = createMock<ReturnType<typeof useRoute>>();
		useRouteMock.mockReturnValue(route);

		router = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		mockedBoardPermissions = { ...defaultPermissions };
		mockedUseBoardPermissions.mockReturnValue(mockedBoardPermissions);
		mockedUsePageInactivity =
			createMock<ReturnType<typeof useBoardInactivity>>();
		mockUseBoardInactivity.mockReturnValue(mockedUsePageInactivity);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const mockEnvConfigModule = (envs: Partial<ConfigResponse> | undefined) => {
		setupStores({
			envConfigModule: EnvConfigModule,
			applicationErrorModule: ApplicationErrorModule,
		});
		const envsMock = envsFactory.build({
			FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
			FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: true,
			FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
			FEATURE_COLUMN_BOARD_SHARE: true,
			...envs,
		});
		envConfigModule.setEnvs(envsMock);
		const envConfigModuleMock: jest.Mocked<EnvConfigModule> = createModuleMocks(
			EnvConfigModule,
			{
				getEnv: envsMock,
			}
		);

		return envConfigModuleMock;
	};

	const createBoard = (options?: {
		numberOfColumns?: number;
		isVisible?: boolean;
	}): Board => {
		const cards = cardSkeletonResponseFactory.buildList(3);
		const columns = columnResponseFactory.buildList(
			options?.numberOfColumns ?? 1,
			{
				cards,
			}
		);
		const board = boardResponseFactory.build({
			columns,
			isVisible: options?.isVisible ?? true,
		});

		return board;
	};

	const setupProvideModules = (envs?: Partial<ConfigResponse>) => {
		const notifierModule = createModuleMocks(NotifierModule);
		const envConfigModule = mockEnvConfigModule(envs);

		const copyResultId = "42";
		const copyModule = createModuleMocks(CopyModule, {
			getIsResultModalOpen: false,
			getCopyResult: createMock<CopyApiResponse>({
				id: copyResultId,
				type: CopyApiResponseTypeEnum.Board,
			}),
		});

		const loadingStateModule = createModuleMocks(LoadingStateModule);
		const shareModule = createModuleMocks(ShareModule);
		const courseRoomDetailsModule = createModuleMocks(CourseRoomDetailsModule, {
			getRoomId: "room1",
		});
		return {
			notifierModule,
			envConfigModule,
			copyModule,
			loadingStateModule,
			shareModule,
			courseRoomDetailsModule,
			copyResultId,
		};
	};

	const setup = (options?: {
		numberOfColumns?: number;
		isBoardVisible?: boolean;
		envs?: Partial<ConfigResponse>;
	}) => {
		const {
			notifierModule,
			envConfigModule,
			copyModule,
			loadingStateModule,
			shareModule,
			courseRoomDetailsModule,
			copyResultId,
		} = setupProvideModules(options?.envs);

		const board = createBoard({
			numberOfColumns: options?.numberOfColumns,
			isVisible: options?.isBoardVisible,
		});

		const wrapper = mount(BoardVue, {
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							boardStore: {
								board,
								isLoading: false,
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
					[COURSE_ROOM_DETAILS_MODULE_KEY.valueOf()]: courseRoomDetailsModule,
				},
			},
			propsData: { boardId: board.id },
		});

		const boardStore = mockedPiniaStoreTyping(useBoardStore);
		const cardStore = mockedPiniaStoreTyping(useCardStore);
		applicationErrorModule.setError = setErrorMock;

		const wrapperVM = wrapper.vm as unknown as {
			board: Board;
			openDeleteBoardDialog: () => void;
			isBoardVisible: boolean;
		};

		return {
			wrapper,
			wrapperVM,
			boardStore,
			cardStore,
			board,
			copyResultId,
			shareModule,
			courseRoomDetailsModule,
		};
	};

	describe("when component is mounted", () => {
		it("should call boardStore fetchBoardRequest action", () => {
			const { wrapper, boardStore, board, wrapperVM } = setup();

			expect(boardStore.fetchBoardRequest).toHaveBeenCalled();
			expect(boardStore.board).toBeDefined();
			expect(wrapper).toBeDefined();

			expect(wrapperVM.board).toStrictEqual(board);
		});

		it("should be found in the dom", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(BoardVue).exists()).toBeTruthy();
		});

		it("should call 'useBoardInactivity' composable", async () => {
			setup();
			await nextTick();
			expect(mockUseBoardInactivity).toHaveBeenCalled();
		});

		describe("BoardHeader component", () => {
			it("should fetch board from store and render board header", () => {
				const { wrapper } = setup();

				expect(wrapper.findComponent(BoardHeaderVue).exists()).toBeTruthy();
			});

			it("should fetch board from store and render board header with title", async () => {
				const { wrapper, board } = setup();

				const boardHeaderComponent = wrapper.findComponent(BoardHeaderVue);

				expect(boardHeaderComponent.props("title")).toBe(board.title);
			});
		});
	});

	describe("when component is unMounted", () => {
		it("should set board to undefined when component is unmounted", async () => {
			const { wrapper, boardStore } = setup();

			wrapper.unmount();
			await nextTick();

			expect(boardStore.setBoard).toHaveBeenCalledWith(undefined);
		});
	});

	describe("BoardColumn component", () => {
		it("should fetch board from store and render it", async () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(BoardColumnVue).exists()).toBeTruthy();
		});

		it("should fetch board from store and render one column", () => {
			const { wrapper } = setup();

			expect(wrapper.findAllComponents(BoardColumnVue)).toHaveLength(1);
		});

		it("should fetch board from store and render two columns", async () => {
			const { wrapper } = setup({ numberOfColumns: 2 });

			expect(wrapper.findAllComponents(BoardColumnVue)).toHaveLength(2);
		});

		it("should propagate columnCount to BoardColumn components", () => {
			const { wrapper } = setup({ numberOfColumns: 2 });

			const boardColumnComponents = wrapper.findAllComponents({
				name: "BoardColumn",
			});

			expect(boardColumnComponents[0].props("columnCount")).toBe(2);
			expect(boardColumnComponents[1].props("columnCount")).toBe(2);
		});
	});

	describe("Info message for teacher", () => {
		beforeEach(() => {
			mockedBoardPermissions.isTeacher = true;
		});

		it("should call the board notifier when the user is teacher", () => {
			vi.useFakeTimers();

			setup();

			jest.runAllTimers();

			expect(mockedBoardNotifierCalls.showCustomNotifier).toHaveBeenCalled();
		});

		it("should call the board notifier with draft info when board is not visible", () => {
			vi.useFakeTimers();

			setup({ isBoardVisible: false });

			jest.runAllTimers();

			expect(mockedBoardNotifierCalls.showCustomNotifier).toHaveBeenCalledWith(
				"components.board.alert.info.draft",
				"info"
			);
		});

		it("should call the board notifier with published info when board is visible", () => {
			vi.useFakeTimers();

			setup();

			jest.runAllTimers();

			expect(mockedBoardNotifierCalls.showCustomNotifier).toHaveBeenCalledWith(
				"components.board.alert.info.teacher",
				"info"
			);
		});

		it("should call the board notifier with published info when board becomes visible", () => {
			vi.useFakeTimers();

			const { boardStore } = setup({ isBoardVisible: false });
			boardStore.board!.isVisible = true;

			jest.runAllTimers();

			expect(mockedBoardNotifierCalls.showCustomNotifier).toHaveBeenCalledWith(
				"components.board.alert.info.teacher",
				"info"
			);
		});

		it("should call the board notifier with draft info when board should not be visible anymore", () => {
			vi.useFakeTimers();

			const { boardStore } = setup();
			boardStore.board!.isVisible = false;

			jest.runAllTimers();

			expect(mockedBoardNotifierCalls.showCustomNotifier).toHaveBeenCalledWith(
				"components.board.alert.info.draft",
				"info"
			);
		});

		it("should not call the board notifier when the user is not a teacher", () => {
			mockedBoardPermissions.isTeacher = false;

			vi.useFakeTimers();

			setup();

			jest.runAllTimers();

			expect(
				mockedBoardNotifierCalls.showCustomNotifier
			).not.toHaveBeenCalled();
		});
	});

	describe("BoardColumnGhost component", () => {
		describe("when user has create column permission", () => {
			it("should not be rendered on DOM", () => {
				mockedBoardPermissions.hasCreateColumnPermission = true;

				const { wrapper } = setup();

				const ghostColumnComponent = wrapper.findComponent({
					name: "BoardColumnGhost",
				});

				expect(ghostColumnComponent.vm).toBeDefined();
			});
		});

		describe("when user doesn't have create column permission", () => {
			it("should not be rendered on DOM", () => {
				mockedBoardPermissions.hasCreateColumnPermission = false;

				const { wrapper } = setup();

				const ghostColumnComponent = wrapper.findComponent({
					name: "BoardColumnGhost",
				});

				expect(ghostColumnComponent.exists()).toBe(false);
			});
		});
	});

	describe("CopyResultModal", () => {
		it("should have a result modal component", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(CopyResultModal).exists()).toBe(true);
		});
	});

	describe("when component is unmounted", () => {
		it("should call reset board notifier", () => {
			const { wrapper } = setup();

			wrapper.unmount();

			expect(mockedBoardNotifierCalls.resetNotifierModule).toHaveBeenCalled();
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to move", () => {
			it("should set drag-disabled", () => {
				mockedBoardPermissions.hasMovePermission = false;
				const { wrapper } = setup();

				const dndContainer = wrapper.findComponent({ name: "Sortable" });
				expect(dndContainer.vm.options.disabled).toBe(true);
			});
		});

		describe("@onCreateCard", () => {
			describe("when user is permitted to create card", () => {
				it("should call the createCard method", () => {
					mockedBoardPermissions.hasCreateCardPermission = true;
					const { wrapper, boardStore } = setup();

					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("create:card");

					expect(boardStore.createCardRequest).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to create card", () => {
				it("should not call the createCard method", () => {
					mockedBoardPermissions.hasCreateCardPermission = false;
					const { wrapper, boardStore } = setup();

					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});

					columnComponent.vm.$emit("create:card");

					expect(boardStore.createCardRequest).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onCreateColumn", () => {
			describe("when user is permitted to create a column", () => {
				it("should call createColumn method", () => {
					mockedBoardPermissions.hasCreateColumnPermission = true;
					const { wrapper, boardStore } = setup();

					const ghostColumnComponent = wrapper.findComponent({
						name: "BoardColumnGhost",
					});
					ghostColumnComponent.vm.$emit("create:column");

					expect(boardStore.createColumnRequest).toHaveBeenCalled();
				});
			});
		});

		describe("@onDeleteCard", () => {
			describe("when user is permitted to delete a card", () => {
				it("should call deleteCard method", () => {
					mockedBoardPermissions.hasCreateCardPermission = true;
					const { wrapper, cardStore } = setup();

					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});

					columnComponent.vm.$emit("delete:card");

					expect(cardStore.deleteCardRequest).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to delete a card", () => {
				it("should not call deleteCard method", () => {
					mockedBoardPermissions.hasCreateCardPermission = false;
					const { wrapper, cardStore } = setup();

					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("delete:card");

					expect(cardStore.deleteCardRequest).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onDeleteColumn", () => {
			describe("when user is permitted to delete a column", () => {
				it("should call deleteColumn method", () => {
					mockedBoardPermissions.hasDeletePermission = true;
					const { wrapper, boardStore } = setup();

					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});

					columnComponent.vm.$emit("delete:column");

					expect(boardStore.deleteColumnRequest).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to delete a column", () => {
				it("should not call deleteColumn method", () => {
					mockedBoardPermissions.hasDeletePermission = false;
					const { wrapper, boardStore } = setup();

					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("delete:column");

					expect(boardStore.deleteColumnRequest).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onDropColumn", () => {
			describe("when user is permitted to move a column", () => {
				it("should call moveColumn method", () => {
					mockedBoardPermissions.hasMovePermission = true;
					const { wrapper, boardStore } = setup({ numberOfColumns: 2 });

					const containerComponent = wrapper.findAllComponents({
						name: "Sortable",
					});

					const payload = {
						item: document.createElement("div"),
						newIndex: 1,
						oldIndex: 0,
					};

					containerComponent[0].vm.$emit("end", payload);

					expect(boardStore.moveColumnRequest).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a column", () => {
				it("should not call moveColumn method", () => {
					mockedBoardPermissions.hasMovePermission = false;
					const { wrapper, boardStore } = setup({ numberOfColumns: 2 });

					const containerComponent = wrapper.findAllComponents({
						name: "Sortable",
					});
					containerComponent[0].vm.$emit("move");

					expect(boardStore.moveColumnRequest).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onMoveColumnBackward", () => {
			describe("when user is permitted to move a column", () => {
				it("should call moveColumn method", () => {
					mockedBoardPermissions.hasMovePermission = true;
					const { wrapper, boardStore } = setup({ numberOfColumns: 2 });

					const boardColumnComponent = wrapper.findAllComponents({
						name: "BoardColumn",
					});
					boardColumnComponent[1].vm.$emit("move:column-left");

					expect(boardStore.moveColumnRequest).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a column", () => {
				it("should not call moveColumn method", () => {
					mockedBoardPermissions.hasMovePermission = false;
					const { wrapper, boardStore } = setup({ numberOfColumns: 2 });

					const boardColumnComponent = wrapper.findAllComponents({
						name: "BoardColumn",
					});
					boardColumnComponent[1].vm.$emit("move:column-up");

					expect(boardStore.moveColumnRequest).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onMoveColumnForward", () => {
			describe("when user is permitted to move a column", () => {
				it("should call moveColumn method", () => {
					mockedBoardPermissions.hasMovePermission = true;
					const { wrapper, boardStore } = setup({ numberOfColumns: 2 });

					const boardColumnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					boardColumnComponent.vm.$emit("move:column-right");

					expect(boardStore.moveColumnRequest).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a column", () => {
				it("should not call moveColumn method", () => {
					mockedBoardPermissions.hasMovePermission = false;
					const { wrapper, boardStore } = setup({ numberOfColumns: 2 });

					const boardColumnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					boardColumnComponent.vm.$emit("move:column-down");

					expect(boardStore.moveColumnRequest).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onUpdateBoardTitle", () => {
			describe("when user is permitted to edit", () => {
				it("should call updateBoardTitle method", () => {
					mockedBoardPermissions.hasEditPermission = true;
					const { wrapper, boardStore } = setup();

					const headearComponent = wrapper.findComponent({
						name: "BoardHeader",
					});
					headearComponent.vm.$emit("update:title");

					expect(boardStore.updateBoardTitleRequest).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to edit", () => {
				it("should not call updateBoardTitle method", () => {
					mockedBoardPermissions.hasEditPermission = false;
					const { wrapper, boardStore } = setup();

					const headearComponent = wrapper.findComponent({
						name: "BoardHeader",
					});
					headearComponent.vm.$emit("update:title");

					expect(boardStore.updateBoardTitleSuccess).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onUpdateColumnTitle", () => {
			describe("when user is permitted to edit", () => {
				it("should call updateColumnTitle method", () => {
					mockedBoardPermissions.hasEditPermission = true;
					const { wrapper, boardStore } = setup();

					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("update:column-title");

					expect(boardStore.updateColumnTitleRequest).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to edit", () => {
				it("should not call updateColumnTitle method", () => {
					mockedBoardPermissions.hasEditPermission = false;
					const { wrapper, boardStore } = setup();

					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("update:column-title");

					expect(boardStore.updateColumnTitleRequest).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onReloadBoard", () => {
			it("should reload the board", async () => {
				const { wrapper, boardStore } = setup();

				const boardColumnComponents = wrapper.findAllComponents({
					name: "BoardColumn",
				});
				await boardColumnComponents.at(0)?.vm.$emit("reload:board");

				expect(boardStore.reloadBoard).toHaveBeenCalled();
			});
		});

		describe("@onUpdateBoardVisibility", () => {
			it("should update board visibility", async () => {
				const { wrapper, boardStore } = setup();

				const boardHeader = wrapper.findComponent({
					name: "BoardHeader",
				});
				await boardHeader.vm.$emit("update:visibility");

				expect(boardStore.updateBoardVisibilityRequest).toHaveBeenCalled();
			});

			describe("@createApplicationError", () => {
				describe("when board is in draft mode", () => {
					describe("when the user is not a teacher", () => {
						it("should call 'createApplicationError' method", async () => {
							const mockRoomId =
								mockedUseSharedBoardPageInformation().roomId.value;
							mockedBoardPermissions.isTeacher = false;
							const { boardStore, wrapperVM } = setup();
							expect(wrapperVM.isBoardVisible).toBe(true);

							boardStore.board!.isVisible = false;
							await nextTick();

							expect(wrapperVM.isBoardVisible).toBe(false);
							expect(router.replace).toHaveBeenCalledWith({
								name: "rooms-id",
								params: { id: mockRoomId },
							});
							expect(
								mockedCreateApplicationErrorCalls.createApplicationError
							).toHaveBeenCalledWith(
								HttpStatusCode.Forbidden,
								"components.board.error.403"
							);

							expect(setErrorMock).toHaveBeenCalledWith(
								createApplicationError(HttpStatusCode.Forbidden)
							);
						});
					});

					describe("when the user is a teacher", () => {
						it("should not call 'createApplicationError' method", async () => {
							mockedBoardPermissions.isTeacher = true;
							const { boardStore, wrapperVM } = setup();
							expect(wrapperVM.isBoardVisible).toBe(true);

							boardStore.board!.isVisible = false;
							await nextTick();

							expect(wrapperVM.isBoardVisible).toBe(false);
							expect(
								mockedCreateApplicationErrorCalls.createApplicationError
							).not.toHaveBeenCalled();
							expect(setErrorMock).not.toHaveBeenCalled();
						});
					});
				});

				describe("when board is published mode", () => {
					describe("when the user is not a teacher", () => {
						it("should not call 'createApplicationError' method", async () => {
							mockedBoardPermissions.isTeacher = false;
							const { boardStore, wrapperVM } = setup();
							expect(wrapperVM.isBoardVisible).toBe(true);

							boardStore.board!.isVisible = true;
							await nextTick();

							expect(wrapperVM.isBoardVisible).toBe(true);
							expect(
								mockedCreateApplicationErrorCalls.createApplicationError
							).not.toHaveBeenCalled();
							expect(setErrorMock).not.toHaveBeenCalled();
						});
					});

					describe("when the user is a teacher", () => {
						it("should not call 'createApplicationError' method", async () => {
							mockedBoardPermissions.isTeacher = true;
							const { boardStore, wrapperVM } = setup();
							expect(wrapperVM.isBoardVisible).toBe(true);

							boardStore.board!.isVisible = true;
							await nextTick();

							expect(wrapperVM.isBoardVisible).toBe(true);
							expect(
								mockedCreateApplicationErrorCalls.createApplicationError
							).not.toHaveBeenCalled();
							expect(setErrorMock).not.toHaveBeenCalled();
						});
					});
				});
			});
		});

		describe("@copy:board", () => {
			it("should call the copy function", async () => {
				const { wrapper } = setup();

				const boardHeader = wrapper.findComponent({
					name: "BoardHeader",
				});
				await boardHeader.vm.$emit("copy:board");

				expect(mockedCopyCalls.copy).toHaveBeenCalled();
			});

			it("should redirect to the board copy", async () => {
				const { wrapper, copyResultId } = setup();

				const boardHeader = wrapper.findComponent({
					name: "BoardHeader",
				});
				await boardHeader.vm.$emit("copy:board");

				expect(router.push).toHaveBeenCalledWith({
					name: "boards-id",
					params: { id: copyResultId },
				});
			});
		});

		describe("@share:board", () => {
			describe("when feature is enabled", () => {
				it("should start the share flow", async () => {
					const { wrapper, board, shareModule } = setup();

					const boardHeader = wrapper.findComponent({
						name: "BoardHeader",
					});
					await boardHeader.vm.$emit("share:board");

					expect(shareModule.startShareFlow).toHaveBeenCalledWith({
						id: board.id,
						type: ShareTokenBodyParamsParentTypeEnum.ColumnBoard,
					});
				});
			});

			describe("when feature is disabled", () => {
				it("should do nothing", async () => {
					const { wrapper, shareModule } = setup({
						envs: { FEATURE_COLUMN_BOARD_SHARE: false },
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
			let openDeleteBoardDialogMock: jest.Mock;
			beforeEach(() => {
				openDeleteBoardDialogMock = vi.fn();
			});

			it("should call openDeleteBoardDialog method when board should be deleted", async () => {
				mockedBoardPermissions.hasDeletePermission = true;
				const { wrapper, board, wrapperVM } = setup();

				wrapperVM.openDeleteBoardDialog = openDeleteBoardDialogMock;

				const columnComponent = wrapper.findComponent({
					name: "BoardHeader",
				});
				columnComponent.vm.$emit("delete:board");

				expect(openDeleteBoardDialogMock).toHaveBeenCalled();
				expect(openDeleteBoardDialogMock).toBeCalledWith(board.id);
			});

			it("should call deleteBoard method to delete board and redirect to rooms board page", async () => {
				mockedBoardPermissions.hasDeletePermission = true;
				const mockRoomId = mockedUseSharedBoardPageInformation().roomId.value;

				const { wrapper, board, boardStore } = setup();

				const columnComponent = wrapper.findComponent({
					name: "BoardHeader",
				});
				await columnComponent.vm.$emit("delete:board");

				expect(boardStore.deleteBoardRequest).toHaveBeenCalledWith(
					{
						boardId: board.id,
					},
					mockRoomId
				);
			});
		});
	});
});
