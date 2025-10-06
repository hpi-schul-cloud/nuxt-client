import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { roomFactory } from "@@/tests/test-utils/factory/room/roomFactory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomVariant, useRoomDetailsStore } from "@data-room";
import { createMock } from "@golevelup/ts-vitest";
import { RoomDetailsSwitchPage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";
import { Mock } from "vitest";
import { Router, useRoute, useRouter } from "vue-router";

vi.mock("vue-router", () => ({
	useRoute: vi.fn(),
	useRouter: vi.fn(),
}));

describe("@pages/RoomsDetailsSwitch.page.vue", () => {
	const router = createMock<Router>();
	const useRouteMock = <Mock>useRoute;
	useRouteMock.mockReturnValue({ params: { id: "room-id" }, push: vi.fn() });
	const useRouterMock = <Mock>useRouter;

	beforeEach(() => {
		useRouterMock.mockReturnValue(router);
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

		it("should fetch room", () => {
			const { roomDetailsStore } = setup({ isLoading: true });

			expect(roomDetailsStore.fetchRoom).toHaveBeenCalled();
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
					const { wrapper } = setup({
						isLoading: false,
						roomVariant: RoomVariant.ROOM,
						lockedRoomName: "Locked Room",
					});

					expect(wrapper.html()).toBe('<room-locked.page-stub title="Locked Room"></room-locked.page-stub>');
				});
			});

			describe("and room is not locked", () => {
				it("should render room details page", () => {
					const { wrapper } = setup({
						isLoading: false,
						roomVariant: RoomVariant.ROOM,
					});

					expect(wrapper.html()).toBe('<room-details.page-stub room="[object Object]"></room-details.page-stub>');
				});
			});
		});

		describe("and room variant is COURSE_ROOM", () => {
			it("should render course-room details page", () => {
				const { wrapper } = setup({
					isLoading: false,
					roomVariant: RoomVariant.COURSE_ROOM,
				});

				expect(wrapper.html()).toBe("<course-room-details-page-stub></course-room-details-page-stub>");
			});
		});
	});
});
