import AdministrationRoomsPage from "./AdministrationRooms.page.vue";
import { mockedPiniaStoreTyping, schoolFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useAdministrationRoomStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier } from "@util-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import SchoolsModule from "@/store/schools";
import { schoolsModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";

vi.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);

describe("AdministrationRooms.page", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	const ownSchool = {
		id: "school-id",
		name: "Paul-Gerhardt-Gymnasium",
	};

	beforeEach(() => {
		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);
		setupStores({
			schoolsModule: SchoolsModule,
		});

		schoolsModule.setSchool(schoolFactory.build(ownSchool));
	});
	afterEach(() => {
		vi.clearAllMocks();
	});

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
		it("should render the page and Table components ", async () => {
			const { wrapper } = setup();
			const roomAdminTable = wrapper.findComponent({ name: "RoomAdminTable" });
			const emptyStateComponent = wrapper.findComponent({ name: "EmptyState" });

			expect(wrapper.exists()).toBe(true);
			expect(roomAdminTable.exists()).toBe(true);
			expect(emptyStateComponent.exists()).toBe(false);
		});

		it("should render the EmptyState component when isEmptyList is true", async () => {
			const { wrapper } = setup({ isEmptyList: true });
			const roomAdminTable = wrapper.findComponent({ name: "RoomAdminTable" });
			const emptyStateComponent = wrapper.findComponent({ name: "EmptyState" });

			expect(wrapper.exists()).toBe(true);
			expect(roomAdminTable.exists()).toBe(false);
			expect(emptyStateComponent.exists()).toBe(true);
		});

		it("should call fetchRooms on mount", async () => {
			const { adminRoomStore, wrapper } = setup();
			await wrapper.vm.$nextTick();

			expect(adminRoomStore.fetchRooms).toHaveBeenCalled();
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
