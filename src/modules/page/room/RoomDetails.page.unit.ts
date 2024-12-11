import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import { envsFactory, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomVariant, useRoomDetailsStore } from "@data-room";
import { RoomDetailsPage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";
import { ref, Ref } from "vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import setupStores from "@@/tests/test-utils/setupStores";
import { roomFactory } from "@@/tests/test-utils/factory/room";
import { useRouter } from "vue-router";
import { RoomColorEnum } from "@/types/room/Room";
import { useRoomAuthorization } from "@feature-room";

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
		// 	getUserPermissions: permissions || [],
		// });

		const room = roomFactory.build();

		const wrapper = mount(RoomDetailsPage, {
			// attachTo: document.body,
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
					// [AUTH_MODULE_KEY.valueOf()]: authModule,
				},
				stubs: {
					SelectBoardLayoutDialog: true,
					CourseRoomDetailsPage: true,
				},
			},
		});

		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);

		if (undefinedRoom) {
			roomDetailsStore.room = undefined;
		}

		const wrapperVM = wrapper.vm as unknown as {
			room: {
				id: string;
				name: string;
				color: RoomColorEnum;
				createdAt: string;
				updatedAt: string;
			};
			pageTitle: string;
			breadcrumbs: Breadcrumb[];
			fabItems: {
				icon: string;
				title: string;
				ariaLabel: string;
				testId: string;
			}[];
			isMembersDialogOpen: boolean;
			isRoom: Ref<boolean>;
			onFabClick: ReturnType<typeof jest.fn>;
			boardLayoutsEnabled: Ref<boolean>;
		};

		return {
			wrapper,
			roomDetailsStore,
			room,
			wrapperVM,
			router: useRouter(),
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
			it.todo("should open confirmation dialog");

			it.todo("should open confirmation dialog");
		});
	});

	describe("when user wants to create a board", () => {
		describe("and user does not have 'room_create' permission", () => {
			it("should not render fab button", () => {
				roomPermissions.canCreateRoom.value = false;

				const { wrapper } = setup();

				const fabButton = wrapper.findComponent(
					"[data-testid='add-content-button']"
				);

				expect(fabButton.exists()).toBe(false);
			});
		});

		describe("and multiple board layouts are enabled", () => {
			it.todo("should render board create button, that opens a dialog");
			it.todo("should open dialog");
			it.todo("should create column board");
			it.todo("should create list board");
		});
	});

	// describe("when not loading", () => {
	// 	describe("when roomVariant is valid", () => {
	// 		describe("when user clicks on add content button", () => {
	// 			it("should open the select layout dialog", async () => {
	// 				const { wrapper } = setup({
	// 					isLoading: false,
	// 					roomVariant: RoomVariant.ROOM,
	// 					permissions: ["room_create"],
	// 				});

	// 				await flushPromises();
	// 				const defaultWireframe = wrapper.findComponent(DefaultWireframe);
	// 				defaultWireframe.vm.$emit("onFabItemClick", "board-type-dialog-open");

	// 				const selectLayoutDialog = wrapper.findComponent({
	// 					name: "SelectBoardLayoutDialog",
	// 				});
	// 				expect(selectLayoutDialog.exists()).toBe(true);
	// 			});
	// 		});

	// 		describe("when user creates a new board", () => {
	// 			it.each([
	// 				{ event: "multi-column", layout: "columns" },
	// 				{ event: "single-column", layout: "list" },
	// 			])(
	// 				"should have a '$layout'-layout when '$event' was chosen",
	// 				async ({ event, layout }) => {
	// 					roomPermissions.canEditRoom.value = true;

	// 					const { wrapper } = setup({
	// 						isLoading: false,
	// 						roomVariant: RoomVariant.ROOM,
	// 						permissions: ["room_create"],
	// 					});

	// 					await flushPromises();

	// 					const mockApi = {
	// 						boardControllerCreateBoard: jest
	// 							.fn()
	// 							.mockResolvedValue({ data: { id: "board-id" } }),
	// 					};
	// 					const spy = jest
	// 						.spyOn(serverApi, "BoardApiFactory")
	// 						.mockReturnValue(
	// 							mockApi as unknown as serverApi.BoardApiInterface
	// 						);

	// 					const selectLayoutDialog = wrapper.findComponent({
	// 						name: "SelectBoardLayoutDialog",
	// 					});

	// 					await selectLayoutDialog.vm.$emit(`select:${event}`);

	// 					expect(mockApi.boardControllerCreateBoard).toHaveBeenCalledTimes(1);
	// 					expect(mockApi.boardControllerCreateBoard).toHaveBeenCalledWith(
	// 						expect.objectContaining({ layout })
	// 					);

	// 					spy.mockRestore();
	// 				}
	// 			);
	// 		});
});
