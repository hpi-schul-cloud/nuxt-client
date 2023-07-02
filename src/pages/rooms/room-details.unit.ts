import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import { authModule, envConfigModule, roomModule } from "@/store";
import AuthModule from "@/store/auth";
import CopyModule from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import RoomModule from "@/store/room";
import ShareModule from "@/store/share";
import { User } from "@/store/types/auth";
import { Envs } from "@/store/types/env-config";
import { initializeAxios } from "@/utils/api";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject/injection-keys";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import { AxiosInstance } from "axios";
import RoomDetailsPage from "./RoomDetails.page.vue";
import RoomExternalToolsOverview from "@/pages/rooms/external-tools/RoomExternalToolsOverview.vue";

const mockData = {
	roomId: "123",
	title: "Sample Course",
	displayColor: "black",
	elements: [
		{
			type: "task",
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
			type: "task",
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

const mockAuthStoreDataStudentInvalid = {
	__v: 0,
	_id: "asdf",
	id: "asdf",
	firstName: "Arthur",
	lastName: "Dent",
	email: "arthur.dent@hitchhiker.org",
	roles: [{ name: "student" }],
	permissions: ["ABC", "DEF"],
};

const mockAuthStoreDataTeacher = {
	__v: 1,
	_id: "asdfg",
	id: "asdfg",
	firstName: "Peter",
	lastName: "Parker",
	email: "peter.parker@hitchhiker.org",
	roles: [{ name: "teacher" }],
	permissions: [
		"COURSE_CREATE",
		"COURSE_EDIT",
		"TOPIC_CREATE",
		"TASK_CARD_EDIT",
		"HOMEWORK_CREATE",
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

let copyModuleMock: CopyModule;
let loadingStateModuleMock: LoadingStateModule;
let notifierModuleMock: NotifierModule;
let shareModuleMock: ShareModule;

const $router = { push: jest.fn(), resolve: jest.fn(), replace: jest.fn() };

const getWrapper: any = () => {
	return mount(RoomDetailsPage, {
		...createComponentMocks({
			i18n: true,
		}),
		mocks: {
			$theme: {
				short_name: "instance name",
			},
			$router,
			$route,
		},
		provide: {
			copyModule: copyModuleMock,
			loadingStateModule: loadingStateModuleMock,
			notifierModule: notifierModuleMock,
			shareModule: shareModuleMock,
			[I18N_KEY.valueOf()]: { t: (key: string) => key },
			[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
		},
		stubs: {
			RoomDashboard: true,
		},
	});
};

describe("@/pages/RoomDetails.page.vue", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");

		setupStores({
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
			roomModule: RoomModule,
		});
		roomModule.setRoomData(mockData as any);
		roomModule.setPermissionData(mockPermissionsCourseTeacher);
		authModule.setUser(mockAuthStoreDataTeacher as User);
		copyModuleMock = createModuleMocks(CopyModule, {
			getIsResultModalOpen: false,
		});
		loadingStateModuleMock = createModuleMocks(LoadingStateModule, {
			getIsOpen: false,
		});
		notifierModuleMock = createModuleMocks(NotifierModule);
		shareModuleMock = createModuleMocks(ShareModule, {
			getIsShareModalOpen: true,
			getParentType: ShareTokenBodyParamsParentTypeEnum.Lessons,
			startShareFlow: jest.fn(),
		});

		initializeAxios({
			get: async (path) => {
				return { data: [] };
			},
		} as AxiosInstance);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should fetch data", async () => {
		const wrapper = getWrapper();
		expect(wrapper.vm.roomData).toStrictEqual(mockData);
	});

	it("'to course files' button should have correct path", async () => {
		const wrapper = getWrapper();
		const backButton = wrapper.find(".back-button");
		expect(backButton.vm.href).toStrictEqual("/files/courses/123");
	});

	it("title should be the course name", async () => {
		const wrapper = getWrapper();
		const title = wrapper.find(".course-title");
		expect(title.element.textContent).toContain("Sample Course");
	});

	it("should not show FAB if user does not have permission to create courses", () => {
		authModule.setUser(mockAuthStoreDataStudentInvalid as User);
		roomModule.setPermissionData(mockPermissionsStudent);
		const wrapper = getWrapper();
		const fabComponent = wrapper.find(".wireframe-fab");
		expect(fabComponent.exists()).toBe(false);
	});

	it("should show FAB if user has permission to create courses", () => {
		const wrapper = getWrapper();
		const fabComponent = wrapper.find(".wireframe-fab");
		const actions = fabComponent.vm.actions.map((action: any) => {
			return action.label;
		});
		const hasNewTaskAction = actions.some((item: string) => {
			return item === wrapper.vm.$i18n.t("pages.rooms.fab.add.task");
		});
		const hasNewLessonAction = actions.some((item: string) => {
			return item === wrapper.vm.$i18n.t("pages.rooms.fab.add.lesson");
		});
		expect(fabComponent.exists()).toBe(true);
		expect(hasNewTaskAction).toBe(true);
		expect(hasNewLessonAction).toBe(true);
	});

	it("'add task' button should have correct path", async () => {
		const wrapper = getWrapper();
		const fabComponent = wrapper.find(".wireframe-fab");
		const newTaskAction = fabComponent.vm.actions[0];
		expect(newTaskAction.href).toStrictEqual(
			"/homework/new?course=123&returnUrl=rooms/123"
		);
	});

	it("'add lesson' button should have correct path", async () => {
		const wrapper = getWrapper();
		const fabComponent = wrapper.find(".wireframe-fab");
		const newTaskAction = fabComponent.vm.actions[1];
		expect(newTaskAction.href).toStrictEqual(
			"/courses/123/topics/add?returnUrl=rooms/123"
		);
	});

	describe("new task-card button", () => {
		const mockRoute = {
			name: "rooms-beta-task-new",
			params: { course: "123" },
		};
		beforeEach(() => {
			envConfigModule.setEnvs({ FEATURE_TASK_CARD_ENABLED: true } as Envs);
		});
		it("should show if FEATURE_TASK_CARD_ENABLED is true", () => {
			const wrapper = getWrapper();
			const fabComponent = wrapper.find(".wireframe-fab");
			expect(fabComponent.vm.actions.length).toBe(3);
		});
		it("should not show if FEATURE_TASK_CARD_ENABLED is false", () => {
			envConfigModule.setEnvs({ FEATURE_TASK_CARD_ENABLED: false } as Envs);
			const wrapper = getWrapper();
			const fabComponent = wrapper.find(".wireframe-fab");
			expect(fabComponent.vm.actions.length).toBe(2);
		});

		it("should have correct path", async () => {
			const wrapper = getWrapper();
			const fabComponent = wrapper.find(".wireframe-fab");
			const newTaskCardAction = fabComponent.vm.actions[1];
			expect(newTaskCardAction.to).toStrictEqual(mockRoute);
		});
	});

	describe("headline menus", () => {
		beforeEach(() => {
			authModule.setUser(mockAuthStoreDataTeacher as User);
			roomModule.setPermissionData(mockPermissionsCourseTeacher);
		});
		const findMenuItems = (itemName: string, menuItems: Array<any>) => {
			return menuItems.some((item: object | any) => item.name === itemName);
		};
		it("should have the menu button for course teachers", () => {
			const wrapper = getWrapper();
			const menuButton = wrapper.findAll(`[data-testid="title-menu"]`);

			expect(menuButton).toHaveLength(1);
		});

		it("should not have the menu button for students", () => {
			authModule.setUser(mockAuthStoreDataStudentInvalid as User);
			roomModule.setPermissionData(mockPermissionsStudent);
			const wrapper = getWrapper();
			const menuButton = wrapper.findAll(`[data-testid="title-menu"]`);
			expect(menuButton).toHaveLength(0);
		});

		it("should not have the menu button for substitution course teachers", () => {
			authModule.setUser(mockAuthStoreDataStudentInvalid as User);
			roomModule.setPermissionData(mockPermissionsCourseSubstitutionTeacher);
			const wrapper = getWrapper();
			const menuButton = wrapper.findAll(`[data-testid="title-menu"]`);
			expect(menuButton).toHaveLength(0);
		});

		it("should have the headline menu items", () => {
			envConfigModule.setEnvs({
				FEATURE_COPY_SERVICE_ENABLED: true,
				FEATURE_COURSE_SHARE: true,
			} as Envs);
			const wrapper = getWrapper();
			const menuItems = wrapper.vm.headlineMenuItems;

			expect(menuItems).toHaveLength(3);
			expect(
				findMenuItems(
					wrapper.vm.$i18n.t("common.actions.edit") +
						"/" +
						wrapper.vm.$i18n.t("common.actions.remove"),
					menuItems
				)
			).toBe(true);
			expect(
				findMenuItems(wrapper.vm.$i18n.t("common.actions.copy"), menuItems)
			).toBe(true);
			expect(
				findMenuItems(
					wrapper.vm.$i18n.t("common.actions.shareCourse"),
					menuItems
				)
			).toBe(true);
		});

		it("should have 'Share Course' menu if 'FEATURE_COURSE_SHARE' flag set to true", () => {
			envConfigModule.setEnvs({ FEATURE_COURSE_SHARE: true } as Envs);
			const wrapper = getWrapper();
			const menuItems = wrapper.vm.headlineMenuItems;

			expect(
				findMenuItems(
					wrapper.vm.$i18n.t("common.actions.shareCourse"),
					menuItems
				)
			).toBe(true);
		});

		it("should redirect the page when 'Edit/Delete' menu clicked", async () => {
			const location = window.location;
			const wrapper = getWrapper();

			const threeDotButton = wrapper.find(".three-dot-button");
			await threeDotButton.trigger("click");
			const moreActionButton = wrapper.find(
				`[data-testid=title-menu-edit-delete]`
			);
			await moreActionButton.trigger("click");

			expect(location.href).toStrictEqual("/courses/123/edit");
		});

		describe("testing FEATURE_COPY_SERVICE_ENABLED feature flag", () => {
			it("should have 'Copy Course' menu if 'FEATURE_COPY_SERVICE_ENABLED' flag set to true", () => {
				envConfigModule.setEnvs({ FEATURE_COPY_SERVICE_ENABLED: true } as Envs);
				const wrapper = getWrapper();
				const menuItems = wrapper.vm.headlineMenuItems;

				expect(
					findMenuItems(wrapper.vm.$i18n.t("common.actions.copy"), menuItems)
				).toBe(true);
			});

			it("should call the onCopyRoom method when 'Copy course' menu clicked", async () => {
				envConfigModule.setEnvs({
					FEATURE_COPY_SERVICE_ENABLED: true,
				} as Envs);
				const onCopyRoom = jest.fn();
				const wrapper = getWrapper();
				wrapper.vm.onCopyRoom = onCopyRoom;

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");
				const moreActionButton = wrapper.find(`[data-testid=title-menu-copy]`);
				await moreActionButton.trigger("click");

				expect(onCopyRoom).toHaveBeenCalled();
			});
		});

		it("should call shareCourse method when 'Share Course ' menu clicked", async () => {
			envConfigModule.setEnvs({ FEATURE_COURSE_SHARE: true } as Envs);
			const shareCourseSpy = jest.fn();
			const wrapper = getWrapper();
			wrapper.vm.shareCourse = shareCourseSpy;

			const threeDotButton = wrapper.find(".three-dot-button");
			await threeDotButton.trigger("click");
			const moreActionButton = wrapper.find(`[data-testid=title-menu-share]`);
			await moreActionButton.trigger("click");

			expect(shareCourseSpy).toHaveBeenCalled();
		});

		it("should call store action after 'Share Course' menu clicked", async () => {
			envConfigModule.setEnvs({ FEATURE_COURSE_SHARE_NEW: true } as Envs);
			const wrapper = getWrapper();

			const threeDotButton = wrapper.find(".three-dot-button");
			await threeDotButton.trigger("click");
			const moreActionButton = wrapper.find(`[data-testid=title-menu-share]`);
			await moreActionButton.trigger("click");

			expect(shareModuleMock.startShareFlow).toHaveBeenCalled();
			expect(shareModuleMock.startShareFlow).toHaveBeenCalledWith({
				id: "123",
				type: ShareTokenBodyParamsParentTypeEnum.Courses,
			});
		});

		describe("modal views", () => {
			it("should open modal for sharing action", async () => {
				const wrapper = getWrapper();
				const modalView = wrapper.find(`[data-testid="share-dialog"]`);

				expect(modalView.vm.isOpen).toBe(true);
			});

			it("should close the modal and call 'closeDialog' method", async () => {
				const closeDialogSpy = jest.fn();
				const wrapper = getWrapper();
				wrapper.vm.closeDialog = closeDialogSpy;
				wrapper.setData({
					dialog: {
						isOpen: true,
						model: "share",
						header: wrapper.vm.$i18n.t("pages.room.modal.course.share.header"),
						text: wrapper.vm.$i18n.t("pages.room.modal.course.share.text"),
						inputText: "shareToken_123456",
						subText: wrapper.vm.$i18n.t(
							"pages.room.modal.course.share.subText"
						),
						courseShareToken: "shareToken_123456",
						qrUrl: "/courses?import=shareToken_123456",
					},
				});

				await wrapper.vm.$nextTick();
				const modalView = wrapper.find(`[data-testid="title-dialog"]`);
				const closeButton = modalView.find(`[data-testid="dialog-close"]`);
				await closeButton.trigger("click");

				expect(closeDialogSpy).toHaveBeenCalled();
			});
		});
	});

	describe("tabs", () => {
		describe("when feature flag is enabled", () => {
			const setup = () => {
				envConfigModule.setEnvs({
					FEATURE_CTL_TOOLS_TAB_ENABLED: true,
				} as Envs);

				const wrapper = getWrapper();

				return { wrapper };
			};

			it("should find tools(new)-tab", () => {
				const { wrapper } = setup();

				const tabTitle = wrapper.find('[data-testid="tools-tab"]');

				expect(tabTitle.text()).toEqual(
					wrapper.vm.$t("pages.rooms.tabLabel.tools")
				);
			});
		});

		describe("when feature flag is disabled", () => {
			const setup = () => {
				envConfigModule.setEnvs({
					FEATURE_CTL_TOOLS_TAB_ENABLED: false,
				} as Envs);

				const wrapper = getWrapper();

				return { wrapper };
			};

			it("should not find tools(new)-tab", () => {
				const { wrapper } = setup();

				const tabTitle = wrapper.find('[data-testid="tools-tab"]');

				expect(tabTitle.exists()).toEqual(false);
			});
		});

		describe("when Tools(new) tab is active", () => {
			const setup = () => {
				envConfigModule.setEnvs({
					FEATURE_CTL_TOOLS_TAB_ENABLED: true,
				} as Envs);
				authModule.addUserPermmission("CONTEXT_TOOL_ADMIN");

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

		describe("when Tools(new) tab is active and the user has admin permissions", () => {
			const setup = () => {
				envConfigModule.setEnvs({
					FEATURE_CTL_TOOLS_TAB_ENABLED: true,
				} as Envs);
				authModule.addUserPermmission("CONTEXT_TOOL_ADMIN");

				const wrapper = getWrapper();

				return { wrapper };
			};

			it("should show an 'add' button", async () => {
				const { wrapper } = setup();

				const toolsTab = wrapper.find('[data-testid="tools-tab"]');
				await toolsTab.trigger("click");

				const addButton = wrapper.find('[data-testid="add-tool-button"]');

				expect(addButton.exists()).toEqual(true);
			});
		});
	});
});
