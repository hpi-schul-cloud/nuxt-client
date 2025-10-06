import CopyResultModal from "@/components/copy-result-modal/CopyResultModal.vue";
import { useApplicationError } from "@/composables/application-error.composable";
import { useCopy } from "@/composables/copy";
import {
	BoardLayout,
	ConfigResponse,
	CopyApiResponse,
	CopyApiResponseTypeEnum,
	ShareTokenBodyParamsParentTypeEnum,
} from "@/serverApi/v3";
import { applicationErrorModule } from "@/store";
import ApplicationErrorModule from "@/store/application-error";
import CopyModule from "@/store/copy";
import CourseRoomDetailsModule from "@/store/course-room-details";
import LoadingStateModule from "@/store/loading-state";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import ShareModule from "@/store/share";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { Board } from "@/types/board/Board";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import {
	COPY_MODULE_KEY,
	COURSE_ROOM_DETAILS_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
	SHARE_MODULE_KEY,
} from "@/utils/inject";
import {
	createTestEnvStore,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
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
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { SelectBoardLayoutDialog } from "@ui-room-details";
import {
	extractDataAttribute,
	useCourseBoardEditMode,
	useSharedEditMode,
	useSharedLastCreatedElement,
} from "@util-board";
import { mount } from "@vue/test-utils";
import { computed, nextTick, ref } from "vue";
import { Router, useRoute, useRouter } from "vue-router";
import BoardVue from "./Board.vue";
import BoardColumn from "./BoardColumn.vue";
import BoardHeader from "./BoardHeader.vue";
import { Mock } from "vitest";
import { useNotificationStore } from "@data-app";
import { setActivePinia } from "pinia";

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

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle) => pageTitle ?? "",
		}) as typeof import("@/utils/pageTitle")
);

vi.mock("@/composables/copy");
const mockUseCopy = vi.mocked(useCopy);

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;
const useRouteMock = <Mock>useRoute;

vi.mock("@data-board/boardInactivity.composable");
const mockUseBoardInactivity = <Mock>useBoardInactivity;

vi.mock("@/composables/application-error.composable");
const mockedCreateApplicationError = vi.mocked(useApplicationError);

