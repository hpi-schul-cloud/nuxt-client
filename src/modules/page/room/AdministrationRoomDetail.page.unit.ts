import AdministrationRoomDetailPage from "./AdministrationRoomDetail.page.vue";
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
import { Mock } from "vitest";
import { Router, useRouter } from "vue-router";
import { nextTick } from "vue-demi";

vi.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle) => pageTitle ?? "",
		}) as typeof import("@/utils/pageTitle")
);

describe("AdministrationRoomDetail.page", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	const ownSchool = {
		id: "school-id",
		name: "Paul-Gerhardt-Gymnasium",
	};
	const router = createMock<Router>();

	beforeEach(() => {
		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		useRouterMock.mockReturnValue(router);

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

		const wrapper = mount(AdministrationRoomDetailPage, {
			global: {
				plugins: [
					createTestingI18n(),
					createTestingVuetify(),
					createTestingPinia({
						initialState: {
							administrationRoomStore: {
								roomList: [],
								loading: false,
								isEmptyList: isEmptyList,
								selectedRoom: {
									id: "room-id",
									name: "Room Name",
								},
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
		it("should render the page and Table component ", async () => {
			const { wrapper } = setup();
			const roomAdminTable = wrapper.findComponent({
				name: "RoomAdminMembersTable",
			});

			expect(wrapper.exists()).toBe(true);
			expect(roomAdminTable.exists()).toBe(true);
		});

		it("should pass the correct breadcrumbs to the page", () => {
			const { wrapper } = setup();
			const defaultWireframe = wrapper.findComponent({
				name: "DefaultWireframe",
			});

			expect(defaultWireframe.exists()).toBe(true);
			const breadcrumbs = defaultWireframe.props("breadcrumbs");

			expect(breadcrumbs).toEqual([
				{
					title: "global.sidebar.item.management",
					to: "/administration",
				},
				{
					title: "pages.rooms.administration.title",
					to: "/administration/rooms/manage",
				},
				{
					title: "pages.rooms.administration.roomDetail.breadcrumb",
					disabled: true,
				},
			]);
		});

		it("should display the correct page title", () => {
			setup();

			expect(document.title).toContain(
				"pages.rooms.administration.roomDetail.header.text"
			);
		});

		it("should display the correct page header", () => {
			const { wrapper } = setup();

			const header = wrapper.find("[data-testid='admin-room-detail-title']");

			expect(header.exists()).toBe(true);
			expect(header.text()).toBe(
				"pages.rooms.administration.roomDetail.header.text"
			);
		});

		it("should set 'selectedRoom' value to null when unMounted", () => {
			const { adminRoomStore, wrapper } = setup();

			expect(adminRoomStore.selectedRoom).not.toBeNull();
			wrapper.unmount();

			expect(adminRoomStore.selectedRoom).toBeNull();
		});
	});

	it("should redirect to main rooms page when no room is selected", async () => {
		const { adminRoomStore } = setup();

		adminRoomStore.selectedRoom = null;
		await nextTick();

		expect(router.push).toHaveBeenCalledWith({
			name: "administration-rooms-manage",
		});
	});
});
