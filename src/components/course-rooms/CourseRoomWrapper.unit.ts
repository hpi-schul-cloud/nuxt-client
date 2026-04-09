import CourseCommonCartridgeImportModal from "./CourseCommonCartridgeImportModal.vue";
import CourseRoomWrapper from "./CourseRoomWrapper.vue";
import { courseRoomListModule } from "@/store";
import CourseRoomListModule from "@/store/course-room-list";
import { COURSE_ROOM_LIST_MODULE_KEY } from "@/utils/inject";
import {
	createTestAppStoreWithPermissions,
	createTestEnvStore,
	expectNotification,
	mockComposable,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { CourseMetadataResponse, Permission } from "@api-server";
import { useCommonCartridgeImport } from "@data-common-cartridge";
import { createTestingPinia } from "@pinia/testing";
import { EmptyState } from "@ui-empty-state";
import { SpeedDialMenu, SpeedDialMenuAction } from "@ui-speed-dial-menu";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { ref } from "vue";
import { VBtn, VFab } from "vuetify/components";

vi.mock("@data-common-cartridge");
const useCommonCartridgeImportMock = vi.mocked(useCommonCartridgeImport);

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

describe("CourseRoomWrapper.vue", () => {
	let useCommonCartridgeImportMockReturn: Mocked<ReturnType<typeof useCommonCartridgeImport>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		createTestEnvStore({
			FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: true,
			FEATURE_COMMON_CARTRIDGE_COURSE_IMPORT_ENABLED: true,
		});
		createTestAppStoreWithPermissions([Permission.COURSE_CREATE]);

		setupStores({
			courseRoomListModule: CourseRoomListModule,
		});
		courseRoomListModule.setAllElements(mockData);

		useCommonCartridgeImportMockReturn = mockComposable(useCommonCartridgeImport, {
			isOpen: ref(false),
			isSuccess: ref(false),
			file: ref(undefined),
			importCommonCartridgeFile: vi.fn(),
		});
		useCommonCartridgeImportMock.mockReturnValue(useCommonCartridgeImportMockReturn);
	});

	const setup = (
		options: {
			hasRooms?: boolean;
			isSuccess?: boolean;
			stubImportModal?: boolean;
			stubSyncDialog?: boolean;
			isOpenInitialValue?: boolean;
			isLoading?: boolean;
			slots?: Record<string, string>;
		} = {}
	) => {
		const {
			hasRooms = true,
			isSuccess = false,
			stubImportModal = true,
			stubSyncDialog = true,
			isOpenInitialValue = false,
			isLoading = false,
			slots,
		} = options;

		if (isOpenInitialValue) {
			useCommonCartridgeImportMockReturn.isOpen = ref(true);
		}
		useCommonCartridgeImportMockReturn.isSuccess = ref(isSuccess);
		useCommonCartridgeImportMockReturn.importCommonCartridgeFile.mockResolvedValue();

		const roomsModuleMock = createModuleMocks(CourseRoomListModule, {
			getAllElements: mockData,
			getLoading: isLoading,
		});

		return mount(CourseRoomWrapper, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[COURSE_ROOM_LIST_MODULE_KEY.valueOf()]: roomsModuleMock,
				},
				stubs: {
					CourseCommonCartridgeImportModal: stubImportModal,
					StartNewCourseSyncDialog: stubSyncDialog,
				},
			},
			props: { hasRooms },
			slots,
		});
	};

	describe("when data is not loaded yet", () => {
		it("should display skeleton loader", () => {
			const wrapper = setup({ hasRooms: false, isLoading: true });

			expect(wrapper.findComponent({ ref: "skeleton-loader" }).exists()).toBe(true);
		});
	});

	describe("when data is loaded", () => {
		describe("when data is empty", () => {
			it("should display empty state", () => {
				const wrapper = setup({ hasRooms: false });

				expect(wrapper.findComponent(EmptyState).exists()).toBe(true);
			});
		});

		describe("when data is not empty", () => {
			it("should render page content slot", () => {
				const wrapper = setup({
					hasRooms: true,
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
			const wrapper = setup();

			const fabComponent = wrapper.findComponent(SpeedDialMenu);
			expect(fabComponent.exists()).toBe(true);
		});

		describe("when course synchronization is active", () => {
			it("should have the course sync sub menu action", async () => {
				const wrapper = setup();

				const fab = wrapper.getComponent(VFab);
				await fab.trigger("click");

				const speedDialMenuActions = wrapper.findAllComponents(SpeedDialMenuAction);

				expect(speedDialMenuActions.length).toBe(3);
				expect(speedDialMenuActions[1].props("action").dataTestId).toBe("fab_button_add_synced_course");
			});
		});

		describe("when course synchronization is active", () => {
			it("should have the common cartridge sub menu action", async () => {
				const wrapper = setup();

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
			const wrapper = setup();

			const fabComponent = wrapper.findComponent(SpeedDialMenu);
			expect(fabComponent.exists()).toBe(false);
		});
	});

	describe("when clicking on the course sync fab action", () => {
		it("should open the course sync dialog", async () => {
			const wrapper = setup();

			const fab = wrapper.getComponent(VFab);
			await fab.trigger("click");

			const openSyncBtn = wrapper.findAllComponents(SpeedDialMenuAction)[1];

			await openSyncBtn.getComponent(VBtn).trigger("click");

			expect((wrapper.vm as unknown as typeof CourseRoomWrapper).isCourseSyncDialogOpen).toEqual(true);
		});
	});

	describe("when course sync dialog emits update:isOpen", () => {
		it("should update isCourseSyncDialogOpen value", async () => {
			const wrapper = setup({ stubImportModal: true, stubSyncDialog: false });

			const fab = wrapper.getComponent(VFab);
			await fab.trigger("click");

			const openSyncBtn = wrapper.findAllComponents(SpeedDialMenuAction)[1];
			await openSyncBtn.getComponent(VBtn).trigger("click");

			expect((wrapper.vm as unknown as typeof CourseRoomWrapper).isCourseSyncDialogOpen).toBe(true);

			const dialog = wrapper.findComponent({ name: "StartNewCourseSyncDialog" });
			await dialog.vm.$emit("update:isOpen", false);

			expect((wrapper.vm as unknown as typeof CourseRoomWrapper).isCourseSyncDialogOpen).toBe(false);
		});
	});

	describe("when handling common cartridge import", () => {
		describe("when clicking on the common cartridge fab action", () => {
			it("should open the common cartridge dialog", async () => {
				const wrapper = setup();

				const fab = wrapper.getComponent(VFab);
				await fab.trigger("click");

				const openImportBtn = wrapper.findAllComponents(SpeedDialMenuAction)[2];
				await openImportBtn.getComponent(VBtn).trigger("click");

				expect(useCommonCartridgeImportMockReturn.isOpen.value).toBe(true);
			});
		});

		describe("when import is successful", () => {
			it("should call import composable", async () => {
				const wrapper = setup({ isSuccess: true, stubImportModal: false });

				const testFile = new File([], "test.imscc");

				const modal = wrapper.findComponent(CourseCommonCartridgeImportModal);
				modal.vm.$emit("import", testFile);
				await flushPromises();

				expect(useCommonCartridgeImportMockReturn.importCommonCartridgeFile).toHaveBeenCalledWith(testFile);
				expect(useCommonCartridgeImportMockReturn.isOpen.value).toBe(false);
			});

			it("should show success notification", async () => {
				const wrapper = setup({ isSuccess: true, stubImportModal: false });

				const testFile = new File([], "test.imscc");

				const modal = wrapper.findComponent(CourseCommonCartridgeImportModal);
				modal.vm.$emit("import", testFile);
				await flushPromises();

				expectNotification("success");
			});
		});

		describe("when import fails", () => {
			it("should call import composable", async () => {
				const wrapper = setup({ isSuccess: false, stubImportModal: false });

				const testFile = new File([], "test.imscc");

				const modal = wrapper.findComponent(CourseCommonCartridgeImportModal);
				modal.vm.$emit("import", testFile);
				await flushPromises();

				expect(useCommonCartridgeImportMockReturn.importCommonCartridgeFile).toHaveBeenCalledWith(testFile);
				expect(useCommonCartridgeImportMockReturn.isOpen.value).toBe(false);
			});

			it("should show error notification", async () => {
				const wrapper = setup({ isSuccess: false, stubImportModal: false });

				const testFile = new File([], "test.imscc");

				const modal = wrapper.findComponent(CourseCommonCartridgeImportModal);
				modal.vm.$emit("import", testFile);
				await flushPromises();

				expectNotification("error");
			});
		});
	});

	describe("when some features are disabled", () => {
		describe("when course sync feature is disabled", () => {
			it("should not have the course sync sub menu action", async () => {
				createTestEnvStore({
					FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: false,
					FEATURE_COMMON_CARTRIDGE_COURSE_IMPORT_ENABLED: true,
				});

				const wrapper = setup();

				const fab = wrapper.getComponent(VFab);
				await fab.trigger("click");

				const speedDialMenuActions = wrapper.findAllComponents(SpeedDialMenuAction);

				expect(speedDialMenuActions.length).toBe(2);
				expect(speedDialMenuActions[1].props("action").dataTestId).toBe("fab_button_import_course");
			});
		});

		describe("when common cartridge import feature is disabled", () => {
			it("should not have the common cartridge sub menu action", async () => {
				createTestEnvStore({
					FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: true,
					FEATURE_COMMON_CARTRIDGE_COURSE_IMPORT_ENABLED: false,
				});

				const wrapper = setup();

				const fab = wrapper.getComponent(VFab);
				await fab.trigger("click");

				const speedDialMenuActions = wrapper.findAllComponents(SpeedDialMenuAction);

				expect(speedDialMenuActions.length).toBe(2);
				expect(speedDialMenuActions[1].props("action").dataTestId).toBe("fab_button_add_synced_course");
			});
		});

		describe("when both course sync and common cartridge import are disabled", () => {
			it("should show only single add course button without sub-actions", async () => {
				createTestEnvStore({
					FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: false,
					FEATURE_COMMON_CARTRIDGE_COURSE_IMPORT_ENABLED: false,
				});

				const wrapper = setup();

				const fab = wrapper.getComponent(VFab);
				await fab.trigger("click");

				const speedDialMenuActions = wrapper.findAllComponents(SpeedDialMenuAction);
				expect(speedDialMenuActions.length).toBe(0);

				expect(fab.attributes("data-testid")).toBe("add-course-button");
			});
		});
	});
});
