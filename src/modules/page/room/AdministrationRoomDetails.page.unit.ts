import AdministrationRoomDetailPage from "./AdministrationRoomDetails.page.vue";
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
import { Router, useRoute } from "vue-router";

vi.mock("vue-router");
const useRouteMock = <Mock>useRoute;

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle) => pageTitle ?? "",
		}) as typeof import("@/utils/pageTitle")
);

describe("AdministrationRoomDetails.page", () => {
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

		it("should set 'selectedRoom' value to null when unMounted", () => {
			const { adminRoomStore, wrapper } = setup();

			expect(adminRoomStore.selectedRoom).not.toBeNull();
			wrapper.unmount();

			expect(adminRoomStore.selectedRoom).toBeNull();
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
