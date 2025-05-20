import {
	authModule,
	commonCartridgeImportModule,
	envConfigModule,
	courseRoomListModule,
} from "@/store";
import AuthModule from "@/store/auth";
import CommonCartridgeImportModule from "@/store/common-cartridge-import";
import EnvConfigModule from "@/store/env-config";
import CourseRoomListModule from "@/store/course-room-list";
import { envsFactory, meResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { SpeedDialMenu } from "@ui-speed-dial-menu";
import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { FabAction } from "./default-wireframe.types";
import DefaultWireframe from "./DefaultWireframe.vue";
import RoomWrapper from "./RoomWrapper.vue";
import { EmptyState } from "@ui-empty-state";

const getWrapper = (
	options: ComponentMountingOptions<typeof RoomWrapper> = {
		props: { hasRooms: true },
	}
) => {
	return mount(RoomWrapper, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			stubs: {
				StartNewCourseSyncDialog: true,
				CommonCartridgeImportModal: true,
			},
		},
		...options,
	});
};

const mockData = [
	{
		id: "123",
		title: "Mathe",
		shortTitle: "Ma",
		displayColor: "#54616e",
		startDate: "2019-12-07T23:00:00.000Z",
		untilDate: "2020-12-16T23:00:00.000Z",
		titleDate: "2019/20",
	},
	{
		id: "234",
		title: "History",
		shortTitle: "Hi",
		displayColor: "#EF6C00",
		startDate: "2015-07-31T22:00:00.000Z",
		untilDate: "2018-07-30T22:00:00.000Z",
		titleDate: "2015-2018",
	},
	{
		id: "345",
		title: "Spanish",
		shortTitle: "Sp",
		displayColor: "#009688",
		startDate: "2021-07-31T22:00:00.000Z",
		untilDate: "2021-11-05T23:00:00.000Z",
		titleDate: "2021",
	},
	{
		id: "456",
		title: "English",
		shortTitle: "En",
		displayColor: "#EC407A",
		startDate: "2021-07-31T22:00:00.000Z",
		untilDate: "2022-07-30T22:00:00.000Z",
	},
];

describe("@templates/RoomWrapper.vue", () => {
	beforeEach(() => {
		setupStores({
			courseRoomListModule: CourseRoomListModule,
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
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

			expect(wrapper.findComponent({ ref: "skeleton-loader" }).exists()).toBe(
				true
			);
		});
	});

	describe("when data is loaded", () => {
		describe("when data is empty", () => {
			it("should display empty state", async () => {
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
		beforeEach(() => {
			const mockMe = meResponseFactory.build({
				permissions: ["COURSE_CREATE"],
			});
			authModule.setMe(mockMe);
		});

		it("should display fab", () => {
			const wrapper = getWrapper();

			const fabComponent = wrapper.findComponent(SpeedDialMenu);
			expect(fabComponent.exists()).toBe(true);
		});

		describe("when course synchronization is active", () => {
			beforeEach(() => {
				envConfigModule.setEnvs(
					envsFactory.build({ FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: true })
				);
			});

			it("should have the course sync sub menu action", async () => {
				const wrapper = getWrapper();

				const defaultWireframe = wrapper.findComponent(DefaultWireframe);
				const fabActions: FabAction[] | undefined =
					defaultWireframe.props().fabItems?.actions;

				expect(
					fabActions?.some(
						(action: FabAction) =>
							action.dataTestId === "fab_button_add_synced_course"
					)
				).toEqual(true);
			});
		});

		describe("when course synchronization is active", () => {
			beforeEach(() => {
				envConfigModule.setEnvs(
					envsFactory.build({
						FEATURE_COMMON_CARTRIDGE_COURSE_IMPORT_ENABLED: true,
					})
				);
			});

			it("should have the common cartridge sub menu action", async () => {
				const wrapper = getWrapper();

				const defaultWireframe = wrapper.findComponent(DefaultWireframe);
				const fabActions: FabAction[] | undefined =
					defaultWireframe.props().fabItems?.actions;

				expect(
					fabActions?.some(
						(action: FabAction) =>
							action.dataTestId === "fab_button_import_course"
					)
				).toEqual(true);
			});
		});
	});

	describe("when user does not have course create permission", () => {
		it("should not display fab", () => {
			const mockMe = meResponseFactory.build();
			authModule.setMe(mockMe);

			const wrapper = getWrapper();

			const fabComponent = wrapper.findComponent(SpeedDialMenu);
			expect(fabComponent.exists()).toBe(false);
		});
	});

	describe("when clicking on the course sync fab action", () => {
		it("should open the course sync dialog", async () => {
			const wrapper = getWrapper();

			const defaultWireframe = wrapper.findComponent(DefaultWireframe);
			defaultWireframe.vm.$emit("onFabItemClick", "syncedCourse");

			expect(wrapper.vm.isCourseSyncDialogOpen).toEqual(true);
		});
	});

	describe("when clicking on the common cartridge fab action", () => {
		it("should open the common cartridge dialog", async () => {
			const wrapper = getWrapper();

			const defaultWireframe = wrapper.findComponent(DefaultWireframe);
			defaultWireframe.vm.$emit("onFabItemClick", "import");

			expect(commonCartridgeImportModule.isOpen).toEqual(true);
		});
	});
});