describe("Board", () => {
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
	const hash = "";

	beforeEach(() => {
		vi.useFakeTimers();
		vi.clearAllMocks();

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
			breadcrumbs: computed(() => []),
			contextType: computed(() => undefined),
			pageTitle: computed(() => "page-title"),
			roomId: computed(() => "room-id"),
			resetPageInformation: vi.fn(),
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

		route = createMock<ReturnType<typeof useRoute>>({
			hash,
		});
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

	const createBoard = (options?: {
		numberOfColumns?: number;
		isVisible?: boolean;
		readersCanEdit?: boolean;
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
			readersCanEdit: options?.readersCanEdit ?? false,
		});

		return board;
	};

	const setupProvideModules = () => {
		setupStores({
			applicationErrorModule: ApplicationErrorModule,
		});

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
		const schoolExternalToolsModule = createModuleMocks(
			SchoolExternalToolsModule
		);
		return {
			copyModule,
			loadingStateModule,
			shareModule,
			courseRoomDetailsModule,
			copyResultId,
			schoolExternalToolsModule,
		};
	};

	const setup = (options?: {
		numberOfColumns?: number;
		isBoardVisible?: boolean;
		isReadersCanEdit?: boolean;
		envs?: Partial<ConfigResponse>;
	}) => {
		const {
			copyModule,
			loadingStateModule,
			shareModule,
			courseRoomDetailsModule,
			copyResultId,
			schoolExternalToolsModule,
		} = setupProvideModules();

		setActivePinia(createTestingPinia());
		createTestEnvStore({
			FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
			FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: true,
			FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
			FEATURE_COLUMN_BOARD_SHARE: true,
			// FEATURE_BOARD_READERS_CAN_EDIT_TOGGLE: true,
			...(options?.envs ?? {}),
		});

		const board = createBoard({
			numberOfColumns: options?.numberOfColumns,
			isVisible: options?.isBoardVisible,
			readersCanEdit: options?.isReadersCanEdit ?? false,
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
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModule,
					loadingStateModule,
					[SHARE_MODULE_KEY.valueOf()]: shareModule,
					[COURSE_ROOM_DETAILS_MODULE_KEY.valueOf()]: courseRoomDetailsModule,
					[SCHOOL_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]:
						schoolExternalToolsModule,
				},
				stubs: {
					ShareModal: true,
					UseFocusTrap: true,
					EditSettingsDialog: true,
				},
				renderStubDefaultSlot: true,
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
			isEditSettingsDialogOpen: boolean;
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

			expect(wrapper.findComponent(BoardVue).exists()).toBe(true);
		});

		it("should call 'useBoardInactivity' composable", async () => {
			setup();
			await nextTick();
			expect(mockUseBoardInactivity).toHaveBeenCalled();
		});

		describe("BoardHeader component", () => {
			it("should fetch board from store and render board header", () => {
				const { wrapper } = setup();

				expect(wrapper.findComponent(BoardHeader).exists()).toBeTruthy();
			});

			it("should fetch board from store and render board header with title", () => {
				const { wrapper, board } = setup();

				const boardHeaderComponent = wrapper.findComponent(BoardHeader);

				expect(boardHeaderComponent.props("title")).toBe(board.title);
			});
		});

		describe("when the user has tool create permissions", () => {
			it("should call cardStore loadPreferredTools action", () => {
				mockedBoardPermissions.hasCreateToolPermission = ref(true);
				const { cardStore } = setup();

				expect(cardStore.loadPreferredTools).toHaveBeenCalled();
			});
		});

		describe("when the user does not have tool create permissions", () => {
			it("should call cardStore loadPreferredTools action", () => {
				mockedBoardPermissions.hasCreateToolPermission = ref(false);
				const { cardStore } = setup();

				expect(cardStore.loadPreferredTools).not.toHaveBeenCalled();
			});
		});

		describe("when the url has a hash", () => {
			const setup2 = () => {
				Object.defineProperty(window, "location", {
					get: () =>
						createMock<Location>({
							hash: "#card-12345",
						}),
				});

				const domElementMock = createMock<HTMLElement>();
				const querySelectorSpy = vi.spyOn(document, "querySelector");
				querySelectorSpy.mockReturnValueOnce(domElementMock);

				setup();

				return {
					domElementMock,
				};
			};

			it("should scroll to and focus the element", async () => {
				const { domElementMock } = setup2();

				await vi.runAllTimers();

				await nextTick();

				expect(domElementMock.scrollIntoView).toHaveBeenCalledWith({
					block: "center",
					inline: "center",
				});
				expect(domElementMock.focus).toHaveBeenCalled();
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
		it("should fetch board from store and render it", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(BoardColumn).exists()).toBeTruthy();
		});

		it("should fetch board from store and render one column", () => {
			const { wrapper } = setup();

			expect(wrapper.findAllComponents(BoardColumn)).toHaveLength(1);
		});

		it("should fetch board from store and render two columns", () => {
			const { wrapper } = setup({ numberOfColumns: 2 });

			expect(wrapper.findAllComponents(BoardColumn)).toHaveLength(2);
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

	describe("BoardColumnGhost component", () => {
		describe("when user has create column permission", () => {
			it("should be rendered on DOM", () => {
				mockedBoardPermissions.hasCreateColumnPermission = ref(true);

				const { wrapper } = setup();

				const ghostColumnComponent = wrapper.findComponent({
					name: "BoardColumnGhost",
				});

				expect(ghostColumnComponent.exists()).toBe(true);
			});
		});

		describe("when user has edit permission", () => {
			it("should not be rendered on DOM", () => {
				mockedBoardPermissions.hasEditPermission = ref(true);

				const { wrapper } = setup();

				const ghostColumnComponent = wrapper.findComponent({
					name: "BoardColumnGhost",
				});

				expect(ghostColumnComponent.exists()).toBe(true);
			});
		});

		describe("when user doesn't have create column permission", () => {
			it("should not be rendered on DOM", () => {
				mockedBoardPermissions.hasCreateColumnPermission = ref(false);

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
			expect(useNotificationStore().clearAll).toHaveBeenCalled();
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to move", () => {
			it("should set drag-disabled", () => {
				mockedBoardPermissions.hasMovePermission = ref(false);
				const { wrapper } = setup();

				const dndContainer = wrapper.findComponent({ name: "Sortable" });
				expect(dndContainer.vm.options.disabled).toBe(true);
			});
		});

		describe("@onCreateCard", () => {
			describe("when user is permitted to create card", () => {
				it("should call the createCard method", () => {
					mockedBoardPermissions.hasCreateCardPermission = ref(true);
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
					mockedBoardPermissions.hasCreateCardPermission = ref(false);
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
					mockedBoardPermissions.hasCreateColumnPermission = ref(true);
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
					mockedBoardPermissions.hasCreateCardPermission = ref(true);
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
					mockedBoardPermissions.hasCreateCardPermission = ref(false);
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
					mockedBoardPermissions.hasDeletePermission = ref(true);
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
					mockedBoardPermissions.hasDeletePermission = ref(false);
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
					mockedBoardPermissions.hasMovePermission = ref(true);
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
					mockedBoardPermissions.hasMovePermission = ref(false);
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
					mockedBoardPermissions.hasMovePermission = ref(true);
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
					mockedBoardPermissions.hasMovePermission = ref(false);
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
					mockedBoardPermissions.hasMovePermission = ref(true);
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
					mockedBoardPermissions.hasMovePermission = ref(false);
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
					mockedBoardPermissions.hasEditPermission = ref(true);
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
					mockedBoardPermissions.hasEditPermission = ref(false);
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
					mockedBoardPermissions.hasEditPermission = ref(true);
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
					mockedBoardPermissions.hasEditPermission = ref(false);
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
					describe("when the user has not edit permission", () => {
						it("should call 'createApplicationError' method", async () => {
							mockedBoardPermissions.hasEditPermission = ref(false);
							mockedBoardPermissions.arePermissionsLoaded = ref(true);

							const mockRoomId =
								mockedUseSharedBoardPageInformation().roomId.value;
							mockedBoardPermissions.isTeacher = ref(false);
							const { boardStore, wrapperVM } = setup();
							expect(wrapperVM.isBoardVisible).toBe(true);

							boardStore.board!.isVisible = false;
							await nextTick();

							expect(wrapperVM.isBoardVisible).toBe(false);
							expect(router.replace).toHaveBeenCalledWith({
								name: "room-details",
								params: { id: mockRoomId },
							});
							expect(
								mockedCreateApplicationErrorCalls.createApplicationError
							).toHaveBeenCalledWith(
								HttpStatusCode.Forbidden,
								"components.board.error.403"
							);

							expect(setErrorMock).toHaveBeenCalled();
						});
					});

					describe("when the user has edit permissions", () => {
						it("should not call 'createApplicationError' method", async () => {
							mockedBoardPermissions.hasEditPermission = ref(true);
							mockedBoardPermissions.arePermissionsLoaded = ref(true);
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
					describe("when the user has not edit permission", () => {
						it("should not call 'createApplicationError' method", async () => {
							mockedBoardPermissions.hasEditPermission = ref(false);
							mockedBoardPermissions.arePermissionsLoaded = ref(true);
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

					describe("when the user has edit permission", () => {
						it("should not call 'createApplicationError' method", async () => {
							mockedBoardPermissions.hasEditPermission = ref(true);
							mockedBoardPermissions.arePermissionsLoaded = ref(true);
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

					describe("when revert to draft mode", () => {
						describe("when board is already in readersCanEdit mode", () => {
							it("should not call updateReaderCanEditRequest", async () => {
								const { wrapper, boardStore } = setup({
									isBoardVisible: true,
									isReadersCanEdit: true,
								});

								const boardHeader = wrapper.findComponent({
									name: "BoardHeader",
								});
								await boardHeader.vm.$emit("update:visibility");

								expect(
									boardStore.updateReaderCanEditRequest
								).toHaveBeenCalledWith({
									boardId: boardStore.board!.id,
									readersCanEdit: false,
								});
								expect(
									boardStore.updateBoardVisibilityRequest
								).toHaveBeenCalled();
							});
						});

						describe("when board is not in readersCanEdit mode", () => {
							it("should call updateReaderCanEditRequest", async () => {
								const { wrapper, boardStore } = setup({
									isBoardVisible: true,
									isReadersCanEdit: false,
								});

								const boardHeader = wrapper.findComponent({
									name: "BoardHeader",
								});
								await boardHeader.vm.$emit("update:visibility");

								expect(
									boardStore.updateReaderCanEditRequest
								).not.toHaveBeenCalled();
								expect(
									boardStore.updateBoardVisibilityRequest
								).toHaveBeenCalled();
							});
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

		describe("readersCanEdit", () => {
			describe("when set/unset the board for the user with the 'read' permission", () => {
				it("should call updateReaderCanEditRequest with correct payload", async () => {
					mockedBoardPermissions.hasManageBoardPermission = ref(false);
					mockedBoardPermissions.arePermissionsLoaded = ref(true);
					const { wrapper, boardStore } = setup({
						isBoardVisible: true,
						envs: { FEATURE_BOARD_READERS_CAN_EDIT_TOGGLE: true },
					});

					const boardHeader = wrapper.findComponent({
						name: "BoardHeader",
					});
					await boardHeader.vm.$emit("edit:settings");

					const editSettingsDialog = wrapper.findComponent({
						name: "EditSettingsDialog",
					});
					expect(editSettingsDialog.exists()).toBe(true);

					editSettingsDialog.vm.$emit("save", false);

					expect(boardStore.updateReaderCanEditRequest).toHaveBeenCalledWith({
						boardId: boardStore.board!.id,
						readersCanEdit: false,
					});

					editSettingsDialog.vm.$emit("save", false);
					expect(boardStore.updateReaderCanEditRequest).toHaveBeenCalledWith({
						boardId: boardStore.board!.id,
						readersCanEdit: false,
					});
				});

				it("should set 'isEditSettingsDialogOpen' to false", async () => {
					mockedBoardPermissions.hasManageBoardPermission = ref(false);
					mockedBoardPermissions.arePermissionsLoaded = ref(true);
					const { wrapper, wrapperVM } = setup({
						isBoardVisible: true,
						envs: { FEATURE_BOARD_READERS_CAN_EDIT_TOGGLE: true },
					});

					const boardHeader = wrapper.findComponent({
						name: "BoardHeader",
					});
					await boardHeader.vm.$emit("edit:settings");

					const editSettingsDialog = wrapper.findComponent({
						name: "EditSettingsDialog",
					});

					expect(wrapperVM.isEditSettingsDialogOpen).toBe(true);

					editSettingsDialog.vm.$emit("close");
					await nextTick();

					expect(wrapperVM.isEditSettingsDialogOpen).toBe(false);
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
			let openDeleteBoardDialogMock: Mock;
			beforeEach(() => {
				openDeleteBoardDialogMock = vi.fn();
			});

			it("should call openDeleteBoardDialog method when board should be deleted", () => {
				mockedBoardPermissions.hasDeletePermission = ref(true);
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
				mockedBoardPermissions.hasDeletePermission = ref(true);
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

	describe("Change board layout", () => {
		describe("when the 'change layout' menu button is clicked", () => {
			it("should open the change dialog", async () => {
				const { wrapper } = setup();

				const boardHeader = wrapper.findComponent(BoardHeader);
				const boardLayoutDialog = wrapper.findComponent(
					SelectBoardLayoutDialog
				);

				boardHeader.vm.$emit("change-layout");
				await nextTick();

				expect(boardLayoutDialog.props("modelValue")).toEqual(true);
			});
		});

		describe("when the change layout dialog is confirmed", () => {
			describe("when layout has changed", () => {
				it("should close the dialog", async () => {
					const { wrapper } = setup();

					const boardLayoutDialog = wrapper.findComponent(
						SelectBoardLayoutDialog
					);
					await boardLayoutDialog.setValue(true, "modelValue");

					boardLayoutDialog.vm.$emit("select", BoardLayout.List);
					await nextTick();

					expect(boardLayoutDialog.props("modelValue")).toEqual(false);
				});

				it("should send the update request", async () => {
					const { wrapper, boardStore, board } = setup();

					const boardLayoutDialog = wrapper.findComponent(
						SelectBoardLayoutDialog
					);

					boardLayoutDialog.vm.$emit("select", BoardLayout.List);
					await nextTick();

					expect(boardStore.updateBoardLayoutRequest).toHaveBeenCalledWith({
						boardId: board.id,
						layout: BoardLayout.List,
					});
				});
			});

			describe("when the layout has not changed", () => {
				it("should close the dialog", async () => {
					const { wrapper } = setup();

					const boardLayoutDialog = wrapper.findComponent(
						SelectBoardLayoutDialog
					);
					await boardLayoutDialog.setValue(true, "modelValue");

					boardLayoutDialog.vm.$emit("select", BoardLayout.List);
					await nextTick();

					expect(boardLayoutDialog.props("modelValue")).toEqual(false);
				});

				it("should not send an update request", async () => {
					const { wrapper, boardStore, board } = setup();

					const boardLayoutDialog = wrapper.findComponent(
						SelectBoardLayoutDialog
					);

					boardLayoutDialog.vm.$emit("select", board.layout);
					await nextTick();

					expect(boardStore.updateBoardLayoutRequest).not.toHaveBeenCalled();
				});
			});
		});
	});
});
