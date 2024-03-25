import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import { authModule, envConfigModule, roomModule } from "@/store";
import AuthModule from "@/store/auth";
import CommonCartridgeExportModule from "@/store/common-cartridge-export";
import CopyModule from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import RoomModule from "@/store/room";
import ShareModule from "@/store/share";
import { Envs } from "@/store/types/env-config";
import { initializeAxios } from "@/utils/api";
import {
	COMMON_CARTRIDGE_EXPORT_MODULE_KEY,
	COPY_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	SHARE_MODULE_KEY,
	ROOM_MODULE_KEY,
} from "@/utils/inject/injection-keys";
import { createModuleMocks } from "@/utils/mock-store-module";
import { meResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock } from "@golevelup/ts-jest";
import { SpeedDialMenu, SpeedDialMenuAction } from "@ui-speed-dial-menu";
import { mount } from "@vue/test-utils";
import { AxiosInstance } from "axios";
import { VBtn } from "vuetify/lib/components/index.mjs";
import RoomDetailsPage from "./RoomDetails.page.vue";
import RoomExternalToolsOverview from "./tools/RoomExternalToolsOverview.vue";

jest.mock("./tools/RoomExternalToolsOverview.vue");

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
let downloadModuleMock: CommonCartridgeExportModule;

const $router = { push: jest.fn(), resolve: jest.fn(), replace: jest.fn() };

