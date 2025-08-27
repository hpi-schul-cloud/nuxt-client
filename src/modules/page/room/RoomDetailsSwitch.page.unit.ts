import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import { envsFactory, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	RoomVariant,
	useRoomDetailsStore,
	useRoomAuthorization,
} from "@data-room";
import { RoomDetailsSwitchPage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";
import { ref } from "vue";
import setupStores from "@@/tests/test-utils/setupStores";
import { roomFactory } from "@@/tests/test-utils/factory/room/roomFactory";
import { Router, useRoute, useRouter } from "vue-router";
import { createMock } from "@golevelup/ts-vitest";
import { Mock } from "vitest";

vi.mock("vue-router", () => ({
	useRoute: vi.fn(),
	useRouter: vi.fn(),
}));

vi.mock("@data-room/roomAuthorization.composable");
const roomPermissions: ReturnType<typeof useRoomAuthorization> = {
	canAddRoomMembers: ref(false),
	canChangeOwner: ref(false),
	canCreateRoom: ref(false),
	canViewRoom: ref(false),
	canEditRoom: ref(false),
	canDeleteRoom: ref(false),
	canCopyRoom: ref(false),
	canLeaveRoom: ref(false),
	canRemoveRoomMembers: ref(false),
	canEditRoomContent: ref(false),
	canSeeAllStudents: ref(false),
	canShareRoom: ref(false),
	canListDrafts: ref(false),
	canManageRoomInvitationLinks: ref(false),
	canManageVideoconferences: ref(false),
};
(useRoomAuthorization as Mock).mockReturnValue(roomPermissions);

describe("@pages/RoomsDetailsSwitch.page.vue", () => {
	const router = createMock<Router>();
	const useRouteMock = <Mock>useRoute;
	useRouteMock.mockReturnValue({ params: { id: "room-id" }, push: vi.fn() });
	const useRouterMock = <Mock>useRouter;

	beforeEach(() => {
		useRouterMock.mockReturnValue(router);
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = (
		{
			isLoading,
			roomVariant,
			lockedRoomName,
		}: {
			isLoading: boolean;
			roomVariant?: RoomVariant;
			lockedRoomName?: string;
		} = { isLoading: false, roomVariant: RoomVariant.ROOM }
	) => {
		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: envsFactory.build({
				FEATURE_BOARD_LAYOUT_ENABLED: true,
			}),
		});

		const room = roomFactory.build();

		const wrapper = mount(RoomDetailsSwitchPage, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomDetailsStore: {
								isLoading,
								room,
								roomVariant,
								roomBoards: [],
								lockedRoomName,
							},
						},
					}),
				],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
				stubs: {
					CourseRoomDetailsPage: true,
					"RoomLocked.page": true,
					"RoomDetails.page": true,
				},
			},
			router,
		});

		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);

		return {
			wrapper,
			roomDetailsStore,
		};
	};

	describe("when page is loading", () => {
		it("should render loading state", async () => {
			const { wrapper } = setup({ isLoading: true });
			const loadingState = wrapper.findComponent({ name: "VProgressCircular" });

			expect(loadingState.exists()).toBe(true);
		});

		describe("and user has access to rooms", () => {
			it("should fetch room", () => {
				roomPermissions.canCreateRoom.value = true;
				const { roomDetailsStore } = setup({ isLoading: true });

				expect(roomDetailsStore.fetchRoom).toHaveBeenCalled();
			});
		});

		describe("and user does not have access to rooms", () => {
			it("should deactivate room", () => {
				roomPermissions.canCreateRoom.value = false;
				const { roomDetailsStore } = setup({ isLoading: true });

				expect(roomDetailsStore.deactivateRoom).toHaveBeenCalled();
			});
		});
	});

	describe("when page has loaded", () => {
		it("should not render a loading indication", async () => {
			const { wrapper } = setup({ isLoading: false });
			const loadingState = wrapper.findComponent({ name: "VProgressCircular" });

			expect(loadingState.exists()).toBe(false);
		});

		describe("and room variant is ROOM", () => {
			describe("and room is locked", () => {
				it("should render room locked page", () => {
					roomPermissions.canCreateRoom.value = true;
					const { wrapper } = setup({
						isLoading: false,
						roomVariant: RoomVariant.ROOM,
						lockedRoomName: "Locked Room",
					});

					expect(wrapper.html()).toBe(
						'<room-locked.page-stub title="Locked Room"></room-locked.page-stub>'
					);
				});
			});

			describe("and room is not locked", () => {
				it("should render room details page", () => {
					roomPermissions.canCreateRoom.value = true;
					const { wrapper } = setup({
						isLoading: false,
						roomVariant: RoomVariant.ROOM,
					});

					expect(wrapper.html()).toBe(
						'<room-details.page-stub room="[object Object]"></room-details.page-stub>'
					);
				});
			});
		});

		describe("and room variant is COURSE_ROOM", () => {
			it("should render course-room details page", () => {
				roomPermissions.canCreateRoom.value = true;
				const { wrapper } = setup({
					isLoading: false,
					roomVariant: RoomVariant.COURSE_ROOM,
				});

				expect(wrapper.html()).toBe(
					"<course-room-details-page-stub></course-room-details-page-stub>"
				);
			});
		});
	});
});
