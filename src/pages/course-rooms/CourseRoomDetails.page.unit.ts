import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import {
	BoardElementResponseTypeEnum as BoardTypes,
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
	ShareTokenBodyParamsParentTypeEnum,
	SingleColumnBoardResponse,
} from "@/serverApi/v3/api";
import { envConfigModule } from "@/store";
import AuthModule from "@/store/auth";
import CommonCartridgeExportModule from "@/store/common-cartridge-export";
import CopyModule from "@/store/copy";
import CourseRoomDetailsModule from "@/store/course-room-details";
import EnvConfigModule from "@/store/env-config";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import ShareModule from "@/store/share";
import {
	AUTH_MODULE_KEY,
	COMMON_CARTRIDGE_EXPORT_MODULE_KEY,
	COPY_MODULE_KEY,
	COURSE_ROOM_DETAILS_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	SHARE_MODULE_KEY,
} from "@/utils/inject/injection-keys";
import { envsFactory, meResponseFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { SpeedDialMenu, SpeedDialMenuAction } from "@ui-speed-dial-menu";
import { mount } from "@vue/test-utils";
import { VBtn } from "vuetify/lib/components/index";
import CourseRoomDetailsPage from "./CourseRoomDetails.page.vue";
import RoomExternalToolsOverview from "./tools/RoomExternalToolsOverview.vue";
import { nextTick } from "vue";
import CourseRoomLockedPage from "./CourseRoomLocked.page.vue";

vi.mock("./tools/RoomExternalToolsOverview.vue");

const mockData: SingleColumnBoardResponse = {
	roomId: "123",
	title: "Sample Course",
	displayColor: "black",
	isArchived: false,
	isSynchronized: false,
	elements: [
		{
			type: BoardTypes.Task,
			content: {
				courseName: "Mathe",
				id: "59cce1d381297026d02cdc4b",
				name: "Private Aufgabe von Marla - mit Kurs, offen",
				createdAt: "2017-09-28T11:49:39.924Z",
				updatedAt: "2017-09-28T11:49:39.924Z",
				status: {
					submitted: 0,
					maxSubmissions: 2,
					graded: 0,
					isDraft: false,
					isSubstitutionTeacher: false,
					isFinished: false,
				},
				availableDate: "2017-09-20T11:00:00.000Z",
				dueDate: "2300-09-28T13:00:00.000Z",
				displayColor: "#54616e",
				description: "",
			},
		},
		{
			type: BoardTypes.Task,
			content: {
				courseName: "Mathe",
				id: "59cce4c3c6abf042248e888e",
				name: "Private Aufgabe von Cord - mit Kurs, offen",
				createdAt: "2017-09-28T12:02:11.432Z",
				updatedAt: "2017-09-28T12:02:11.432Z",
				status: {
					submitted: 0,
					maxSubmissions: 2,
					graded: 0,
					isDraft: true,
					isSubstitutionTeacher: false,
					isFinished: false,
				},
				availableDate: "2017-09-28T12:00:00.000Z",
				dueDate: "2300-06-28T13:00:00.000Z",
				displayColor: "#54616e",
				description: "",
			},
		},
	],
};

const mockPermissionsCourseTeacher = ["COURSE_CREATE", "COURSE_EDIT"];

const mockPermissionsCourseSubstitutionTeacher = [
	"HOMEWORK_CREATE",
	"HOMEWORK_EDIT",
];

const mockPermissionsStudent = ["BASE_VIEW"];

const $route = {
	params: {
		id: "123",
	},
	path: "/rooms/",
};
const $router = { push: vi.fn(), resolve: vi.fn(), replace: vi.fn() };

let copyModule: CopyModule;
let loadingStateModuleMock: LoadingStateModule;
let notifierModule: NotifierModule;
let shareModule: ShareModule;
let downloadModule: CommonCartridgeExportModule;
let courseRoomDetailsModule: CourseRoomDetailsModule;
let authModule: AuthModule;

type WrapperOptions = {
	permissionData?: string[];
	roleName?: string;
	isLocked?: boolean;
};

const getWrapper = ({
	permissionData = mockPermissionsCourseTeacher,
	roleName = "teacher",
	isLocked = false,
}: WrapperOptions = {}) => {
	notifierModule = createModuleMocks(NotifierModule);
	copyModule = createModuleMocks(CopyModule, {
		copy: vi.fn(),
		getIsResultModalOpen: false,
		getCopyResult: {
			id: "copiedid",
			type: CopyApiResponseTypeEnum.Course,
			title: "Sample Course",
			elements: [],
			status: CopyApiResponseStatusEnum.Success,
		},
	});
	downloadModule = createModuleMocks(CommonCartridgeExportModule, {
		getIsExportModalOpen: false,
		getVersion: "",
		getTopics: [],
		getTasks: [],
		getColumnBoards: [],
		startExportFlow: vi.fn(),
	});
	shareModule = createModuleMocks(ShareModule, {
		getIsShareModalOpen: true,
		getParentType: ShareTokenBodyParamsParentTypeEnum.Courses,
		createShareUrl: vi.fn(),
		startShareFlow: vi.fn(),
		resetShareFlow: vi.fn(),
	});

	courseRoomDetailsModule = createModuleMocks(CourseRoomDetailsModule, {
		fetchContent: vi.fn(),
		getRoomData: mockData,
		getPermissionData: permissionData,
		getIsLocked: isLocked,
	});

	const mockMe = meResponseFactory.build();
	mockMe.roles.push({ id: "0", name: roleName });

	authModule = createModuleMocks(AuthModule, {
		getMe: mockMe,
		getUserRoles: [mockMe.roles[0].name],
		getUserPermissions: permissionData,
	});

	// we need this because in order for useMediaQuery (vueuse) to work
	// window.matchMedia has to return a reasonable result.
	// https://github.com/vueuse/vueuse/blob/main/packages/core/useMediaQuery/index.ts#L44
	vi.spyOn(window, "matchMedia").mockReturnValue(createMock<MediaQueryList>());

	return mount(CourseRoomDetailsPage, {
		global: {
			plugins: [
				createTestingVuetify(),
				createTestingI18n(),
				createTestingPinia(),
			],
			mocks: {
				$router,
				$route,
			},
			provide: {
				[COPY_MODULE_KEY.valueOf()]: copyModule,
				loadingStateModule: loadingStateModuleMock,
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				[SHARE_MODULE_KEY.valueOf()]: shareModule,
				[COMMON_CARTRIDGE_EXPORT_MODULE_KEY.valueOf()]: downloadModule,
				[COURSE_ROOM_DETAILS_MODULE_KEY.valueOf()]: courseRoomDetailsModule,
				[AUTH_MODULE_KEY.valueOf()]: authModule,
			},
			stubs: {
				RoomDashboard: true,
				RoomExternalToolsOverview: true,
				EndCourseSyncDialog: true,
				StartExistingCourseSyncDialog: true,
				UseFocusTrap: true,
			},
		},
	});
};

describe("@/pages/CourseRoomDetails.page.vue", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
		loadingStateModuleMock = createModuleMocks(LoadingStateModule, {
			getIsOpen: false,
		});
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it("should fetch data", async () => {
		getWrapper();

		expect(courseRoomDetailsModule.fetchContent).toHaveBeenCalled();
	});

	it("'to course files' button should have correct path", () => {
		const wrapper = getWrapper();
		const backButton = wrapper.find(".back-button");
		expect(backButton.attributes("href")).toStrictEqual("/files/courses/123");
	});

	it("title should be the course name", () => {
		const wrapper = getWrapper();
		const title = wrapper.find(".course-title");
		expect(title.element.textContent).toContain("Sample Course");
	});

	it("should not show FAB if user does not have permission to create courses", () => {
		const wrapper = getWrapper({ permissionData: mockPermissionsStudent });
		const fabComponent = wrapper.find(".wireframe-fab");
		expect(fabComponent.exists()).toBe(false);
	});

	describe("when course is locked", () => {
		it("should show the locked course page", async () => {
			const wrapper = getWrapper({
				isLocked: true,
			});

			const lockedCoursePage = wrapper.findComponent(CourseRoomLockedPage);
			expect(lockedCoursePage.exists()).toBe(true);
		});
	});

	describe("menu", () => {
		it("should show FAB if user has permission to create homework", () => {
			const wrapper = getWrapper({ permissionData: ["homework_create"] });
			const fabComponent = wrapper.findComponent(SpeedDialMenu);

			expect(fabComponent.exists()).toBe(true);
		});

		it("'add task' button should have correct path", async () => {
			const wrapper = getWrapper({ permissionData: ["homework_create"] });
			const fabComponent = wrapper.findComponent(SpeedDialMenu);

			// open menu
			await fabComponent.findComponent(VBtn).trigger("click");
			const newTaskAction = wrapper.findAllComponents(SpeedDialMenuAction)[0];

			expect(newTaskAction.props("href")).toStrictEqual(
				"/homework/new?course=123&returnUrl=rooms/123"
			);
		});

		it("'add lesson' button should have correct path", async () => {
			const wrapper = getWrapper({
				permissionData: ["homework_create", "topic_create"],
			});
			const fabComponent = wrapper.findComponent(SpeedDialMenu);

			// open menu
			await fabComponent.findComponent(VBtn).trigger("click");
			const newTaskAction = wrapper.findAllComponents(SpeedDialMenuAction)[1];

			expect(newTaskAction.props("href")).toStrictEqual(
				"/courses/123/topics/add?returnUrl=rooms/123"
			);
		});

		it("'add column board' button should be rendered", async () => {
			const wrapper = getWrapper({ permissionData: ["course_edit"] });
			const fabComponent = wrapper.findComponent(SpeedDialMenu);

			// open menu
			await fabComponent.findComponent(VBtn).trigger("click");
			const btnDataTestIds = wrapper
				.findAllComponents(SpeedDialMenuAction)
				.map((btn) => btn.props("dataTestId"));

			expect(btnDataTestIds.includes("fab_button_add_column_board")).toBe(true);
		});

		describe("'add list board' button", () => {
			describe("when user doesn't have course edit permission", () => {
				it("should not render any board creation button", async () => {
					const wrapper = getWrapper({
						permissionData: ["homework_create", "topic_create"],
					});
					const fabComponent = wrapper.findComponent(SpeedDialMenu);

					// open menu
					await fabComponent.findComponent(VBtn).trigger("click");
					const btnDataTestIds = wrapper
						.findAllComponents(SpeedDialMenuAction)
						.map((btn) => btn.props("dataTestId"));

					expect(btnDataTestIds.includes("fab_button_add_column_board")).toBe(
						false
					);
					expect(btnDataTestIds.includes("fab_button_add_board")).toBe(false);
				});
			});

			describe("when feature is enabled", () => {
				it("should render the button to open dialog", async () => {
					const envs = envsFactory.build({
						FEATURE_BOARD_LAYOUT_ENABLED: true,
					});
					envConfigModule.setEnvs(envs);
					const wrapper = getWrapper({ permissionData: ["course_edit"] });
					const fabComponent = wrapper.findComponent(SpeedDialMenu);

					// open menu
					await fabComponent.findComponent(VBtn).trigger("click");
					const btnDataTestIds = wrapper
						.findAllComponents(SpeedDialMenuAction)
						.map((btn) => btn.props("dataTestId"));

					expect(btnDataTestIds.includes("fab_button_add_board")).toBe(true);
				});

				it("should open layout dialog when button is clicked", async () => {
					const envs = envsFactory.build({
						FEATURE_BOARD_LAYOUT_ENABLED: true,
					});
					envConfigModule.setEnvs(envs);
					const wrapper = getWrapper({ permissionData: ["course_edit"] });

					const layoutDialog = wrapper.findComponent(
						"[data-testid=board-layout-dialog]"
					);
					expect(layoutDialog.exists()).toBe(false);

					const defaultWireframe = wrapper.findComponent(DefaultWireframe);
					defaultWireframe.vm.$emit("onFabItemClick", "board-type-dialog-open");
					await nextTick();

					const openLayoutDialog = wrapper.findComponent(
						"[data-testid=board-layout-dialog]"
					);
					expect(openLayoutDialog.exists()).toBe(true);
				});
			});
		});
	});

	describe("headline menus", () => {
		describe("students", () => {
			it("should not have the menu button for students", () => {
				const wrapper = getWrapper({ permissionData: mockPermissionsStudent });
				const menuButton = wrapper.find('[data-testid="room-menu"]');

				expect(menuButton.exists()).toBe(false);
			});
		});

		describe("teachers", () => {
			it("should have the menu button for course teachers", () => {
				const wrapper = getWrapper();
				const menuButton = wrapper.find('[data-testid="room-menu"]');

				expect(menuButton.exists()).toBe(true);
			});

			it("should not have the menu button for substitution course teachers", () => {
				const wrapper = getWrapper({
					permissionData: mockPermissionsCourseSubstitutionTeacher,
				});
				const menuButton = wrapper.find('[data-testid="room-menu"]');

				expect(menuButton.exists()).toBe(false);
			});

			describe("when 'FEATURE_COURSE_SHARE' & 'FEATURE_COPY_SERVICE_ENABLED' are turned off", () => {
				it("should only display 'edit/remove' action", async () => {
					const wrapper = getWrapper();

					const menuButton = wrapper.findComponent('[data-testid="room-menu"]');
					await menuButton.trigger("click");

					expect(
						wrapper
							.findComponent("[data-testid=room-menu-edit-delete]")
							.exists()
					).toBe(true);
					expect(
						wrapper.findComponent("[data-testid=room-menu-copy]").exists()
					).toBe(false);
					expect(
						wrapper.findComponent("[data-testid=room-menu-share]").exists()
					).toBe(false);
				});
			});

			describe("when 'FEATURE_COPY_SERVICE_ENABLED' is turned on", () => {
				it("should display 'copy' action", async () => {
					const envs = envsFactory.build({
						FEATURE_COPY_SERVICE_ENABLED: true,
					});
					envConfigModule.setEnvs(envs);
					const wrapper = getWrapper();

					const menuButton = wrapper.findComponent('[data-testid="room-menu"]');
					await menuButton.trigger("click");

					expect(
						wrapper
							.findComponent("[data-testid=room-menu-edit-delete]")
							.exists()
					).toBe(true);
					expect(
						wrapper.findComponent("[data-testid=room-menu-copy]").exists()
					).toBe(true);
					expect(
						wrapper.findComponent("[data-testid=room-menu-share]").exists()
					).toBe(false);
				});
			});

			describe("when 'FEATURE_COURSE_SHARE' is turned on", () => {
				it("should display 'share' action", async () => {
					const envs = envsFactory.build({
						FEATURE_COURSE_SHARE: true,
					});
					envConfigModule.setEnvs(envs);
					const wrapper = getWrapper();

					const menuButton = wrapper.findComponent('[data-testid="room-menu"]');
					await menuButton.trigger("click");

					expect(
						wrapper
							.findComponent("[data-testid=room-menu-edit-delete]")
							.exists()
					).toBe(true);
					expect(
						wrapper.findComponent("[data-testid=room-menu-copy]").exists()
					).toBe(false);
					expect(
						wrapper.findComponent("[data-testid=room-menu-share]").exists()
					).toBe(true);
				});
			});

			it("should redirect the page when 'Edit/Delete' menu clicked", async () => {
				Object.defineProperty(window, "location", {
					value: { href: "" },
					writable: true,
				});

				const wrapper = getWrapper();

				const threeDotButton = wrapper.findComponent(
					'[data-testid="room-menu"]'
				);
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid=room-menu-edit-delete]`
				);
				await moreActionButton.trigger("click");

				expect(window.location.href).toStrictEqual("/courses/123/edit");
			});

			describe("testing FEATURE_COPY_SERVICE_ENABLED feature flag", () => {
				it("should call the onCopyRoom method when 'Copy course' menu was clicked", async () => {
					const envs = envsFactory.build({
						FEATURE_COPY_SERVICE_ENABLED: true,
					});
					envConfigModule.setEnvs(envs);

					const wrapper = getWrapper();
					expect(wrapper.vm.courseId).toBe("123");

					const threeDotButton = wrapper.findComponent(
						'[data-testid="room-menu"]'
					);
					await threeDotButton.trigger("click");

					const moreActionButton = wrapper.findComponent(
						`[data-testid=room-menu-copy]`
					);
					await moreActionButton.trigger("click");

					expect(copyModule.copy).toHaveBeenCalled();
					expect(wrapper.vm.courseId).toBe("copiedid");
				});
			});

			describe("test Course export", () => {
				it("should not find export button when feature flag is false", async () => {
					const envs = envsFactory.build({
						FEATURE_COMMON_CARTRIDGE_COURSE_EXPORT_ENABLED: false,
					});
					envConfigModule.setEnvs(envs);

					const wrapper = getWrapper();

					const threeDotButton = wrapper.findComponent(
						'[data-testid="room-menu"]'
					);
					await threeDotButton.trigger("click");
					const moreActionButton = wrapper.findAll(
						`[data-testid=room-menu-common-cartridge-download]`
					);

					expect(moreActionButton).not.toContain(
						`[data-testid=room-menu-common-cartridge-download]`
					);
				});

				it("should call onExport method when 'Export Course' menu clicked", async () => {
					const envs = envsFactory.build({
						FEATURE_COMMON_CARTRIDGE_COURSE_EXPORT_ENABLED: true,
					});
					envConfigModule.setEnvs(envs);
					const wrapper = getWrapper();

					const threeDotButton = wrapper.findComponent(
						'[data-testid="room-menu"]'
					);
					await threeDotButton.trigger("click");
					const moreActionButton = wrapper.findComponent(
						`[data-testid=room-menu-common-cartridge-download]`
					);
					await moreActionButton.trigger("click");

					expect(downloadModule.startExportFlow).toHaveBeenCalled();
				});
			});

			it("should call shareCourse method when 'Share Course ' menu clicked", async () => {
				const envs = envsFactory.build({
					FEATURE_COURSE_SHARE: true,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper();

				const threeDotButton = wrapper.findComponent(
					'[data-testid="room-menu"]'
				);
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid=room-menu-share]`
				);
				await moreActionButton.trigger("click");

				expect(shareModule.startShareFlow).toHaveBeenCalled();
			});

			it("should call store action after 'Share Course' menu clicked", async () => {
				const envs = envsFactory.build({
					FEATURE_COURSE_SHARE: true,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper();

				const threeDotButton = wrapper.findComponent(
					'[data-testid="room-menu"]'
				);
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid=room-menu-share]`
				);
				await moreActionButton.trigger("click");

				expect(shareModule.startShareFlow).toHaveBeenCalled();
				expect(shareModule.startShareFlow).toHaveBeenCalledWith({
					id: "123",
					type: ShareTokenBodyParamsParentTypeEnum.Courses,
				});
			});
		});
	});

	describe("modal views", () => {
		it("should open modal for sharing action", () => {
			const wrapper = getWrapper();
			const modalView = wrapper.findComponent({
				name: "share-modal",
			});
			const shareDialog = modalView.findComponent({ name: "v-custom-dialog" });

			expect(shareDialog.props("isOpen")).toBe(true);
		});
	});

	describe("tabs", () => {
		describe("when clicking in the tools tab", () => {
			const setup = () => {
				const wrapper = getWrapper();

				return { wrapper };
			};

			it("should show the tools component", async () => {
				const { wrapper } = setup();

				const toolsTab = wrapper.find('[data-testid="tools-tab"]');
				await toolsTab.trigger("click");

				const toolsContent = wrapper.findComponent(RoomExternalToolsOverview);

				expect(toolsContent.exists()).toBe(true);
			});
		});
	});
});