const getWrapper = () => {
	const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
		getCtlToolsTabEnabled: false,
	});

	// we need this because in order for useMediaQuery (vueuse) to work
	// window.matchMedia has to return a reasonable result.
	// https://github.com/vueuse/vueuse/blob/main/packages/core/useMediaQuery/index.ts#L44
	jest
		.spyOn(window, "matchMedia")
		.mockReturnValue(createMock<MediaQueryList>());

	return mount(RoomDetailsPage, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			mocks: {
				$router,
				$route,
			},
			provide: {
				[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
				loadingStateModule: loadingStateModuleMock,
				notifierModule: notifierModuleMock,
				[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
				[COMMON_CARTRIDGE_EXPORT_MODULE_KEY.valueOf()]: downloadModuleMock,
				[ROOM_MODULE_KEY.valueOf()]: createModuleMocks(RoomModule, {
					getRoomData: {
						roomId: "1",
						title: "title",
						displayColor: "color",
						elements: [],
						isArchived: false,
						isSynchronized: false,
					},
				}),
			},
			stubs: {
				RoomDashboard: true,
				RoomExternalToolsOverview: true,
				EndCourseSyncDialog: true,
			},
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
		copyModuleMock = createModuleMocks(CopyModule, {
			getIsResultModalOpen: false,
		});
		loadingStateModuleMock = createModuleMocks(LoadingStateModule, {
			getIsOpen: false,
		});
		notifierModuleMock = createModuleMocks(NotifierModule);
		shareModuleMock = createModuleMocks(ShareModule, {
			getIsShareModalOpen: true,
			getParentType: ShareTokenBodyParamsParentTypeEnum.Courses,
			createShareUrl: jest.fn(),
			resetShareFlow: jest.fn(),
		});
		downloadModuleMock = createModuleMocks(CommonCartridgeExportModule, {
			getIsExportModalOpen: false,
			getVersion: "",
			getTopics: [],
			getTasks: [],
		});

		initializeAxios({
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			get: async (path) => {
				return { data: [] };
			},
		} as AxiosInstance);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should fetch data", () => {
		const wrapper = getWrapper();
		expect(wrapper.vm.roomData).toStrictEqual(mockData);
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
		const mockMe = meResponseFactory.build();
		authModule.setMe(mockMe);
		roomModule.setPermissionData(mockPermissionsStudent);
		const wrapper = getWrapper();
		const fabComponent = wrapper.find(".wireframe-fab");
		expect(fabComponent.exists()).toBe(false);
	});

	describe("menu", () => {
		it("should show FAB if user has permission to create homework", () => {
			const mockMe = meResponseFactory.build({
				permissions: ["HOMEWORK_CREATE"],
			});
			authModule.setMe(mockMe);
			const wrapper = getWrapper();
			const fabComponent = wrapper.findComponent(SpeedDialMenu);

			expect(fabComponent.exists()).toBe(true);
		});

		it("'add task' button should have correct path", async () => {
			const mockMe = meResponseFactory.build({
				permissions: ["HOMEWORK_CREATE"],
			});
			authModule.setMe(mockMe);
			const wrapper = getWrapper();
			const fabComponent = wrapper.findComponent(SpeedDialMenu);

			// open menu
			await fabComponent.findComponent(VBtn).trigger("click");
			const newTaskAction = wrapper.findAllComponents(SpeedDialMenuAction)[0];

			expect(newTaskAction.props("href")).toStrictEqual(
				"/homework/new?course=123&returnUrl=rooms/123"
			);
		});

		it("'add lesson' button should have correct path", async () => {
			const mockMe = meResponseFactory.build({
				permissions: ["HOMEWORK_CREATE", "TOPIC_CREATE"],
			});
			authModule.setMe(mockMe);
			const wrapper = getWrapper();
			const fabComponent = wrapper.findComponent(SpeedDialMenu);

			// open menu
			await fabComponent.findComponent(VBtn).trigger("click");
			const newTaskAction = wrapper.findAllComponents(SpeedDialMenuAction)[1];

			expect(newTaskAction.props("href")).toStrictEqual(
				"/courses/123/topics/add?returnUrl=rooms/123"
			);
		});
	});

	describe("headline menus", () => {
		beforeEach(() => {
			const mockMe = meResponseFactory.build();
			authModule.setMe(mockMe);
			roomModule.setPermissionData(mockPermissionsCourseTeacher);
		});
		const findMenuItems = (itemName: string, menuItems: Array<any>) => {
			return menuItems.some((item: object | any) => item.name === itemName);
		};
		it("should have the menu button for course teachers", () => {
			const wrapper = getWrapper();
			const menuButton = wrapper.find(
				'button[data-testid="room-tool-three-dot-button"]'
			);

			expect(menuButton.exists()).toBe(true);
		});

		it("should not have the menu button for students", () => {
			roomModule.setPermissionData(mockPermissionsStudent);
			const wrapper = getWrapper();
			const menuButton = wrapper.find(
				'button[data-testid="room-tool-three-dot-button"]'
			);

			expect(menuButton.exists()).toBe(false);
		});

		it("should not have the menu button for substitution course teachers", () => {
			roomModule.setPermissionData(mockPermissionsCourseSubstitutionTeacher);
			const wrapper = getWrapper();
			const menuButton = wrapper.find(
				'button[data-testid="room-tool-three-dot-button"]'
			);

			expect(menuButton.exists()).toBe(false);
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
					"common.actions.edit" + "/" + "common.actions.remove",
					menuItems
				)
			).toBe(true);
			expect(findMenuItems("common.actions.copy", menuItems)).toBe(true);
			expect(findMenuItems("common.actions.shareCourse", menuItems)).toBe(true);
		});

		it("should have 'Share Course' menu if 'FEATURE_COURSE_SHARE' flag set to true", () => {
			envConfigModule.setEnvs({ FEATURE_COURSE_SHARE: true } as Envs);
			const wrapper = getWrapper();
			const menuItems = wrapper.vm.headlineMenuItems;

			expect(findMenuItems("common.actions.shareCourse", menuItems)).toBe(true);
		});

		it("should redirect the page when 'Edit/Delete' menu clicked", async () => {
			Object.defineProperty(window, "location", {
				value: { href: "" },
				writable: true,
			});

			const wrapper = getWrapper();

			const threeDotButton = wrapper.findComponent(
				'button[data-testid="room-tool-three-dot-button"]'
			);
			await threeDotButton.trigger("click");

			const moreActionButton = wrapper.findComponent(
				`[data-testid=title-menu-edit-delete]`
			);
			await moreActionButton.trigger("click");

			expect(window.location.href).toStrictEqual("/courses/123/edit");
		});

		describe("testing FEATURE_COPY_SERVICE_ENABLED feature flag", () => {
			it("should have 'Copy Course' menu if 'FEATURE_COPY_SERVICE_ENABLED' flag set to true", () => {
				envConfigModule.setEnvs({ FEATURE_COPY_SERVICE_ENABLED: true } as Envs);
				const wrapper = getWrapper();
				const menuItems = wrapper.vm.headlineMenuItems;

				expect(findMenuItems("common.actions.copy", menuItems)).toBe(true);
			});

			it("should call the onCopyRoom method when 'Copy course' menu clicked", async () => {
				envConfigModule.setEnvs({
					FEATURE_COPY_SERVICE_ENABLED: true,
				} as Envs);
				const onCopyRoom = jest.fn();
				const wrapper = getWrapper();
				wrapper.vm.onCopyRoom = onCopyRoom;

				const threeDotButton = wrapper.findComponent(
					'button[data-testid="room-tool-three-dot-button"]'
				);
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findComponent(
					`[data-testid=title-menu-copy]`
				);
				await moreActionButton.trigger("click");

				expect(onCopyRoom).toHaveBeenCalled();
			});
		});

		describe("test Course export", () => {
			it("should not find export button when feature flag is false", async () => {
				envConfigModule.setEnvs({
					FEATURE_COMMON_CARTRIDGE_COURSE_EXPORT_ENABLED: false,
				} as Envs);
				const onExport = jest.fn();
				const wrapper = getWrapper();
				wrapper.vm.onExport = onExport;

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");
				const moreActionButton = wrapper.findAll(
					`[data-testid=title-menu-common-cartridge-download]`
				);

				expect(moreActionButton).not.toContain(
					`[data-testid=title-menu-common-cartridge-download]`
				);
			});

			it("should call onExport method when 'Export Course' menu clicked", async () => {
				envConfigModule.setEnvs({
					FEATURE_COMMON_CARTRIDGE_COURSE_EXPORT_ENABLED: true,
				} as Envs);
				const onExport = jest.fn();
				const wrapper = getWrapper();
				wrapper.vm.onExport = onExport;

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");
				const moreActionButton = wrapper.findComponent(
					`[data-testid=title-menu-common-cartridge-download]`
				);
				await moreActionButton.trigger("click");

				expect(onExport).toHaveBeenCalled();
			});
		});

		it("should call shareCourse method when 'Share Course ' menu clicked", async () => {
			envConfigModule.setEnvs({ FEATURE_COURSE_SHARE: true } as Envs);
			const shareCourseSpy = jest.fn();
			const wrapper = getWrapper();
			wrapper.vm.shareCourse = shareCourseSpy;

			const threeDotButton = wrapper.findComponent(
				'button[data-testid="room-tool-three-dot-button"]'
			);
			await threeDotButton.trigger("click");

			const moreActionButton = wrapper.findComponent(
				`[data-testid=title-menu-share]`
			);
			await moreActionButton.trigger("click");

			expect(shareCourseSpy).toHaveBeenCalled();
		});

		it("should call store action after 'Share Course' menu clicked", async () => {
			envConfigModule.setEnvs({ FEATURE_COURSE_SHARE: true } as Envs);
			const wrapper = getWrapper();

			const threeDotButton = wrapper.findComponent(
				'button[data-testid="room-tool-three-dot-button"]'
			);
			await threeDotButton.trigger("click");

			const moreActionButton = wrapper.findComponent(
				`[data-testid=title-menu-share]`
			);
			await moreActionButton.trigger("click");

			expect(shareModuleMock.startShareFlow).toHaveBeenCalled();
			expect(shareModuleMock.startShareFlow).toHaveBeenCalledWith({
				id: "123",
				type: ShareTokenBodyParamsParentTypeEnum.Courses,
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

				expect(tabTitle.text()).toEqual("pages.rooms.tabLabel.tools");
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
