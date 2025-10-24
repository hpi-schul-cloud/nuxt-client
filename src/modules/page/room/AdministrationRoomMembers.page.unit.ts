import AdministrationRoomMembersPage from "./AdministrationRoomMembers.page.vue";
import { RoleName } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import {
	createTestAppStoreWithRole,
	createTestEnvStore,
	mockedPiniaStoreTyping,
	schoolFactory,
} from "@@/tests/test-utils";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { useAdministrationRoomStore, useRoomMembersStore } from "@data-room";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { Router, useRoute } from "vue-router";

vi.mock("vue-router");
const useRouteMock = <Mock>useRoute;

vi.mock("vue-i18n", () => ({
	useI18n: vi.fn().mockReturnValue({
		t: vi.fn().mockImplementation((key: string) => key),
		n: vi.fn().mockImplementation((key: string) => key),
	}),
}));
vi.mocked(useI18n());

describe("AdministrationRoomMembers.page", () => {
	const ownSchool = {
		id: "school-id",
		name: "Paul-Gerhardt-Gymnasium",
	};
	const router = createMock<Router>();

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		useRouteMock.mockReturnValue(router);

		setupStores({
			schoolsModule: SchoolsModule,
		});

		createTestAppStoreWithRole(RoleName.Administrator);

		schoolsModule.setSchool(schoolFactory.build(ownSchool));
	});
	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (options?: { isEmptyList?: boolean; featureFlag?: boolean }) => {
		createTestEnvStore({
			FEATURE_ADMINISTRATE_ROOMS_ENABLED: options?.featureFlag ?? true,
		});
		const isEmptyList = options?.isEmptyList ?? false;

		const wrapper = mount(AdministrationRoomMembersPage, {
			global: {
				plugins: [
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
				stubs: {
					RoomAdminMembersTable: true,
				},
			},
		});

		const adminRoomStore = mockedPiniaStoreTyping(useAdministrationRoomStore);
		const memberStore = mockedPiniaStoreTyping(useRoomMembersStore);
		memberStore.init({ asAdmin: true });

		return {
			wrapper,
			adminRoomStore,
			memberStore,
		};
	};

	describe("rendering", () => {
		it("should render the page and Table component ", () => {
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

			expect(document.title).toContain("pages.rooms.administration.roomDetail.header.text");
		});

		it("should display the correct page header", () => {
			const { wrapper } = setup();

			const header = wrapper.find("[data-testid='admin-room-detail-title']");

			expect(header.exists()).toBe(true);
			expect(header.text()).toBe("pages.rooms.administration.roomDetail.header.text");
		});

		it("should call resetStore when unMounted", async () => {
			const { memberStore, wrapper } = setup();
			wrapper.unmount();
			await nextTick();

			expect(memberStore.resetStore).toHaveBeenCalled();
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
