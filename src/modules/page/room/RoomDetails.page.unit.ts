import * as serverApi from "@/serverApi/v3/api";
import { authModule } from "@/store";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import ShareModule from "@/store/share";
import { BoardLayout } from "@/types/board/Board";
import { RoomBoardItem } from "@/types/room/Room";

import {
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	SHARE_MODULE_KEY,
} from "@/utils/inject";
import {
	envsFactory,
	meResponseFactory,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import {
	roomBoardTileListFactory,
	roomFactory,
} from "@@/tests/test-utils/factory/room";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import {
	RoomVariant,
	useRoomAuthorization,
	useRoomDetailsStore,
	useRoomsState,
} from "@data-room";
import { RoomMenu } from "@feature-room";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { RoomDetailsPage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { EmptyState } from "@ui-empty-state";
import {
	LeaveRoomProhibitedDialog,
	SelectBoardLayoutDialog,
} from "@ui-room-details";
import { flushPromises, VueWrapper } from "@vue/test-utils";
import { Mock } from "vitest";
import { ref } from "vue";
import { useRouter } from "vue-router";

vi.mock("vue-router", () => ({
	useRouter: vi.fn().mockReturnValue({
		push: vi.fn(),
	}),
}));

vi.mock("@data-room/Rooms.state");

vi.mock("@data-room/roomAuthorization.composable");
const roomAuthorization = vi.mocked(useRoomAuthorization);

vi.mock("@ui-confirmation-dialog");
vi.mocked(useConfirmationDialog);

describe("@pages/RoomsDetails.page.vue", () => {
	let useRoomsStateMock: DeepMocked<ReturnType<typeof useRoomsState>>;
	let roomPermissions: ReturnType<typeof useRoomAuthorization>;
	let askConfirmationMock: Mock;

	beforeEach(() => {
		vi.useFakeTimers();
		setupStores({
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
		});

		useRoomsStateMock = createMock<ReturnType<typeof useRoomsState>>({
			isLoading: ref(false),
			isEmpty: ref(false),
			rooms: ref([]),
		});
		vi.mocked(useRoomsState).mockReturnValue(useRoomsStateMock);

		const mockMe = meResponseFactory.build();
		authModule.setMe(mockMe);

		askConfirmationMock = vi.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});

		roomPermissions = {
			canAddRoomMembers: ref(false),
			canChangeOwner: ref(false),
			canCreateRoom: ref(false),
			canViewRoom: ref(false),
			canEditRoom: ref(false),
			canDeleteRoom: ref(false),
			canLeaveRoom: ref(true),
			canRemoveRoomMembers: ref(false),
			canEditRoomContent: ref(false),
			canSeeAllStudents: ref(false),
			canCopyRoom: ref(false),
			canShareRoom: ref(false),
			canManageRoomInvitationLinks: ref(false),
			canListDrafts: ref(false),
			canManageVideoconferences: ref(false),
		};
		roomAuthorization.mockReturnValue(roomPermissions);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (
		options?: Partial<{
			envs: Partial<serverApi.ConfigResponse>;
			roomBoards: RoomBoardItem[];
		}>
	) => {
		const { envs, roomBoards } = {
			roomBoards: [],
			...options,
		};
		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: envsFactory.build({
				FEATURE_BOARD_LAYOUT_ENABLED: true,
				FEATURE_ROOMS_ENABLED: true,
				...envs,
			}),
		});

		const notifierModule = createModuleMocks(NotifierModule);
		const shareModule = createModuleMocks(ShareModule, {
			getIsShareModalOpen: false,
			getParentType: serverApi.ShareTokenBodyParamsParentTypeEnum.Room,
		});

		const room = roomFactory.build({});

		const wrapper = mount(RoomDetailsPage, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomDetailsStore: {
								isLoading: false,
								room,
								roomVariant: RoomVariant.ROOM,
								roomBoards,
							},
						},
					}),
				],
				stubs: { LeaveRoomProhibitedDialog: true },
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[SHARE_MODULE_KEY.valueOf()]: shareModule,
				},
			},
			props: {
				room,
			},
		});

		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);

		return {
			wrapper,
			roomDetailsStore,
			room,
			router: useRouter(),
			useRoomsStateMock,
		};
	};

	describe("when page is mounted", () => {
		it("should set the page title", async () => {
			const { room } = setup();

			expect(document.title).toContain(
				`${room.name} - ${"pages.roomDetails.title"}`
			);
		});

		it("should render DefaultWireframe", () => {
			const { wrapper } = setup();

			const defaultWireframe = wrapper.findComponent({
				name: "DefaultWireframe",
			});

			expect(defaultWireframe.exists()).toBe(true);
		});

		it("should render BoardGrid", () => {
			const { wrapper } = setup();

			const boardGrid = wrapper.findComponent({ name: "BoardGrid" });
			expect(boardGrid.exists()).toBe(true);
		});

		it("should render empty state when no visible boards are found", () => {
			const { wrapper } = setup({
				roomBoards: [],
			});
			const emptyState = wrapper.findComponent(EmptyState);
			expect(emptyState.exists()).toBe(true);
			expect(emptyState.props("title")).toBe("pages.roomDetails.emptyState");
		});

		describe("and room is defined", () => {
			it("should render breadcrumbs with room name", () => {
				const { wrapper, room } = setup();

				const breadcrumbs = wrapper.getComponent({ name: "Breadcrumbs" });

				const breadcrumbItems = breadcrumbs.findAllComponents({
					name: "v-breadcrumbs-item",
				});

				expect(breadcrumbItems).toHaveLength(2);
				expect(breadcrumbItems[1].text()).toContain(room.name);
			});
		});
	});

	describe("when user deletes the room", () => {
		it("should reroute to rooms overview page", async () => {
			roomPermissions.canDeleteRoom.value = true;
			roomPermissions.canViewRoom.value = true;

			const { wrapper, router } = setup();

			const menu = wrapper.getComponent({ name: "RoomMenu" });
			await menu.vm.$emit("room:delete");

			expect(router.push).toHaveBeenCalledWith({
				name: "rooms",
			});
		});
	});

	describe("when using the menu", () => {
		beforeEach(() => {
			roomPermissions.canEditRoomContent.value = true;
			roomPermissions.canDeleteRoom.value = true;
		});

		describe("and user clicks on edit room", () => {
			it("should navigate to the edit room page", async () => {
				const { wrapper, router, room } = setup();

				const menu = wrapper.getComponent({ name: "RoomMenu" });
				menu.vm.$emit("room:edit");

				expect(menu.emitted()).toHaveProperty("room:edit");

				expect(router.push).toHaveBeenCalledWith({
					name: "room-edit",
					params: { id: room.id },
				});
			});
		});

		describe("and user clicks on manage members", () => {
			it("should navigate to the member management page", async () => {
				const { wrapper, router, room } = setup();

				const menu = wrapper.getComponent({ name: "RoomMenu" });
				menu.vm.$emit("room:manage-members");

				expect(menu.emitted()).toHaveProperty("room:manage-members");

				expect(router.push).toHaveBeenCalledWith({
					name: "room-members",
					params: { id: room.id },
				});
			});
		});

		describe("when a user clicks on leave room", () => {
			describe("and user has permission to leave room", () => {
				it("should call leaveRoom when dialog confirmed", async () => {
					askConfirmationMock.mockResolvedValue(true);
					const { wrapper, useRoomsStateMock } = setup();

					const menu = wrapper.getComponent(RoomMenu);
					await menu.vm.$emit("room:leave");

					expect(useRoomsStateMock.leaveRoom).toHaveBeenCalled();
				});

				it("should not call leaveRoom when dialog canceled", async () => {
					askConfirmationMock.mockResolvedValue(false);
					const { wrapper, useRoomsStateMock } = setup();

					const menu = wrapper.getComponent(RoomMenu);
					await menu.vm.$emit("room:leave");

					expect(useRoomsStateMock.leaveRoom).not.toHaveBeenCalled();
				});
			});

			describe("when user has not the permission to leave the room", () => {
				it("should open leave room prohibited dialog", async () => {
					roomPermissions.canLeaveRoom.value = false;

					const { wrapper } = setup();

					const menu = wrapper.getComponent(RoomMenu);
					await menu.vm.$emit("room:leave");
					const leaveRoomProhibitedDialog = wrapper.getComponent(
						LeaveRoomProhibitedDialog
					);

					expect(leaveRoomProhibitedDialog.isVisible()).toBe(true);
					expect(leaveRoomProhibitedDialog.props("modelValue")).toEqual(true);
				});
			});
		});
	});

	describe("when user wants to create a board", () => {
		const openSpeedDialMenu = async (wrapper: VueWrapper) => {
			const speedDialMenu = wrapper.getComponent({ name: "speed-dial-menu" });
			await speedDialMenu.getComponent({ name: "v-btn" }).trigger("click");
			vi.advanceTimersByTime(1000); // speed dial renders items delayed
			await flushPromises();
		};

		describe("and user does not have permission to edit room content", () => {
			it("should not render speed dial menu", () => {
				roomPermissions.canEditRoomContent.value = false;
				const { wrapper } = setup();

				const fabButton = wrapper.findComponent(
					"[data-testid='add-content-button']"
				);

				expect(fabButton.exists()).toBe(false);
			});
		});

		describe("and multiple board layouts are enabled", () => {
			beforeEach(() => {
				roomPermissions.canEditRoomContent.value = true;
			});

			const openDialog = async (wrapper: VueWrapper) => {
				await openSpeedDialMenu(wrapper);

				const boardCreateDialogBtn = wrapper.findComponent(
					"[data-testid='fab_button_add_board']"
				);
				await boardCreateDialogBtn.trigger("click");
			};

			it("should render board create button, that opens a dialog", async () => {
				const { wrapper } = setup();
				await openSpeedDialMenu(wrapper);

				const actions = wrapper.findAllComponents({
					name: "SpeedDialMenuAction",
				});
				const boardCreateDialogBtn = wrapper.findComponent(
					"[data-testid='fab_button_add_board']"
				);

				expect(actions).toHaveLength(1);
				expect(boardCreateDialogBtn.exists()).toBe(true);
			});

			it("should open dialog", async () => {
				const { wrapper } = setup();
				await openDialog(wrapper);

				const dialog = wrapper.getComponent(SelectBoardLayoutDialog);

				expect(dialog.isVisible()).toEqual(true);
				expect(dialog.props("modelValue")).toEqual(true);
			});

			describe("and user selects a multi-column layout", () => {
				it("should create a board with multi-column layout", async () => {
					const { wrapper, roomDetailsStore, room } = setup();
					await openDialog(wrapper);

					const selectLayoutDialog = wrapper.findComponent({
						name: "SelectBoardLayoutDialog",
					});
					await selectLayoutDialog.vm.$emit("select", BoardLayout.Columns);

					expect(roomDetailsStore.createBoard).toHaveBeenCalledWith(
						room.id,
						serverApi.BoardLayout.Columns,
						"pages.roomDetails.board.defaultName"
					);
				});
			});

			describe("and user selects a single-column layout", () => {
				it("should create a board with single-column layout", async () => {
					const { wrapper, roomDetailsStore, room } = setup();
					await openDialog(wrapper);

					const selectLayoutDialog = wrapper.findComponent({
						name: "SelectBoardLayoutDialog",
					});
					await selectLayoutDialog.vm.$emit("select", BoardLayout.List);

					expect(roomDetailsStore.createBoard).toHaveBeenCalledWith(
						room.id,
						serverApi.BoardLayout.List,
						"pages.roomDetails.board.defaultName"
					);
				});
			});
		});

		describe("and only column board is enabled", () => {
			beforeEach(() => {
				roomPermissions.canEditRoomContent.value = true;
			});

			it("should not render dialog", () => {
				const { wrapper } = setup({
					envs: { FEATURE_BOARD_LAYOUT_ENABLED: false },
				});

				const dialog = wrapper.findComponent({
					name: "SelectBoardLayoutDialog",
				});

				expect(dialog.exists()).toBe(false);
			});

			it("should render board create button, that creates a multi-column board", async () => {
				const { wrapper } = setup({
					envs: { FEATURE_BOARD_LAYOUT_ENABLED: false },
				});
				await openSpeedDialMenu(wrapper);

				const actions = wrapper.findAllComponents({
					name: "SpeedDialMenuAction",
				});
				const boardCreateBtn = wrapper.findComponent(
					"[data-testid='fab_button_add_column_board']"
				);

				expect(actions).toHaveLength(1);
				expect(boardCreateBtn.exists()).toBe(true);
			});

			it("should create column board", async () => {
				const { wrapper, roomDetailsStore, room } = setup({
					envs: { FEATURE_BOARD_LAYOUT_ENABLED: false },
				});
				await openSpeedDialMenu(wrapper);

				const boardCreateBtn = wrapper.findComponent(
					"[data-testid='fab_button_add_column_board']"
				);

				await boardCreateBtn.trigger("click");

				expect(roomDetailsStore.createBoard).toHaveBeenCalledWith(
					room.id,
					serverApi.BoardLayout.Columns,
					"pages.roomDetails.board.defaultName"
				);
			});
		});
	});

	describe("room boards", () => {
		describe("when user can view room", () => {
			beforeEach(() => {
				roomPermissions.canViewRoom.value = true;
			});

			it("should render room boards", () => {
				const { wrapper } = setup({
					roomBoards: roomBoardTileListFactory.buildList(3),
				});

				const boardTiles = wrapper.findAllComponents({ name: "BoardTile" });

				expect(boardTiles.length).toBe(3);
			});

			describe("when some boards are in draft mode", () => {
				const setupWithBoards = (totalCount = 3, inDraftMode = 1) => {
					const visibleCount = totalCount - inDraftMode;
					const visibleBoards =
						roomBoardTileListFactory.buildList(visibleCount);
					const draftBoards = roomBoardTileListFactory.buildList(inDraftMode, {
						isVisible: false,
					});
					const roomBoards = [...visibleBoards, ...draftBoards];
					const { wrapper } = setup({ roomBoards });
					return {
						wrapper,
						visibleCount,
						draftCount: draftBoards.length,
						totalCount,
					};
				};

				describe("when user can see drafts", () => {
					it("should render board tiles in draft mode", () => {
						roomPermissions.canListDrafts.value = true;
						const { wrapper, totalCount } = setupWithBoards();

						const boardTiles = wrapper.findAllComponents({ name: "BoardTile" });

						expect(boardTiles.length).toStrictEqual(totalCount);
					});
				});

				describe("when user cannot see draft content", () => {
					it("should not render board tiles in draft mode", () => {
						roomPermissions.canListDrafts.value = false;
						const { wrapper, visibleCount } = setupWithBoards();

						const boardTiles = wrapper.findAllComponents({ name: "BoardTile" });

						expect(boardTiles.length).toStrictEqual(visibleCount);
					});
				});
			});
		});

		describe("when user cannot view room", () => {
			it("should not render room boards", () => {
				roomPermissions.canViewRoom.value = false;
				const { wrapper } = setup({
					roomBoards: roomBoardTileListFactory.buildList(3),
				});

				const boardTiles = wrapper.findAllComponents({ name: "BoardTile" });

				expect(boardTiles.length).toBe(0);
			});
		});
	});
});
