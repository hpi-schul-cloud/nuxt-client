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
import { nextTick } from "vue";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import setupStores from "@@/tests/test-utils/setupStores";
import { Router, useRoute, useRouter } from "vue-router";
import { createMock, DeepMocked } from "@golevelup/ts-jest";

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;
const useRouteMock = <jest.Mock>useRoute;
useRouteMock.mockReturnValue({ params: { id: "room-id" } });

const authModule = createModuleMocks(AuthModule, {
	getUserPermissions: ["course_edit"],
	getUserRoles: ["teacher"],
});

jest.mock("vue-router", () => ({
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
	}),
	useRoute: jest.fn().mockReturnValue({
		params: {
			id: "test-123",
		},
	}),
}));

describe("@pages/RoomsDetails.page.vue", () => {
	let router: DeepMocked<Router>;
	let route: DeepMocked<ReturnType<typeof useRoute>>;

	beforeEach(() => {
		route = createMock<ReturnType<typeof useRoute>>();
		useRouteMock.mockReturnValue(route);
		useRouteMock.mockReturnValue({ params: { id: "room-id" } });

		router = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = (
		{
			isLoading,
			roomVariant,
			envs,
		}: {
			isLoading: boolean;
			roomVariant?: RoomVariant;
			envs?: Record<string, unknown>;
		} = { isLoading: false }
	) => {
		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: envsFactory.build({
				FEATURE_BOARD_LAYOUT_ENABLED: true,
				FEATURE_ROOMS_ENABLED: true,
				...envs,
			}),
		});

		const wrapper = mount(RoomDetailsPage, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomDetailsStore: {
								isLoading,
								room: {
									id: "1",
									name: "Room 1",
									color: RoomColor.BlueGrey,
									createdAt: new Date().toString(),
									updatedAt: new Date().toString(),
								},
								roomVariant,
							},
						},
					}),
					vueDompurifyHTMLPlugin,
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
			fabItem: {
				icon: string;
				title: string;
				ariaLabel: string;
				testId: string;
			};
			isMembersDialogOpen: boolean;
			onFabClick: ReturnType<typeof jest.fn>;
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
			const { wrapper } = setup();
			// roomVariant: undefined,
			// room: mockRoomDetails,

			const roomDetailsComponent = wrapper.findComponent({
				name: "RoomDetails",
			});
			expect(roomDetailsComponent.exists()).toBe(false);
		});
	});

	describe("when not loading", () => {
		it("should not render a loading indication", () => {
			const { wrapper } = setup({ isLoading: false });

			const div = wrapper.find("[data-testid=loading]");
			expect(div.exists()).toBe(false);
		});

		describe("when roomVariant is valid", () => {
			it("should render DefaultLayout ", () => {
				const { wrapper } = setup({
					isLoading: false,
					roomVariant: RoomVariant.ROOM,
				});

				const defaultWireframe = wrapper.findComponent(DefaultWireframe);
				expect(defaultWireframe.exists()).toBe(true);
			});

			describe("when user clicks on add content button", () => {
				it("should open the select layout dialog", async () => {
					const { wrapper } = setup({
						isLoading: false,
						roomVariant: RoomVariant.ROOM,
					});

					const fabButton = wrapper.find("[data-testid=add-content-button]");
					await fabButton.trigger("click");

					const createBoardButton = wrapper.find(
						"[data-testid=add-content-button]"
					);
					await createBoardButton.trigger("click");

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

						const addContentButton = wrapper.findComponent(
							"[data-testid=add-content-button]"
						);
						await addContentButton.trigger("click");

						await nextTick();

						const selectLayoutDialog = wrapper.findComponent({
							name: "SelectBoardLayoutDialog",
						});
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
