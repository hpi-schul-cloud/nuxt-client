import CourseRoomWrapper from "./CourseRoomWrapper.vue";
import { CourseMetadataResponse, Permission } from "@/serverApi/v3";
import { commonCartridgeImportModule, courseRoomListModule } from "@/store";
import CommonCartridgeImportModule from "@/store/common-cartridge-import";
import CourseRoomListModule from "@/store/course-room-list";
import { createTestAppStoreWithPermissions, createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { createTestingPinia } from "@pinia/testing";
import { EmptyState } from "@ui-empty-state";
import { SpeedDialMenu, SpeedDialMenuAction } from "@ui-speed-dial-menu";
import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VBtn, VFab } from "vuetify/components";

const getWrapper = (
	options: ComponentMountingOptions<typeof CourseRoomWrapper> = {
		props: { hasRooms: true },
	}
) =>
	mount(CourseRoomWrapper, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			stubs: {
				// StartNewCourseSyncDialog: true,
				CourseCommonCartridgeImportModal: true,
			},
		},
		...options,
	});

const mockData: CourseMetadataResponse[] = [
	{
		id: "123",
		title: "Mathe",
		shortTitle: "Ma",
		displayColor: "#54616e",
		startDate: "2019-12-07T23:00:00.000Z",
		untilDate: "2020-12-16T23:00:00.000Z",
		isLocked: false,
	},
	{
		id: "234",
		title: "History",
		shortTitle: "Hi",
		displayColor: "#EF6C00",
		startDate: "2015-07-31T22:00:00.000Z",
		untilDate: "2018-07-30T22:00:00.000Z",
		isLocked: false,
	},
	{
		id: "345",
		title: "Spanish",
		shortTitle: "Sp",
		displayColor: "#009688",
		startDate: "2021-07-31T22:00:00.000Z",
		untilDate: "2021-11-05T23:00:00.000Z",
		isLocked: false,
	},
	{
		id: "456",
		title: "English",
		shortTitle: "En",
		displayColor: "#EC407A",
		startDate: "2021-07-31T22:00:00.000Z",
		untilDate: "2022-07-30T22:00:00.000Z",
		isLocked: false,
	},
];

describe("@templates/CourseRoomWrapper.vue", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		createTestEnvStore({
			FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: true,
			FEATURE_COMMON_CARTRIDGE_COURSE_IMPORT_ENABLED: true,
		});
		createTestAppStoreWithPermissions([Permission.CourseCreate]);

		setupStores({
			courseRoomListModule: CourseRoomListModule,
			commonCartridgeImportModule: CommonCartridgeImportModule,
		});
		courseRoomListModule.setAllElements(mockData);
	});

	describe("when data is not loaded yet", () => {
		it("should display skeleton loader", () => {
			courseRoomListModule.setLoading(true);

			const wrapper = getWrapper({
				props: { hasRooms: false },
			});

			expect(wrapper.findComponent({ ref: "skeleton-loader" }).exists()).toBe(true);
		});
	});

	describe("when data is loaded", () => {
		describe("when data is empty", () => {
			it("should display empty state", () => {
				const wrapper = getWrapper({
					props: { hasRooms: false },
				});

				expect(wrapper.findComponent(EmptyState).exists()).toBe(true);
			});
		});

		describe("when data is not empty", () => {
			it("should render page content slot", () => {
				const wrapper = getWrapper({
					props: { hasRooms: true },
					slots: {
						"page-content": "<div>Page Content</div>",
					},
				});

				expect(wrapper.html()).toContain("<div>Page Content</div>");
			});
		});
	});

	describe("when user has course create permission", () => {
		it("should display fab", () => {
			const wrapper = getWrapper();

			const fabComponent = wrapper.findComponent(SpeedDialMenu);
			expect(fabComponent.exists()).toBe(true);
		});

		describe("when course synchronization is active", () => {
			it("should have the course sync sub menu action", async () => {
				const wrapper = getWrapper();

				const fab = wrapper.getComponent(VFab);
				await fab.trigger("click");

				const speedDialMenuActions = wrapper.findAllComponents(SpeedDialMenuAction);

				expect(speedDialMenuActions.length).toBe(3);
				expect(speedDialMenuActions[1].props("action").dataTestId).toBe("fab_button_add_synced_course");
			});
		});

		describe("when course synchronization is active", () => {
			it("should have the common cartridge sub menu action", async () => {
				const wrapper = getWrapper();

				const fab = wrapper.getComponent(VFab);
				await fab.trigger("click");

				const speedDialMenuActions = wrapper.findAllComponents(SpeedDialMenuAction);

				expect(speedDialMenuActions.length).toBe(3);
				expect(speedDialMenuActions[2].props("action").dataTestId).toBe("fab_button_import_course");
			});
		});
	});

	describe("when user does not have course create permission", () => {
		it("should not display fab", () => {
			createTestAppStoreWithPermissions([]);
			const wrapper = getWrapper();

			const fabComponent = wrapper.findComponent(SpeedDialMenu);
			expect(fabComponent.exists()).toBe(false);
		});
	});

	describe("when clicking on the course sync fab action", () => {
		it("should open the course sync dialog", async () => {
			const wrapper = getWrapper();

			const fab = wrapper.getComponent(VFab);
			await fab.trigger("click");

			const openSyncBtn = wrapper.findAllComponents(SpeedDialMenuAction)[1];

			await openSyncBtn.getComponent(VBtn).trigger("click");

			expect((wrapper.vm as unknown as typeof CourseRoomWrapper).isCourseSyncDialogOpen).toEqual(true);
		});
	});

	describe("when clicking on the common cartridge fab action", () => {
		it("should open the common cartridge dialog", async () => {
			const wrapper = getWrapper();

			const fab = wrapper.getComponent(VFab);
			await fab.trigger("click");

			const openImportBtn = wrapper.findAllComponents(SpeedDialMenuAction)[2];
			await openImportBtn.getComponent(VBtn).trigger("click");

			expect(commonCartridgeImportModule.isOpen).toEqual(true);
		});
	});
});
