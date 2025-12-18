import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { roomFactory } from "@@/tests/test-utils/factory/room/roomFactory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomVariant, useRoomDetailsStore } from "@data-room";
import { RoomDetailsSwitchPage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

describe("@pages/RoomsDetailsSwitch.page.vue", () => {
	const setup = (
		{
			roomVariant,
			isLocked,
		}: {
			roomVariant?: RoomVariant;
			isLocked?: boolean;
		} = { roomVariant: RoomVariant.ROOM, isLocked: false }
	) => {
		const { router } = injectRouterMock(createRouterMock());
		router.setParams({ id: "room-id" });

		const room = roomFactory.build();
		setActivePinia(createTestingPinia());
		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);

		roomDetailsStore.$patch({
			room,
			roomVariant,
			roomBoards: [],
		});

		if (isLocked) {
			roomDetailsStore.fetchRoomAndBoards.mockResolvedValue({
				isLocked: true,
				lockedRoomName: "Locked Room",
			});
		}

		const wrapper = mount(RoomDetailsSwitchPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					CourseRoomDetailsPage: true,
					RoomLockedPage: true,
					RoomDetailsPage: true,
				},
			},
			router,
		});

		return {
			wrapper,
			roomDetailsStore,
		};
	};

	describe("when page is loading", () => {
		it("should render loading state", async () => {
			const { wrapper } = setup();
			const loadingState = wrapper.findComponent({ name: "VProgressCircular" });

			expect(loadingState.exists()).toBe(true);
		});

		it("should fetch room and boards", () => {
			const { roomDetailsStore } = setup();

			expect(roomDetailsStore.fetchRoomAndBoards).toHaveBeenCalled();
		});
	});

	describe("when page was loaded", () => {
		it("should not render a loading indication", async () => {
			const { wrapper } = setup();
			const loadingState = wrapper.findComponent({ name: "VProgressCircular" });

			await nextTick();
			expect(loadingState.exists()).toBe(false);
		});

		describe("and room variant is ROOM", () => {
			it("should render room locked page for locked room", async () => {
				const { wrapper } = setup({
					roomVariant: RoomVariant.ROOM,
					isLocked: true,
				});
				await nextTick();

				expect(wrapper.html()).toBe('<room-locked-page-stub title="Locked Room"></room-locked-page-stub>');
			});

			it("should render room details page", async () => {
				const { wrapper } = setup({
					roomVariant: RoomVariant.ROOM,
				});
				await nextTick();
				expect(wrapper.html()).toBe('<room-details-page-stub room="[object Object]"></room-details-page-stub>');
			});
		});

		describe("and room variant is COURSE_ROOM", () => {
			it("should render course-room details page", async () => {
				const { wrapper } = setup({
					roomVariant: RoomVariant.COURSE_ROOM,
				});
				await nextTick();
				expect(wrapper.html()).toBe("<course-room-details-page-stub></course-room-details-page-stub>");
			});
		});
	});
});
