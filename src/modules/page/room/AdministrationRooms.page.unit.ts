import AdministrationRoomsPage from "./AdministrationRooms.page.vue";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import { createTestEnvStore, mockedPiniaStoreTyping, schoolFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { useAdministrationRoomStore } from "@data-room";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { nextTick } from "vue";
import { Router, useRouter } from "vue-router";

vi.mock("vue-router", () => ({
	useRoute: vi.fn(),
	useRouter: vi.fn(),
}));
const useRouterMock = <Mock>useRouter;

describe("AdministrationRooms.page", () => {
	const ownSchool = {
		id: "school-id",
		name: "Paul-Gerhardt-Gymnasium",
	};

	beforeEach(() => {
		setupStores({
			schoolsModule: SchoolsModule,
		});

		schoolsModule.setSchool(schoolFactory.build(ownSchool));
	});
	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (options?: { isEmptyList?: boolean; featureFlag?: boolean }) => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({
			FEATURE_ADMINISTRATE_ROOMS_ENABLED: options?.featureFlag ?? true,
		});
		const isEmptyList = options?.isEmptyList ?? false;
		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		const wrapper = mount(AdministrationRoomsPage, {
			global: {
				plugins: [
					createTestingI18n(),
					createTestingVuetify(),
					createTestingPinia({
						initialState: {
							administrationRoomStore: {
								roomList: [],
								selectedIds: [],
								loading: false,
								isEmptyList: isEmptyList,
							},
						},
					}),
				],
			},
		});

		const adminRoomStore = mockedPiniaStoreTyping(useAdministrationRoomStore);

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
				name: "administration-rooms-manage-details",
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
