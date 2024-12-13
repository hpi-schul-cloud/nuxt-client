import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import { envsFactory, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomVariant, useRoomDetailsStore, useRoomsState } from "@data-room";
import { RoomDetailsPage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";
import { ref } from "vue";
import setupStores from "@@/tests/test-utils/setupStores";
import { roomFactory } from "@@/tests/test-utils/factory/room";
import { useRouter } from "vue-router";
import { useRoomAuthorization } from "@feature-room";
import { flushPromises, VueWrapper } from "@vue/test-utils";
import * as serverApi from "@/serverApi/v3/api";
import { createMock } from "@golevelup/ts-jest";

jest.mock("vue-router", () => ({
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
	}),
}));

jest.mock("@feature-room/roomAuthorization.composable");
const roomPermissions: ReturnType<typeof useRoomAuthorization> = {
	canCreateRoom: ref(false),
	canViewRoom: ref(false),
	canEditRoom: ref(false),
	canDeleteRoom: ref(false),
};
(useRoomAuthorization as jest.Mock).mockReturnValue(roomPermissions);

describe("@pages/RoomsDetails.page.vue", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = (
		{
			undefinedRoom,
			envs,
		}: {
			undefinedRoom?: boolean;
			envs?: Record<string, unknown>;
		} = { undefinedRoom: false }
	) => {
		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: envsFactory.build({
				FEATURE_BOARD_LAYOUT_ENABLED: true,
				FEATURE_ROOMS_ENABLED: true,
				...envs,
			}),
		});

		const useRoomsStateMock = createMock<ReturnType<typeof useRoomsState>>({
			isLoading: ref(false),
			isEmpty: ref(false),
			rooms: ref([]),
			fetchRooms: jest.fn(),
			deleteRoom: jest.fn(),
		});

		jest.mocked(useRoomsState).mockReturnValue(useRoomsStateMock);

		const room = roomFactory.build();

		const wrapper = mount(RoomDetailsPage, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomDetailsStore: {
								isLoading: false,
								room: undefinedRoom ? undefined : room,
								roomVariant: RoomVariant.ROOM,
								roomBoards: [],
							},
						},
					}),
				],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
			},
		});

		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);

		if (undefinedRoom) {
			roomDetailsStore.room = undefined;
		}

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

		describe("and room is undefined", () => {
			it("should render breadcrumbs with default name", () => {
				const { wrapper } = setup({ undefinedRoom: true });

				const breadcrumbs = wrapper.getComponent({ name: "Breadcrumbs" });

				const breadcrumbItems = breadcrumbs.findAllComponents({
					name: "v-breadcrumbs-item",
				});

				expect(breadcrumbItems).toHaveLength(2);
				expect(breadcrumbItems[1].text()).toContain("pages.roomDetails.title");
			});
		});

		describe("and user has permission to edit or delete room", () => {
			it("should render kebab menu", () => {
				roomPermissions.canEditRoom.value = true;
				roomPermissions.canDeleteRoom.value = false;

				const { wrapper } = setup();

				const menu = wrapper.findComponent({ name: "RoomMenu" });

				expect(menu.exists()).toBe(true);
			});
		});

		describe("and user does not have permission to edit nor to delete room", () => {
			it("should not render kebab menu", () => {
				roomPermissions.canEditRoom.value = false;
				roomPermissions.canDeleteRoom.value = false;

				const { wrapper } = setup();

				const menu = wrapper.findComponent({ name: "RoomMenu" });

				expect(menu.exists()).toBe(false);
			});
		});
	});

	describe("when using the menu", () => {
		beforeEach(() => {
			roomPermissions.canEditRoom.value = true;
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

		describe("and user clicks on delete room", () => {
			it.only("should open confirmation dialog", async () => {
				const { wrapper, useRoomsStateMock } = setup();

				const menu = wrapper.getComponent({ name: "RoomMenu" });
				await menu.vm.$emit("room:delete");

				const confirmBtn = wrapper.findComponent(
					"[data-testid='dialog-confirm']"
				);

				await confirmBtn.trigger("click");
				console.log(confirmBtn.html());

				expect(useRoomsStateMock.deleteRoom).toHaveBeenCalled();
				// expect(dialog.props()["data-testid"]).toBe("delete-dialog-item");
			});

			it.todo("should delete room");
		});
	});

	describe("when user wants to create a board", () => {
		const openSpeedDialMenu = async (wrapper: VueWrapper) => {
			const speedDialMenu = wrapper.getComponent({ name: "speed-dial-menu" });
			await speedDialMenu.getComponent({ name: "v-btn" }).trigger("click");
			await flushPromises();
		};

		describe("and user does not have 'room_create' permission", () => {
			it("should not render speed dial menu", () => {
				roomPermissions.canCreateRoom.value = false;
				const { wrapper } = setup();

				const fabButton = wrapper.findComponent(
					"[data-testid='add-content-button']"
				);

				expect(fabButton.exists()).toBe(false);
			});
		});

		describe("and multiple board layouts are enabled", () => {
			beforeEach(() => {
				roomPermissions.canCreateRoom.value = true;
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

				const dialog = wrapper.getComponent({
					name: "SelectBoardLayoutDialog",
				});
				const dialogContent = dialog.findComponent({
					name: "VCard",
				});

				expect(dialogContent.exists()).toBe(true);
			});

			// TODO - make this work
			it.each([{ layout: "multi-column" }, { layout: "single-column" }])(
				"should create board with '$layout' layout",
				async ({ layout }) => {
					const { wrapper } = setup();

					await flushPromises();

					const mockApi = {
						boardControllerCreateBoard: jest
							.fn()
							.mockResolvedValue({ data: { id: "board-id" } }),
					};
					const spy = jest
						.spyOn(serverApi, "BoardApiFactory")
						.mockReturnValue(mockApi as unknown as serverApi.BoardApiInterface);

					const selectLayoutDialog = wrapper.findComponent({
						name: "SelectBoardLayoutDialog",
					});

					await selectLayoutDialog.vm.$emit(`select:${layout}`);

					expect(mockApi.boardControllerCreateBoard).toHaveBeenCalledTimes(1);
					expect(mockApi.boardControllerCreateBoard).toHaveBeenCalledWith(
						expect.objectContaining({ layout })
					);

					spy.mockRestore();
				}
			);
		});

		describe("and only column board is enabled", () => {
			beforeEach(() => {
				roomPermissions.canCreateRoom.value = true;
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

			it.todo("should create column board");
		});
	});
});
