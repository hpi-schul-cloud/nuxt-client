import CourseRoomDetailsPage from "./CourseRoomDetails.page.vue";
import CourseRoomLockedPage from "./CourseRoomLocked.page.vue";
import RoomExternalToolsOverview from "@/components/course-rooms/tools/RoomExternalToolsOverview.vue";
import {
	BoardElementResponse,
	BoardElementResponseTypeEnum as BoardTypes,
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
	ImportUserResponseRoleNamesEnum,
	Permission,
	ShareTokenBodyParamsParentTypeEnum,
} from "@/serverApi/v3/api";
import CommonCartridgeExportModule from "@/store/common-cartridge-export";
import CopyModule from "@/store/copy";
import CourseRoomDetailsModule from "@/store/course-room-details";
import ShareModule from "@/store/share";
import {
	COMMON_CARTRIDGE_EXPORT_MODULE_KEY,
	COPY_MODULE_KEY,
	COURSE_ROOM_DETAILS_MODULE_KEY,
	SHARE_MODULE_KEY,
} from "@/utils/inject/injection-keys";
import { createTestAppStore, createTestEnvStore, singleColumnBoardResponseFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { SelectBoardLayoutDialog } from "@ui-room-details";
import { SpeedDialMenu } from "@ui-speed-dial-menu";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { VBtn } from "vuetify/components";

const boardElements: Array<BoardElementResponse> = [
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
];

const mockPermissionsCourseTeacher = [Permission.CourseCreate, Permission.CourseEdit];
const mockPermissionsCourseSubstitutionTeacher = [Permission.HomeworkCreate, Permission.HomeworkEdit];
const mockPermissionsStudent = [Permission.BaseView];

describe("CourseRoomDetails.page.vue", () => {
	let copyModule: CopyModule;
	let shareModule: ShareModule;
	let downloadModule: CommonCartridgeExportModule;
	let courseRoomDetailsModule: CourseRoomDetailsModule;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const setup = (
		options?: Partial<{
			permissionData: Permission[];
			roleName: ImportUserResponseRoleNamesEnum;
			isLocked: boolean;
		}>
	) => {
		const { permissionData, roleName, isLocked } = {
			permissionData: mockPermissionsCourseTeacher,
			roleName: ImportUserResponseRoleNamesEnum.Teacher,
			isLocked: false,
			...options,
		};

		const singleColumnBoard = singleColumnBoardResponseFactory.build({ elements: boardElements });
		copyModule = createModuleMocks(CopyModule, {
			getIsResultModalOpen: false,
			getCopyResult: {
				id: "copiedid",
				type: CopyApiResponseTypeEnum.Course,
				title: "Sample Course",
				elements: [],
				status: CopyApiResponseStatusEnum.Success,
			},
		});
		downloadModule = createModuleMocks(CommonCartridgeExportModule);
		shareModule = createModuleMocks(ShareModule, {
			getIsShareModalOpen: true,
			getParentType: ShareTokenBodyParamsParentTypeEnum.Courses,
		});
		courseRoomDetailsModule = createModuleMocks(CourseRoomDetailsModule, {
			getRoomData: singleColumnBoard,
			getPermissionData: permissionData,
			getIsLocked: isLocked,
		});

		createTestAppStore({
			me: { roles: [{ id: "0", name: roleName }], permissions: permissionData },
		});

		// we need this because in order for useMediaQuery (vueuse) to work
		// window.matchMedia has to return a reasonable result.
		// https://github.com/vueuse/vueuse/blob/main/packages/core/useMediaQuery/index.ts#L44
		vi.spyOn(window, "matchMedia").mockReturnValue(createMock<MediaQueryList>());

		const $route = {
			params: {
				id: singleColumnBoard.roomId,
			},
			path: "/rooms/",
		};
		const $router = { push: vi.fn(), resolve: vi.fn(), replace: vi.fn() };

		const wrapper = mount(CourseRoomDetailsPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$router,
					$route,
				},
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModule,
					[SHARE_MODULE_KEY.valueOf()]: shareModule,
					[COMMON_CARTRIDGE_EXPORT_MODULE_KEY.valueOf()]: downloadModule,
					[COURSE_ROOM_DETAILS_MODULE_KEY.valueOf()]: courseRoomDetailsModule,
				},
				stubs: {
					CourseRoomDashboard: true,
					RoomExternalToolsOverview: true,
					EndCourseSyncDialog: true,
					StartExistingCourseSyncDialog: true,
					UseFocusTrap: true,
				},
			},
		});

		return { wrapper, singleColumnBoard };
	};

	it("should fetch data", () => {
		setup();

		expect(courseRoomDetailsModule.fetchContent).toHaveBeenCalled();
	});

	it("'to course files' button should have correct path", () => {
		const { wrapper, singleColumnBoard } = setup();
		const backButton = wrapper.find(".back-button");
		expect(backButton.attributes("href")).toStrictEqual(`/files/courses/${singleColumnBoard.roomId}`);
	});

	it("title should be the course name", () => {
		const { wrapper, singleColumnBoard } = setup();
		const title = wrapper.find(".course-title");
		expect(title.element.textContent).toContain(singleColumnBoard.title);
	});

	it("should not show FAB if user does not have permission to create courses", () => {
		const { wrapper } = setup({ permissionData: mockPermissionsStudent });
		const fabComponent = wrapper.find(".wireframe-fab");
		expect(fabComponent.exists()).toBe(false);
	});

	describe("when course is locked", () => {
		it("should show the locked course page", () => {
			const { wrapper } = setup({
				isLocked: true,
			});

			const lockedCoursePage = wrapper.findComponent(CourseRoomLockedPage);
			expect(lockedCoursePage.exists()).toBe(true);
		});
	});

	describe("menu", () => {
		it("should show FAB if user has permission to create homework", () => {
			const { wrapper } = setup({
				permissionData: [Permission.HomeworkCreate],
			});
			const fabComponent = wrapper.findComponent(SpeedDialMenu);

			expect(fabComponent.exists()).toBe(true);
		});

		describe("'add list board' button", () => {
			describe("when user doesn't have course edit permission", () => {
				it("should not render any board creation button", async () => {
					const { wrapper } = setup({
						permissionData: [Permission.HomeworkCreate, Permission.TopicCreate],
					});
					const fabComponent = wrapper.findComponent(SpeedDialMenu);
					const btnDataTestIds = fabComponent.vm.actions.map((action) => action.dataTestId);

					expect(btnDataTestIds.includes("fab_button_add_column_board")).toBe(false);
					expect(btnDataTestIds.includes("fab_button_add_board")).toBe(false);
				});
			});

			describe("when feature is enabled", () => {
				it("should render the button to open dialog", async () => {
					const { wrapper } = setup({
						permissionData: [Permission.CourseEdit],
					});
					const fabComponent = wrapper.findComponent(SpeedDialMenu);
					const btnDataTestIds = fabComponent.vm.actions.map((action) => action.dataTestId);

					expect(btnDataTestIds.includes("fab_button_add_board")).toBe(true);
				});

				it("should open layout dialog when button is clicked", async () => {
					const { wrapper } = setup({
						permissionData: [Permission.CourseEdit],
					});

					const openLayoutDialog = wrapper.findComponent(SelectBoardLayoutDialog);
					expect(openLayoutDialog.props().modelValue).toBe(false);

					const fabComponent = wrapper.findComponent(SpeedDialMenu);
					await fabComponent.getComponent(VBtn).trigger("click");

					const addBoardButton = wrapper.findComponent("[data-testid=fab_button_add_board]");
					await addBoardButton.getComponent(VBtn).trigger("click");
					await nextTick();
					expect(openLayoutDialog.props().modelValue).toBe(true);
				});
			});
		});
	});

	describe("headline menus", () => {
		describe("students", () => {
			it("should not have the menu button for students", () => {
				const { wrapper } = setup({ permissionData: mockPermissionsStudent });
				const menuButton = wrapper.find('[data-testid="room-menu"]');

				expect(menuButton.exists()).toBe(false);
			});
		});

		describe("teachers", () => {
			it("should have the menu button for course teachers", () => {
				const { wrapper } = setup();
				const menuButton = wrapper.find('[data-testid="room-menu"]');

				expect(menuButton.exists()).toBe(true);
			});

			it("should not have the menu button for substitution course teachers", () => {
				const { wrapper } = setup({
					permissionData: mockPermissionsCourseSubstitutionTeacher,
				});
				const menuButton = wrapper.find('[data-testid="room-menu"]');

				expect(menuButton.exists()).toBe(false);
			});

			describe("when 'FEATURE_COURSE_SHARE' & 'FEATURE_COPY_SERVICE_ENABLED' are turned off", () => {
				it("should only display 'edit/remove' action", async () => {
					const { wrapper } = setup();

					const menuButton = wrapper.findComponent('[data-testid="room-menu"]');
					await menuButton.trigger("click");

					expect(wrapper.findComponent("[data-testid=room-menu-edit-delete]").exists()).toBe(true);
					expect(wrapper.findComponent("[data-testid=room-menu-copy]").exists()).toBe(false);
					expect(wrapper.findComponent("[data-testid=room-menu-share]").exists()).toBe(false);
				});
			});

			describe("when 'FEATURE_COPY_SERVICE_ENABLED' is turned on", () => {
				it("should display 'copy' action", async () => {
					createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });
					const { wrapper } = setup();

					const menuButton = wrapper.findComponent('[data-testid="room-menu"]');
					await menuButton.trigger("click");

					expect(wrapper.findComponent("[data-testid=room-menu-edit-delete]").exists()).toBe(true);
					expect(wrapper.findComponent("[data-testid=room-menu-copy]").exists()).toBe(true);
					expect(wrapper.findComponent("[data-testid=room-menu-share]").exists()).toBe(false);
				});
			});

			describe("when 'FEATURE_COURSE_SHARE' is turned on", () => {
				it("should display 'share' action", async () => {
					createTestEnvStore({
						FEATURE_COURSE_SHARE: true,
						FEATURE_COPY_SERVICE_ENABLED: false,
					});

					const { wrapper } = setup();

					const menuButton = wrapper.findComponent('[data-testid="room-menu"]');
					await menuButton.trigger("click");

					expect(wrapper.findComponent("[data-testid=room-menu-edit-delete]").exists()).toBe(true);
					expect(wrapper.findComponent("[data-testid=room-menu-copy]").exists()).toBe(false);
					expect(wrapper.findComponent("[data-testid=room-menu-share]").exists()).toBe(true);
				});
			});

			it("should redirect the page when 'Edit/Delete' menu clicked", async () => {
				Object.defineProperty(window, "location", {
					value: { href: "" },
					writable: true,
				});

				const { wrapper, singleColumnBoard } = setup();

				const threeDotButton = wrapper.findComponent('[data-testid="room-menu"]');
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(`[data-testid=room-menu-edit-delete]`);
				await moreActionButton.trigger("click");

				expect(window.location.href).toStrictEqual(`/courses/${singleColumnBoard.roomId}/edit`);
			});

			describe("testing FEATURE_COPY_SERVICE_ENABLED feature flag", () => {
				it("should call the onCopyRoom method when 'Copy course' menu was clicked", async () => {
					createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });

					const { wrapper, singleColumnBoard } = setup();
					expect(wrapper.vm.courseId).toBe(singleColumnBoard.roomId);

					const threeDotButton = wrapper.findComponent('[data-testid="room-menu"]');
					await threeDotButton.trigger("click");

					const moreActionButton = wrapper.findComponent(`[data-testid=room-menu-copy]`);
					await moreActionButton.trigger("click");

					expect(copyModule.copy).toHaveBeenCalled();
					expect(wrapper.vm.courseId).toBe("copiedid");
				});
			});

			describe("test Course export", () => {
				it("should not find export button when feature flag is false", async () => {
					createTestEnvStore({
						FEATURE_COMMON_CARTRIDGE_COURSE_EXPORT_ENABLED: false,
					});

					const { wrapper } = setup();

					const threeDotButton = wrapper.findComponent('[data-testid="room-menu"]');
					await threeDotButton.trigger("click");
					const moreActionButton = wrapper.findAll(`[data-testid=room-menu-common-cartridge-download]`);

					expect(moreActionButton).not.toContain(`[data-testid=room-menu-common-cartridge-download]`);
				});

				it("should call onExport method when 'Export Course' menu clicked", async () => {
					createTestEnvStore({
						FEATURE_COMMON_CARTRIDGE_COURSE_EXPORT_ENABLED: true,
					});

					const { wrapper } = setup();

					const threeDotButton = wrapper.findComponent('[data-testid="room-menu"]');
					await threeDotButton.trigger("click");
					const moreActionButton = wrapper.findComponent(`[data-testid=room-menu-common-cartridge-download]`);
					await moreActionButton.trigger("click");

					expect(downloadModule.startExportFlow).toHaveBeenCalled();
				});
			});

			it("should call shareCourse method when 'Share Course ' menu clicked", async () => {
				createTestEnvStore({ FEATURE_COURSE_SHARE: true });

				const { wrapper } = setup();

				const threeDotButton = wrapper.findComponent('[data-testid="room-menu"]');
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(`[data-testid=room-menu-share]`);
				await moreActionButton.trigger("click");

				expect(shareModule.startShareFlow).toHaveBeenCalled();
			});

			it("should call store action after 'Share Course' menu clicked", async () => {
				createTestEnvStore({ FEATURE_COURSE_SHARE: true });

				const { wrapper, singleColumnBoard } = setup();

				const threeDotButton = wrapper.findComponent('[data-testid="room-menu"]');
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(`[data-testid=room-menu-share]`);
				await moreActionButton.trigger("click");

				expect(shareModule.startShareFlow).toHaveBeenCalled();
				expect(shareModule.startShareFlow).toHaveBeenCalledWith({
					id: singleColumnBoard.roomId,
					type: ShareTokenBodyParamsParentTypeEnum.Courses,
				});
			});
		});
	});

	describe("modal views", () => {
		it("should open modal for sharing action", () => {
			const { wrapper } = setup();
			const modalView = wrapper.findComponent({
				name: "ShareModal",
			});
			const shareDialog = modalView.findComponent({ name: "CustomDialog" });

			expect(shareDialog.props("isOpen")).toBe(true);
		});
	});

	describe("tabs", () => {
		describe("when clicking in the tools tab", () => {
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
