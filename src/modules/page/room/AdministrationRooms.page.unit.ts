import AdministrationRoomsPage from "./AdministrationRooms.page.vue";
import { createTestEnvStore, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAdministrationRoomStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

describe("AdministrationRooms.page", () => {
	const setup = (options?: { isEmptyList?: boolean; featureFlag?: boolean }) => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({
			FEATURE_ADMINISTRATE_ROOMS_ENABLED: options?.featureFlag ?? true,
		});
		const { router } = injectRouterMock(createRouterMock());

		const adminRoomStore = mockedPiniaStoreTyping(useAdministrationRoomStore);
		adminRoomStore.$patch({
			roomList: [],
			isLoading: false,
			isEmptyList: options?.isEmptyList ?? false,
		});

		const wrapper = mount(AdministrationRoomsPage, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
		});

		return {
			wrapper,
			adminRoomStore,
			router,
		};
	};

	describe("rendering", () => {
		it("should render the page and Table component ", () => {
			const { wrapper } = setup();
			const roomAdminTable = wrapper.findComponent({ name: "RoomAdminTable" });
			const emptyStateComponent = wrapper.findComponent({ name: "EmptyState" });

			expect(wrapper.exists()).toBe(true);
			expect(roomAdminTable.exists()).toBe(true);
			expect(emptyStateComponent.exists()).toBe(false);
		});

		it("should render the EmptyState component when isEmptyList is true", () => {
			const { wrapper } = setup({ isEmptyList: true });
			const roomAdminTable = wrapper.findComponent({ name: "RoomAdminTable" });
			const emptyStateComponent = wrapper.findComponent({ name: "EmptyState" });

			expect(wrapper.exists()).toBe(true);
			expect(roomAdminTable.exists()).toBe(false);
			expect(emptyStateComponent.exists()).toBe(true);
		});

		it("should call fetchRooms on mount", async () => {
			const { adminRoomStore } = setup();
			await nextTick();

			expect(adminRoomStore.fetchRooms).toHaveBeenCalled();
		});
	});

	describe("routing", () => {
		it("should navigate to room details on room click", async () => {
			const { wrapper, router } = setup({ featureFlag: true });
			const roomId = "room-id";

			const roomAdminTable = wrapper.findComponent({ name: "RoomAdminTable" });
			await roomAdminTable.vm.$emit("manage-room-members", roomId);

			const expectedRoute = {
				name: "administration-rooms-manage-members",
				params: { roomId },
			};

			expect(router.push).toHaveBeenCalledWith(expectedRoute);
		});

		it("should navigate to dashboard if feature is disabled", async () => {
			const mockReplace = vi.fn();
			Object.defineProperty(window, "location", {
				configurable: true,
				value: { replace: mockReplace },
			});

			setup({ featureFlag: false });
			await nextTick();

			expect(mockReplace).toHaveBeenCalledWith("/dashboard");
		});
	});
});
