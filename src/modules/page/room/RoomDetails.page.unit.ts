import * as serverApi from "@/serverApi/v3/api";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomColor } from "@/serverApi/v3";
import { AUTH_MODULE_KEY, ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
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
import AuthModule from "@/store/auth";
import { Ref } from "vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import setupStores from "@@/tests/test-utils/setupStores";
import { useRoute, useRouter } from "vue-router";

import { roomDetailsFactory } from "@@/tests/test-utils/factory/roomDetailsFactory";
import { flushPromises } from "@vue/test-utils";

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;
const useRouteMock = <jest.Mock>useRoute;
useRouteMock.mockReturnValue({ params: { id: "room-id" }, push: jest.fn() });
useRouterMock.mockReturnValue({ push: jest.fn() });

describe("@pages/RoomsDetails.page.vue", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = (
		{
			isLoading,
			roomVariant,
			envs,
			isTeacher,
			hasEditPermission,
		}: {
			isLoading: boolean;
			roomVariant?: RoomVariant;
			envs?: Record<string, unknown>;
			isTeacher?: boolean;
			hasEditPermission?: boolean;
		} = { isLoading: false, roomVariant: RoomVariant.ROOM }
	) => {
		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: envsFactory.build({
				FEATURE_BOARD_LAYOUT_ENABLED: true,
				FEATURE_ROOMS_ENABLED: true,
				...envs,
			}),
		});

		const authModule = createModuleMocks(AuthModule, {
			getUserPermissions: !hasEditPermission ? ["course_edit"] : [],
			getUserRoles: !isTeacher ? ["teacher"] : [],
		});

		const wrapper = shallowMount(RoomDetailsPage, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia(),
				],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
				stubs: {
					SelectBoardLayoutDialog: true,
					CourseRoomDetailsPage: true,
				},
			},
		});

		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		const room = roomDetailsFactory.build();
		roomDetailsStore.room = room;
		roomDetailsStore.roomVariant = roomVariant;
		roomDetailsStore.isLoading = isLoading;
		roomDetailsStore.roomBoards = [];

		const wrapperVM = wrapper.vm as unknown as {
			room: {
				id: string;
				name: string;
				color: RoomColor;
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
			wrapperVM,
		};
	};

	describe("when page is mounted", () => {
		it("should be rendered in DOM", () => {
			const { wrapper } = setup();

			expect(wrapper.vm).toBeDefined();
		});

		it("should render DefaultWireframe", () => {
			const { wrapper } = setup();

			const defaultWireframe = wrapper.findComponent(DefaultWireframe);
			expect(defaultWireframe).toBeDefined();
		});

		describe("breadcrumbs", () => {
			it("should have elements inside the list", () => {
				const { wrapperVM } = setup();

				expect(wrapperVM.breadcrumbs).toHaveLength(2);
				expect(wrapperVM.breadcrumbs[0].title).toContain("pages.rooms.title");
			});

			describe("when room is undefined", () => {
				it("should not have any element inside the list", () => {
					const { wrapperVM, roomDetailsStore } = setup();
					roomDetailsStore.room = undefined;
					expect(wrapperVM.breadcrumbs).toHaveLength(0);
				});
			});
		});

		describe("pageTitle", () => {
			it("should set the page title", async () => {
				const { wrapperVM } = setup();
				expect(wrapperVM.pageTitle).toContain("pages.roomDetails.title");
			});
		});

		describe("boardLayoutsEnabled", () => {
			it("should be true", () => {
				const { wrapperVM } = setup();
				expect(wrapperVM.boardLayoutsEnabled).toBe(true);
			});

			it("should be false", () => {
				const { wrapperVM } = setup({
					envs: { FEATURE_BOARD_LAYOUT_ENABLED: false },
					isLoading: false,
				});
				expect(wrapperVM.boardLayoutsEnabled).toBe(false);
			});
		});

		describe("when FEATURE_ROOMS_ENABLED flag is set true", () => {
			it("should call fetchRoom on mounted", () => {
				const { roomDetailsStore } = setup();

				expect(roomDetailsStore.fetchRoom).toHaveBeenCalledWith("room-id");
				expect(roomDetailsStore.deactivateRoom).not.toHaveBeenCalled();
			});
		});

		describe("when FEATURE_ROOMS_ENABLED flag is set false", () => {
			it("should not call fetchRoom on mounted", () => {
				const { roomDetailsStore } = setup({
					envs: { FEATURE_ROOMS_ENABLED: false },
					isLoading: false,
				});

				expect(roomDetailsStore.deactivateRoom).toHaveBeenCalled();
				expect(roomDetailsStore.fetchRoom).not.toHaveBeenCalled();
			});
		});
	});

	describe("when loading", () => {
		it("should render a loading indication", () => {
			const { wrapper } = setup({ isLoading: true });

			const div = wrapper.find("[data-testid=loading]");
			expect(div.exists()).toBe(true);
		});
	});

	describe("when roomVariant is invalid", () => {
		it("should not render RoomDetails", () => {
			const { wrapper } = setup({
				roomVariant: RoomVariant.COURSE_ROOM,
				isLoading: false,
			});

			const roomDetailsComponent = wrapper.findComponent({
				name: "RoomDetails",
			});
			expect(roomDetailsComponent.exists()).toBe(false);
		});
	});

	describe("when not loading", () => {
		it("should not render a loading indication", async () => {
			const { wrapper } = setup({ isLoading: false });
			await flushPromises();

			const div = wrapper.find('[data-testid="loading"]');
			expect(div.exists()).toBe(false);
		});

		describe("when roomVariant is valid", () => {
			it("should render DefaultLayout ", async () => {
				const { wrapper } = setup({
					isLoading: false,
					roomVariant: RoomVariant.ROOM,
				});
				await flushPromises();

				const defaultWireframe = wrapper.findComponent(DefaultWireframe);
				expect(defaultWireframe.exists()).toBe(true);
			});

			describe("when user clicks on add content button", () => {
				it("should open the select layout dialog", async () => {
					const { wrapper } = setup({
						isLoading: false,
						roomVariant: RoomVariant.ROOM,
					});

					await flushPromises();
					const defaultWireframe = wrapper.findComponent(DefaultWireframe);
					defaultWireframe.vm.$emit("fabItemClick", "board-type-dialog-open");
					// const fabButton = wrapper.find("[data-testid=add-content-button]");
					// await fabButton.trigger("click");

					// const createBoardButton = wrapper.find(
					// 	"[data-testid=add-content-button]"
					// );
					// await createBoardButton.trigger("click");

					const selectLayoutDialog = wrapper.findComponent({
						name: "SelectBoardLayoutDialog",
					});
					expect(selectLayoutDialog.exists()).toBe(true);
				});
			});

			describe("when user creates a new board", () => {
				it.each([
					{ event: "multi-column", layout: "columns" },
					{ event: "single-column", layout: "list" },
				])(
					"should have a '$layout'-layout when '$event' was chosen",
					async ({ event, layout }) => {
						const { wrapper } = setup({
							isLoading: false,
							roomVariant: RoomVariant.ROOM,
						});

						await flushPromises();

						const mockApi = {
							boardControllerCreateBoard: jest
								.fn()
								.mockResolvedValue({ data: { id: "board-id" } }),
						};
						const spy = jest
							.spyOn(serverApi, "BoardApiFactory")
							.mockReturnValue(
								mockApi as unknown as serverApi.BoardApiInterface
							);

						// const addContentButton = wrapper.findComponent(
						// 	"[data-testid=add-content-button]"
						// );
						// await addContentButton.trigger("click");

						const selectLayoutDialog = wrapper.findComponent({
							name: "SelectBoardLayoutDialog",
						});

						// await nextTick();

						// const selectLayoutDialog = wrapper.findComponent({
						// 	name: "SelectBoardLayoutDialog",
						// });
						await selectLayoutDialog.vm.$emit(`select:${event}`);

						expect(mockApi.boardControllerCreateBoard).toHaveBeenCalledTimes(1);
						expect(mockApi.boardControllerCreateBoard).toHaveBeenCalledWith(
							expect.objectContaining({ layout })
						);

						spy.mockRestore();
					}
				);
			});
		});
	});
});
