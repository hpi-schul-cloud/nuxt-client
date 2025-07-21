import AdministrationRoomsPage from "./AdministrationRooms.page.vue";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useAdministrationRoomStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { nextTick } from "vue";

describe("AdministrationRooms.page", () => {
	const setup = (options?: { isEmptyList?: boolean }) => {
		const isEmptyList = options?.isEmptyList ?? false;

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
		};
	};

	describe("rendering", () => {
		it("renders the page and Table components ", async () => {
			const { wrapper } = setup();
			const roomAdminTable = wrapper.findComponent({ name: "RoomAdminTable" });
			const emptyStateComponent = wrapper.findComponent({ name: "EmptyState" });

			expect(wrapper.exists()).toBe(true);
			expect(roomAdminTable.exists()).toBe(true);
			expect(emptyStateComponent.exists()).toBe(false);
		});

		it("renders the EmptyState component when isEmptyList is true", async () => {
			const { wrapper } = setup({ isEmptyList: true });
			const roomAdminTable = wrapper.findComponent({ name: "RoomAdminTable" });
			const emptyStateComponent = wrapper.findComponent({ name: "EmptyState" });

			expect(wrapper.exists()).toBe(true);
			expect(roomAdminTable.exists()).toBe(false);
			expect(emptyStateComponent.exists()).toBe(true);
		});

		it("calls fetchRooms on mount", async () => {
			const { adminRoomStore } = setup();
			const fetchRoomsSpy = jest.spyOn(adminRoomStore, "fetchRooms");
			await nextTick();

			expect(fetchRoomsSpy).toHaveBeenCalled();
		});

		it("should pass the correct breadcrumbs to the page", () => {
			const { wrapper } = setup();
			const defaultWireframe = wrapper.findComponent({
				name: "DefaultWireframe",
			});

			expect(defaultWireframe.exists()).toBe(true);
			const breadcrumbs = defaultWireframe.props("breadcrumbs");

			expect(breadcrumbs).toEqual([
				{ title: "global.sidebar.item.management", to: "/administration" },
				{ title: "pages.rooms.administration.title", disabled: true },
			]);
		});
	});
});
