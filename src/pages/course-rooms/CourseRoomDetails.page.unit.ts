import CourseRoomDetailsPage from "./CourseRoomDetails.page.vue";
import CourseRoomLockedPage from "./CourseRoomLocked.page.vue";
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal.vue";
import CourseCommonCartridgeExportModal from "@/components/course-rooms/CourseCommonCartridgeExportModal.vue";
import CopyModule from "@/store/copy";
import CourseRoomDetailsModule from "@/store/course-room-details";
import ShareModule from "@/store/share";
import { COPY_MODULE_KEY, COURSE_ROOM_DETAILS_MODULE_KEY, SHARE_MODULE_KEY } from "@/utils/inject/injection-keys";
import { mockComposable } from "@@/tests/test-utils/mockComposable";
import { useCommonCartridgeExport } from "@data-common-cartridge";
import { Mocked } from "vitest";

vi.mock("@data-common-cartridge");
const useCommonCartridgeExportMock = vi.mocked(useCommonCartridgeExport);

import { createTestAppStore, createTestEnvStore, singleColumnBoardResponseFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import {
	BoardElementResponse,
	BoardElementResponseType as BoardTypes,
	BoardLayout,
	CopyApiResponseStatus,
	CopyApiResponseType,
	ImportUserResponseRoleNames,
	Permission,
	ShareTokenBodyParamsParentType,
} from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { DefaultWireframe } from "@ui-layout";
import { RoomDotMenu, SelectBoardLayoutDialog } from "@ui-room-details";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { mock } from "vitest-mock-extended";
import { nextTick } from "vue";
import { createRouterMock, injectRouterMock, RouterMock } from "vue-router-mock";

const boardElements: Array<BoardElementResponse> = [
	{
		type: BoardTypes.TASK,
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
];

const mockPermissionsCourseTeacher = [Permission.COURSE_CREATE, Permission.COURSE_EDIT];
const mockPermissionsCourseSubstitutionTeacher = [Permission.HOMEWORK_CREATE, Permission.HOMEWORK_EDIT];
const mockPermissionsStudent = [Permission.BASE_VIEW];

describe("CourseRoomDetails.page.vue", () => {
	let copyModule: CopyModule;
	let shareModule: ShareModule;
	let courseRoomDetailsModule: CourseRoomDetailsModule;
	let useCommonCartridgeExportMockReturn: Mocked<ReturnType<typeof useCommonCartridgeExport>>;
	let router: RouterMock;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		router = createRouterMock();
		injectRouterMock(router);

		useCommonCartridgeExportMockReturn = mockComposable(useCommonCartridgeExport, {
			startExport: vi.fn(),
			allowedVersions: ["1.1.0", "1.3.0"],
		});
		useCommonCartridgeExportMock.mockReturnValue(useCommonCartridgeExportMockReturn);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const setup = (
		options?: Partial<{
			permissionData: Permission[];
			roleName: ImportUserResponseRoleNames;
			isLocked: boolean;
			isSynchronized: boolean;
			isArchived: boolean;
			copyResultId?: string;
		}>
	) => {
		const { permissionData, roleName, isLocked, isSynchronized, isArchived, copyResultId } = {
			permissionData: mockPermissionsCourseTeacher,
			roleName: ImportUserResponseRoleNames.TEACHER,
			isLocked: false,
			isSynchronized: false,
			isArchived: false,
			copyResultId: "copiedid",
			...options,
		};

		const singleColumnBoard = singleColumnBoardResponseFactory.build({
			elements: boardElements,
			isSynchronized,
			isArchived,
		});

		copyModule = createModuleMocks(CopyModule, {
			getIsResultModalOpen: false,
			getCopyResult: copyResultId
				? {
						id: copyResultId,
						type: CopyApiResponseType.COURSE,
						title: "Sample Course",
						elements: [],
						status: CopyApiResponseStatus.SUCCESS,
					}
				: {
						status: CopyApiResponseStatus.PARTIAL,
						type: CopyApiResponseType.COURSE,
					},
		});

		shareModule = createModuleMocks(ShareModule, {
			getIsShareModalOpen: true,
			getParentType: ShareTokenBodyParamsParentType.COURSES,
		});

		courseRoomDetailsModule = createModuleMocks(CourseRoomDetailsModule, {
			getRoomData: singleColumnBoard,
			getPermissionData: permissionData,
			getIsLocked: isLocked,
		});

		// Mock createBoard action to return the new board id
		vi.mocked(courseRoomDetailsModule.createBoard).mockResolvedValue({
			id: "new-board-id",
		});

		createTestAppStore({
			me: {
				roles: [{ id: "0", name: roleName }],
				permissions: permissionData,
			},
		});

		vi.spyOn(window, "matchMedia").mockReturnValue(mock<MediaQueryList>());

		router.setParams({ id: singleColumnBoard.roomId });

		const wrapper = shallowMount(CourseRoomDetailsPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModule,
					[SHARE_MODULE_KEY.valueOf()]: shareModule,
					[COURSE_ROOM_DETAILS_MODULE_KEY.valueOf()]: courseRoomDetailsModule,
				},
				stubs: {
					DefaultWireframe: false,
					RoomDotMenu: false,
					SelectBoardLayoutDialog: false,
					CopyResultModal: false,
					CourseCommonCartridgeExportModal: false,
					ShareModal: false,
					VTabs: false,
					VTab: false,
					VChip: false,
					VBtn: false,
					EndCourseSyncDialog: true,
					StartExistingCourseSyncDialog: true,
					UseFocusTrap: true,
				},
			},
		});

		return {
			wrapper,
			singleColumnBoard,
			router,
			copyModule,
			shareModule,
			courseRoomDetailsModule,
		};
	};

	it("should fetch data on mount", async () => {
		const { courseRoomDetailsModule } = setup();
		await flushPromises();

		expect(courseRoomDetailsModule.fetchContent).toHaveBeenCalled();
	});

	it("'to course files' button should have correct path", async () => {
		const { wrapper, singleColumnBoard } = setup();
		await flushPromises();

		const backButton = wrapper.find(".back-button");
		expect(backButton.attributes("href")).toBe("/files/courses/" + singleColumnBoard.roomId);
	});

	it("title should be the course name", async () => {
		const { wrapper, singleColumnBoard } = setup();
		await flushPromises();

		const title = wrapper.find('[data-testid="courses-course-title"]');
		expect(title.text()).toContain(singleColumnBoard.title);
	});

	it("should not show FAB if user does not have permission to create courses", async () => {
		const { wrapper } = setup({ permissionData: mockPermissionsStudent });
		await flushPromises();

		const wireframe = wrapper.findComponent(DefaultWireframe);
		expect(wireframe.props("fabItems")).toBeUndefined();
	});

	describe("when course is locked", () => {
		it("should show the locked course page", async () => {
			const { wrapper } = setup({ isLocked: true });
			await flushPromises();

			const lockedCoursePage = wrapper.findComponent(CourseRoomLockedPage);
			expect(lockedCoursePage.exists()).toBe(true);
		});
	});

	describe("menu", () => {
		it("should show FAB if user has permission to create homework", async () => {
			const { wrapper } = setup({
				permissionData: [Permission.HOMEWORK_CREATE],
			});
			await flushPromises();

			const wireframe = wrapper.findComponent(DefaultWireframe);
			expect(wireframe.props("fabItems")).toBeDefined();
		});

		describe("'add board' button", () => {
			describe("when user doesn't have course edit permission", () => {
				it("should not render board creation button in FAB", async () => {
					const { wrapper } = setup({
						permissionData: [Permission.HOMEWORK_CREATE, Permission.TOPIC_CREATE],
					});
					await flushPromises();

					const wireframe = wrapper.findComponent(DefaultWireframe);
					const fabItems = wireframe.props("fabItems") as Array<{
						dataTestId: string;
					}>;
					const dataTestIds = fabItems?.map((item) => item.dataTestId) ?? [];

					expect(dataTestIds).not.toContain("fab_button_add_board");
				});
			});

			describe("when user has course edit permission", () => {
				it("should render the button to add board", async () => {
					const { wrapper } = setup({
						permissionData: [Permission.COURSE_EDIT],
					});
					await flushPromises();

					const wireframe = wrapper.findComponent(DefaultWireframe);
					const fabItems = wireframe.props("fabItems") as Array<{
						dataTestId: string;
					}>;
					const dataTestIds = fabItems?.map((item) => item.dataTestId) ?? [];

					expect(dataTestIds).toContain("fab_button_add_board");
				});

				it("should open layout dialog when add board button is clicked", async () => {
					const { wrapper } = setup({
						permissionData: [Permission.COURSE_EDIT],
					});
					await flushPromises();

					const layoutDialog = wrapper.findComponent(SelectBoardLayoutDialog);
					expect(layoutDialog.props("modelValue")).toBe(false);

					const wireframe = wrapper.findComponent(DefaultWireframe);
					const fabItems = wireframe.props("fabItems") as Array<{
						dataTestId: string;
						clickHandler?: () => void;
					}>;
					const addBoardAction = fabItems?.find((item) => item.dataTestId === "fab_button_add_board");
					addBoardAction?.clickHandler?.();
					await nextTick();

					expect(layoutDialog.props("modelValue")).toBe(true);
				});
			});
		});
	});

	describe("headline menus", () => {
		describe("students", () => {
			it("should not have the menu button for students", async () => {
				const { wrapper } = setup({
					permissionData: mockPermissionsStudent,
				});
				await flushPromises();

				const menuButton = wrapper.findComponent(RoomDotMenu);
				expect(menuButton.props("menuItems")).toHaveLength(0);
			});
		});

		describe("teachers", () => {
			it("should have the menu button for course teachers", async () => {
				const { wrapper } = setup();
				await flushPromises();

				const menuButton = wrapper.findComponent(RoomDotMenu);
				expect(menuButton.exists()).toBe(true);
				expect(menuButton.props("menuItems").length).toBeGreaterThan(0);
			});

			it("should not have the menu button for substitution course teachers", async () => {
				const { wrapper } = setup({
					permissionData: mockPermissionsCourseSubstitutionTeacher,
				});
				await flushPromises();

				const menuButton = wrapper.findComponent(RoomDotMenu);
				expect(menuButton.props("menuItems")).toHaveLength(0);
			});

			describe("when 'FEATURE_COURSE_SHARE' & 'FEATURE_COPY_SERVICE_ENABLED' are turned off", () => {
				it("should only display 'edit/remove' action", async () => {
					const { wrapper } = setup();
					await flushPromises();

					const menuButton = wrapper.findComponent(RoomDotMenu);
					const menuItems = menuButton.props("menuItems") as Array<{
						dataTestId: string;
					}>;
					const dataTestIds = menuItems.map((item) => item.dataTestId);

					expect(dataTestIds).toContain("room-menu-edit-delete");
					expect(dataTestIds).not.toContain("room-menu-copy");
					expect(dataTestIds).not.toContain("room-menu-share");
				});
			});

			describe("when 'FEATURE_COPY_SERVICE_ENABLED' is turned on", () => {
				it("should display 'copy' action", async () => {
					createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });
					const { wrapper } = setup();
					await flushPromises();

					const menuButton = wrapper.findComponent(RoomDotMenu);
					const menuItems = menuButton.props("menuItems") as Array<{
						dataTestId: string;
					}>;
					const dataTestIds = menuItems.map((item) => item.dataTestId);

					expect(dataTestIds).toContain("room-menu-edit-delete");
					expect(dataTestIds).toContain("room-menu-copy");
				});
			});

			describe("when 'FEATURE_COURSE_SHARE' is turned on", () => {
				it("should display 'share' action", async () => {
					createTestEnvStore({
						FEATURE_COURSE_SHARE: true,
						FEATURE_COPY_SERVICE_ENABLED: false,
					});
					const { wrapper } = setup();
					await flushPromises();

					const menuButton = wrapper.findComponent(RoomDotMenu);
					const menuItems = menuButton.props("menuItems") as Array<{
						dataTestId: string;
					}>;
					const dataTestIds = menuItems.map((item) => item.dataTestId);

					expect(dataTestIds).toContain("room-menu-edit-delete");
					expect(dataTestIds).toContain("room-menu-share");
					expect(dataTestIds).not.toContain("room-menu-copy");
				});
			});

			it("should redirect the page when 'Edit/Delete' menu is clicked", async () => {
				Object.defineProperty(window, "location", {
					value: { href: "" },
					writable: true,
				});
				const { wrapper, singleColumnBoard } = setup();
				await flushPromises();

				const menuButton = wrapper.findComponent(RoomDotMenu);
				const menuItems = menuButton.props("menuItems") as Array<{
					dataTestId: string;
					action: () => void;
				}>;
				const editAction = menuItems.find((item) => item.dataTestId === "room-menu-edit-delete");
				editAction?.action();

				expect(window.location.href).toBe("/courses/" + singleColumnBoard.roomId + "/edit");
			});

			describe("testing FEATURE_COPY_SERVICE_ENABLED feature flag", () => {
				it("should copy course and redirect when 'Copy course' menu is clicked", async () => {
					createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });
					const { wrapper, copyModule } = setup();
					await flushPromises();

					const menuButton = wrapper.findComponent(RoomDotMenu);
					const menuItems = menuButton.props("menuItems") as Array<{
						dataTestId: string;
						action: () => void;
					}>;
					const copyAction = menuItems.find((item) => item.dataTestId === "room-menu-copy");
					await copyAction?.action();
					await flushPromises();

					expect(copyModule.copy).toHaveBeenCalled();
					expect(router.push).toHaveBeenCalledWith({
						path: "/rooms/copiedid",
						replace: true,
					});
				});
			});

			describe("test Course export", () => {
				it("should not find export button when feature flag is false", async () => {
					createTestEnvStore({
						FEATURE_COMMON_CARTRIDGE_COURSE_EXPORT_ENABLED: false,
					});
					const { wrapper } = setup();
					await flushPromises();

					const menuButton = wrapper.findComponent(RoomDotMenu);
					const menuItems = menuButton.props("menuItems") as Array<{
						dataTestId: string;
					}>;
					const dataTestIds = menuItems.map((item) => item.dataTestId);

					expect(dataTestIds).not.toContain("room-menu-common-cartridge-download");
				});

				it("should open export modal when 'Export Course' menu is clicked", async () => {
					createTestEnvStore({
						FEATURE_COMMON_CARTRIDGE_COURSE_EXPORT_ENABLED: true,
					});
					const { wrapper } = setup();
					await flushPromises();

					const exportModal = wrapper.findComponent(CourseCommonCartridgeExportModal);
					expect(exportModal.props("isOpen")).toBe(false);

					const menuButton = wrapper.findComponent(RoomDotMenu);
					const menuItems = menuButton.props("menuItems") as Array<{
						dataTestId: string;
						action: () => void;
					}>;
					const exportAction = menuItems.find((item) => item.dataTestId === "room-menu-common-cartridge-download");
					exportAction?.action();
					await nextTick();

					expect(exportModal.props("isOpen")).toBe(true);
				});
			});

			it("should call shareModule.startShareFlow when 'Share Course' menu is clicked", async () => {
				createTestEnvStore({ FEATURE_COURSE_SHARE: true });
				const { wrapper, shareModule, singleColumnBoard } = setup();
				await flushPromises();

				const menuButton = wrapper.findComponent(RoomDotMenu);
				const menuItems = menuButton.props("menuItems") as Array<{
					dataTestId: string;
					action: () => void;
				}>;
				const shareAction = menuItems.find((item) => item.dataTestId === "room-menu-share");
				shareAction?.action();

				expect(shareModule.startShareFlow).toHaveBeenCalledWith({
					id: singleColumnBoard.roomId,
					type: ShareTokenBodyParamsParentType.COURSES,
				});
			});
		});
	});

	describe("modal views", () => {
		it("should render ShareModal component", async () => {
			const { wrapper } = setup();
			await flushPromises();

			const modalView = wrapper.findComponent({ name: "ShareModal" });
			expect(modalView.exists()).toBe(true);
		});
	});

	describe("board creation functionality", () => {
		it("should open board layout dialog when add board action is triggered", async () => {
			const { wrapper } = setup({
				permissionData: [Permission.COURSE_EDIT],
			});
			await flushPromises();

			const layoutDialog = wrapper.findComponent(SelectBoardLayoutDialog);
			expect(layoutDialog.props("modelValue")).toBe(false);

			const wireframe = wrapper.findComponent(DefaultWireframe);
			const fabItems = wireframe.props("fabItems") as Array<{
				dataTestId: string;
				clickHandler?: () => void;
			}>;
			const addBoardAction = fabItems?.find((item) => item.dataTestId === "fab_button_add_board");
			addBoardAction?.clickHandler?.();
			await nextTick();

			expect(layoutDialog.props("modelValue")).toBe(true);
		});

		it("should create board when layout is selected", async () => {
			const { wrapper, courseRoomDetailsModule, singleColumnBoard, router } = setup({
				permissionData: [Permission.COURSE_EDIT],
			});
			await flushPromises();

			const layoutDialog = wrapper.findComponent(SelectBoardLayoutDialog);
			await layoutDialog.vm.$emit("select", BoardLayout.COLUMNS);
			await flushPromises();

			expect(courseRoomDetailsModule.createBoard).toHaveBeenCalledWith({
				title: expect.any(String),
				parentType: "course",
				parentId: singleColumnBoard.roomId,
				layout: BoardLayout.COLUMNS,
			});

			expect(router.push).toHaveBeenCalledWith("/boards/new-board-id");
		});
	});

	describe("copy functionality", () => {
		it("should redirect to copied room on successful course copy", async () => {
			createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });
			const { wrapper, router } = setup({ copyResultId: "copiedid" });
			await flushPromises();

			const menuButton = wrapper.findComponent(RoomDotMenu);
			const menuItems = menuButton.props("menuItems") as Array<{
				dataTestId: string;
				action: () => void;
			}>;
			const copyAction = menuItems.find((item) => item.dataTestId === "room-menu-copy");
			await copyAction?.action();
			await flushPromises();

			expect(router.push).toHaveBeenCalledWith({
				path: "/rooms/copiedid",
				replace: true,
			});
		});

		it("should redirect to courses overview on failed course copy", async () => {
			createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });
			const { wrapper, router } = setup({ copyResultId: undefined });
			await flushPromises();

			const menuButton = wrapper.findComponent(RoomDotMenu);
			const menuItems = menuButton.props("menuItems") as Array<{
				dataTestId: string;
				action: () => void;
			}>;
			const copyAction = menuItems.find((item) => item.dataTestId === "room-menu-copy");
			await copyAction?.action();
			await flushPromises();

			expect(router.push).toHaveBeenCalledWith("/rooms/courses-overview");
		});

		it("should reset copy module when copy result modal is closed", async () => {
			const { wrapper, copyModule } = setup();
			await flushPromises();

			const copyResultModal = wrapper.findComponent(CopyResultModal);
			await copyResultModal.vm.$emit("copy-dialog-closed");

			expect(copyModule.reset).toHaveBeenCalled();
		});
	});

	describe("sync functionality", () => {
		it("should show end sync option when course is synchronized", async () => {
			createTestEnvStore({
				FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: true,
			});
			const { wrapper } = setup({ isSynchronized: true });
			await flushPromises();

			const menuButton = wrapper.findComponent(RoomDotMenu);
			const menuItems = menuButton.props("menuItems") as Array<{
				dataTestId: string;
			}>;
			const dataTestIds = menuItems.map((item) => item.dataTestId);

			expect(dataTestIds).toContain("title-menu-end-sync");
		});

		it("should show start sync option when course is not synchronized", async () => {
			createTestEnvStore({
				FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: true,
			});
			const { wrapper } = setup({ isSynchronized: false });
			await flushPromises();

			const menuButton = wrapper.findComponent(RoomDotMenu);
			const menuItems = menuButton.props("menuItems") as Array<{
				dataTestId: string;
			}>;
			const dataTestIds = menuItems.map((item) => item.dataTestId);

			expect(dataTestIds).toContain("title-menu-start-sync");
		});

		it("should open end sync dialog when end sync menu item is clicked", async () => {
			createTestEnvStore({
				FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: true,
			});
			const { wrapper } = setup({ isSynchronized: true });
			await flushPromises();

			const menuButton = wrapper.findComponent(RoomDotMenu);
			const menuItems = menuButton.props("menuItems") as Array<{
				dataTestId: string;
				action: () => void;
			}>;
			const endSyncAction = menuItems.find((item) => item.dataTestId === "title-menu-end-sync");
			endSyncAction?.action();
			await nextTick();

			const endSyncDialog = wrapper.findComponent({ name: "EndCourseSyncDialog" });
			expect(endSyncDialog.props("isOpen")).toBe(true);
		});

		it("should open start sync dialog when start sync menu item is clicked", async () => {
			createTestEnvStore({
				FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: true,
			});
			const { wrapper } = setup({ isSynchronized: false });
			await flushPromises();

			const menuButton = wrapper.findComponent(RoomDotMenu);
			const menuItems = menuButton.props("menuItems") as Array<{
				dataTestId: string;
				action: () => void;
			}>;
			const startSyncAction = menuItems.find((item) => item.dataTestId === "title-menu-start-sync");
			startSyncAction?.action();
			await nextTick();

			const startSyncDialog = wrapper.findComponent({ name: "StartExistingCourseSyncDialog" });
			expect(startSyncDialog.props("isOpen")).toBe(true);
		});
	});

	describe("user role behavior", () => {
		it("should show FAB items for teachers with permission", async () => {
			const { wrapper } = setup({
				roleName: ImportUserResponseRoleNames.TEACHER,
				permissionData: [Permission.HOMEWORK_CREATE, Permission.TOPIC_CREATE, Permission.COURSE_EDIT],
			});
			await flushPromises();

			const wireframe = wrapper.findComponent(DefaultWireframe);
			const fabItems = wireframe.props("fabItems") as Array<{
				dataTestId: string;
			}>;

			expect(fabItems).toBeDefined();
			expect(fabItems.length).toBeGreaterThan(1);
		});

		it("should not show FAB items for students", async () => {
			const { wrapper } = setup({
				roleName: ImportUserResponseRoleNames.STUDENT,
				permissionData: [],
			});
			await flushPromises();

			const wireframe = wrapper.findComponent(DefaultWireframe);
			expect(wireframe.props("fabItems")).toBeUndefined();
		});
	});

	describe("breadcrumbs", () => {
		it("should display correct breadcrumbs", async () => {
			const { wrapper, singleColumnBoard } = setup();
			await flushPromises();

			const wireframe = wrapper.findComponent(DefaultWireframe);
			const breadcrumbs = wireframe.props("breadcrumbs") as Array<{
				title: string;
				to?: string;
				disabled: boolean;
			}>;

			expect(breadcrumbs).toHaveLength(2);
			expect(breadcrumbs[0].to).toBe("/rooms/courses-overview");
			expect(breadcrumbs[1].title).toBe(singleColumnBoard.title);
			expect(breadcrumbs[1].disabled).toBe(true);
		});
	});

	describe("synchronized course chip", () => {
		it("should show synchronized chip when course is synchronized", async () => {
			const { wrapper } = setup({ isSynchronized: true });
			await flushPromises();

			const syncChip = wrapper.find('[data-testid="synced-course-chip"]');
			expect(syncChip.exists()).toBe(true);
		});

		it("should not show synchronized chip when course is not synchronized", async () => {
			const { wrapper } = setup({ isSynchronized: false });
			await flushPromises();

			const syncChip = wrapper.find('[data-testid="synced-course-chip"]');
			expect(syncChip.exists()).toBe(false);
		});
	});

	describe("tools tab", () => {
		it("should include tools tab when tabItems are computed", async () => {
			const { wrapper } = setup({
				permissionData: [Permission.CONTEXT_TOOL_ADMIN, Permission.COURSE_EDIT],
			});
			await flushPromises();

			const toolsTab = wrapper.find('[data-testid="tools-tab"]');
			expect(toolsTab.exists()).toBe(true);
		});
	});

	describe("copy board element functionality", () => {
		it("should call copy and fetch content when copy-board-element event is emitted", async () => {
			const { wrapper, copyModule, singleColumnBoard } = setup();
			await flushPromises();

			// Find the component that emits copy-board-element (rendered as a stub)
			const roomContent = wrapper.find('[data-testid="room-content"]');
			const payload = {
				id: "board-element-id",
				type: CopyApiResponseType.LESSON,
				courseId: singleColumnBoard.roomId,
			};
			await roomContent.trigger("copy-board-element", payload);
			await flushPromises();

			// The copy module should be called
			expect(copyModule.copy).toHaveBeenCalled();
		});
	});

	describe("page visibility handling", () => {
		it("should add pageshow event listener on mount", async () => {
			const addEventListenerSpy = vi.spyOn(window, "addEventListener");
			setup();
			await flushPromises();

			expect(addEventListenerSpy).toHaveBeenCalledWith("pageshow", expect.any(Function));
		});

		it("should remove pageshow event listener on unmount", async () => {
			const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
			const { wrapper } = setup();
			await flushPromises();

			wrapper.unmount();

			expect(removeEventListenerSpy).toHaveBeenCalledWith("pageshow", expect.any(Function));
		});
	});

	describe("export modal", () => {
		it("should close export modal when update:is-open event is emitted with false", async () => {
			createTestEnvStore({ FEATURE_COMMON_CARTRIDGE_COURSE_EXPORT_ENABLED: true });
			const { wrapper } = setup();
			await flushPromises();

			// First open the modal
			const menuButton = wrapper.findComponent(RoomDotMenu);
			const menuItems = menuButton.props("menuItems") as Array<{
				dataTestId: string;
				action: () => void;
			}>;
			const exportAction = menuItems.find((item) => item.dataTestId === "room-menu-common-cartridge-download");
			exportAction?.action();
			await nextTick();

			const exportModal = wrapper.findComponent(CourseCommonCartridgeExportModal);
			expect(exportModal.props("isOpen")).toBe(true);

			// Close the modal by triggering the handler directly
			// This simulates what happens when the modal emits update:is-open
			exportModal.vm.$emit("update:isOpen", false);
			await nextTick();

			expect(exportModal.props("isOpen")).toBe(false);
		});
	});

	describe("archived course", () => {
		it("should show archived chip when course is archived", async () => {
			const { wrapper } = setup({ isArchived: true });
			await flushPromises();

			// The template doesn't have data-testid for archived chip, so check by text
			expect(wrapper.text()).toContain("pages.courseRooms.headerSection.archived");
		});
	});
});
