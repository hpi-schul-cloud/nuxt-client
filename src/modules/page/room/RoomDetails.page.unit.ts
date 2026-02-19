import * as serverApi from "@/serverApi/v3/api";
import ShareModule from "@/store/share";
import { BoardLayout } from "@/types/board/Board";
import { RoomBoardItem } from "@/types/room/Room";
import { SHARE_MODULE_KEY } from "@/utils/inject";
import { createTestAppStore, createTestRoomStore, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { roomBoardGridItemFactory, roomFactory } from "@@/tests/test-utils/factory/room";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomVariant, useRoomDetailsStore } from "@data-room";
import { RoomContentGrid, RoomMenu } from "@feature-room";
import { RoomDetailsPage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { EmptyState } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
import { LeaveRoomProhibitedDialog, SelectBoardLayoutDialog } from "@ui-room-details";
import { VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { useRouter } from "vue-router";
import { VBreadcrumbsItem, VBtn, VCard, VFab } from "vuetify/components";

vi.mock("vue-router", () => ({
	useRouter: vi.fn().mockReturnValue({
		push: vi.fn(),
	}),
}));

vi.mock("@data-room/Rooms.state");

vi.mock("@ui-confirmation-dialog");
vi.mocked(useConfirmationDialog);

describe("@pages/RoomsDetails.page.vue", () => {
	let askConfirmationMock: Mock;

	beforeEach(() => {
		vi.useFakeTimers();

		askConfirmationMock = vi.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (
		options?: Partial<{
			roomBoards: RoomBoardItem[];
			allowedOperations: Partial<serverApi.RoomItemResponseAllowedOperations> | undefined;
		}>
	) => {
		const { roomBoards } = {
			roomBoards: [],
			...options,
		};

		const shareModule = createModuleMocks(ShareModule, {
			getIsShareModalOpen: false,
			getParentType: serverApi.ShareTokenBodyParamsParentTypeEnum.Room,
		});

		const room = roomFactory.build({ allowedOperations: options?.allowedOperations });

		setActivePinia(createTestingPinia());
		const { roomStore } = createTestRoomStore();

		useRoomDetailsStore().$patch({
			isLoading: false,
			room,
			roomVariant: RoomVariant.ROOM,
			roomBoards,
		});

		createTestAppStore({ me: { user: { id: "user-id" }, roles: [{ id: "teacher", name: "teacher" }] } });

		const wrapper = mount(RoomDetailsPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { LeaveRoomProhibitedDialog: true, UseFocusTrap: true, RoomContentGrid: true },
				provide: {
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
			roomStore,
		};
	};

	describe("when page is mounted", () => {
		it("should set the page title", () => {
			const { room } = setup();

			expect(document.title).toContain(`${room.name} - ${"pages.roomDetails.title"}`);
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
				const breadcrumbItems = breadcrumbs.findAllComponents(VBreadcrumbsItem);

				expect(breadcrumbItems).toHaveLength(2);
				expect(breadcrumbItems[1].text()).toContain(room.name);
			});
		});
	});

	describe("when user deletes the room", () => {
		it("should reroute to rooms overview page", async () => {
			const { wrapper, router } = setup({ allowedOperations: { accessRoom: true, deleteRoom: true } });

			const menu = wrapper.getComponent({ name: "RoomMenu" });
			await menu.vm.$emit("room:delete");

			expect(router.push).toHaveBeenCalledWith({
				name: "rooms",
			});
		});
	});

	describe("when using the menu", () => {
		describe("and user clicks on edit room", () => {
			it("should navigate to the edit room page", () => {
				const { wrapper, router, room } = setup({
					allowedOperations: { accessRoom: true, updateRoom: true, deleteRoom: true, editContent: true },
				});

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
			it("should navigate to the member management page", () => {
				const { wrapper, router, room } = setup({
					allowedOperations: { accessRoom: true, updateRoom: true, deleteRoom: true, editContent: true },
				});

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
					const { wrapper, roomStore } = setup({
						allowedOperations: { accessRoom: true, leaveRoom: true, viewContent: true },
					});

					const menu = wrapper.getComponent(RoomMenu);
					await menu.vm.$emit("room:leave");

					expect(roomStore.leaveRoom).toHaveBeenCalled();
				});

				it("should not call leaveRoom when dialog canceled", () => {
					askConfirmationMock.mockResolvedValue(false);
					const { wrapper, roomStore } = setup({ allowedOperations: { accessRoom: true, leaveRoom: true } });

					const menu = wrapper.getComponent(RoomMenu);
					menu.vm.$emit("room:leave");

					expect(roomStore.leaveRoom).not.toHaveBeenCalled();
				});
			});

			describe("when user has not the permission to leave the room", () => {
				it("should open leave room prohibited dialog", async () => {
					const { wrapper } = setup({ allowedOperations: { accessRoom: true, leaveRoom: false } });

					const menu = wrapper.getComponent(RoomMenu);
					await menu.vm.$emit("room:leave");
					const leaveRoomProhibitedDialog = wrapper.getComponent(LeaveRoomProhibitedDialog);

					expect(leaveRoomProhibitedDialog.isVisible()).toBe(true);
					expect(leaveRoomProhibitedDialog.props("modelValue")).toEqual(true);
				});
			});
		});
	});

	describe("when user wants to create a board", () => {
		describe("and user does not have permission to edit room content", () => {
			it("should not render fa button", () => {
				const { wrapper } = setup({ allowedOperations: { accessRoom: true, editContent: false } });

				const fabButton = wrapper.findComponent("[data-testid='add-content-button']");
				expect(fabButton.exists()).toBe(false);
			});
		});

		const openDialog = async (wrapper: VueWrapper) => {
			const fab = wrapper.getComponent(VFab).getComponent(VBtn);
			await fab.trigger("click");
		};

		it("should render fab button when user has edit permissions", () => {
			const { wrapper } = setup({ allowedOperations: { accessRoom: true, editContent: true } });

			const wireframe = wrapper.getComponent(DefaultWireframe);
			const fabItems = wireframe.props("fabItems");

			expect(fabItems).toBeDefined();
		});

		it("should open dialog when fab button is clicked", async () => {
			const { wrapper } = setup({ allowedOperations: { accessRoom: true, editContent: true } });
			await openDialog(wrapper);

			const dialog = wrapper.findComponent(SelectBoardLayoutDialog).findComponent(VCard);
			expect(dialog.exists()).toBe(true);
		});

		describe("and user selects a multi-column layout", () => {
			it("should create a board with multi-column layout", async () => {
				const { wrapper, roomDetailsStore, room } = setup({
					allowedOperations: { accessRoom: true, editContent: true },
				});
				await openDialog(wrapper);

				const selectLayoutDialog = wrapper.getComponent(SelectBoardLayoutDialog);
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
				const { wrapper, roomDetailsStore, room } = setup({
					allowedOperations: { accessRoom: true, editContent: true },
				});
				await openDialog(wrapper);
				const selectLayoutDialog = wrapper.getComponent(SelectBoardLayoutDialog);
				await selectLayoutDialog.vm.$emit("select", BoardLayout.List);

				expect(roomDetailsStore.createBoard).toHaveBeenCalledWith(
					room.id,
					serverApi.BoardLayout.List,
					"pages.roomDetails.board.defaultName"
				);
			});
		});
	});

	describe("room boards", () => {
		describe("when user can view room", () => {
			it("should render room boards", () => {
				const { wrapper } = setup({
					roomBoards: roomBoardGridItemFactory.buildList(3),
					allowedOperations: { accessRoom: true, viewContent: true },
				});

				const boardGrid = wrapper.findComponent(RoomContentGrid);
				expect(boardGrid.props("boards").length).toEqual(3);
			});

			describe("when some boards are in draft mode", () => {
				const setupWithBoards = (options: {
					allowedOperations: Partial<serverApi.RoomItemResponseAllowedOperations> | undefined;
				}) => {
					const totalCount = 3;
					const inDraftMode = 1;
					const visibleCount = totalCount - inDraftMode;
					const visibleBoards = roomBoardGridItemFactory.buildList(visibleCount);
					const draftBoards = roomBoardGridItemFactory.buildList(inDraftMode, {
						isVisible: false,
					});
					const roomBoards = [...visibleBoards, ...draftBoards];
					const { wrapper } = setup({ roomBoards, allowedOperations: options.allowedOperations });
					return {
						wrapper,
						visibleCount,
						draftCount: draftBoards.length,
						totalCount,
					};
				};

				describe("when user can see drafts", () => {
					it("should render board tiles in draft mode", () => {
						const { wrapper, totalCount } = setupWithBoards({
							allowedOperations: { accessRoom: true, viewContent: true, viewDraftContent: true },
						});

						const boardGrid = wrapper.findComponent(RoomContentGrid);

						expect(boardGrid.props("boards").length).toStrictEqual(totalCount);
					});
				});

				describe("when user cannot see draft content", () => {
					it("should not render board tiles in draft mode", () => {
						const { wrapper, visibleCount } = setupWithBoards({
							allowedOperations: { accessRoom: true, viewContent: true, viewDraftContent: false },
						});
						const boardGrid = wrapper.findComponent(RoomContentGrid);

						expect(boardGrid.props("boards").length).toStrictEqual(visibleCount);
					});
				});
			});
		});

		describe("when user cannot view room", () => {
			it("should not render room boards", () => {
				const { wrapper } = setup({
					roomBoards: roomBoardGridItemFactory.buildList(3),
					allowedOperations: { accessRoom: false },
				});

				const boardGrid = wrapper.findComponent(RoomContentGrid);

				expect(boardGrid.props("boards").length).toBe(0);
			});
		});
	});
});
