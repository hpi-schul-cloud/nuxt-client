import {
	ConfigResponse,
	ShareTokenBodyParamsParentTypeEnum,
} from "@/serverApi/v3";
import { envConfigModule, courseModule } from "@/store";
import CopyModule, { CopyParamsTypeEnum } from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import CourseModule from "@/store/course";
import ShareModule from "@/store/share";
import {
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	SHARE_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount, VueWrapper } from "@vue/test-utils";
import CourseDashboard from "./CourseDashboard.vue";

import { envsFactory } from "@@/tests/test-utils";
import { createMock } from "@golevelup/ts-jest";
import { nextTick } from "vue";
import { Router, useRouter } from "vue-router";
import { VCard } from "vuetify/lib/components/index.mjs";

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;

const mockData = {
	roomId: "123",
	title: "Sample Course",
	displayColor: "black",
	elements: [
		{
			type: "task",
			content: {
				courseName: "Mathe",
				id: "1234",
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
				courseName: "Mathe_2",
				id: "2345",
				name: "Private Aufgabe von Cord - mit Kurs, offen",
				createdAt: "2017-09-28T12:02:11.432Z",
				updatedAt: "2017-09-28T12:02:11.432Z",
				status: {
					submitted: 0,
					maxSubmissions: 2,
					graded: 0,
					isDraft: false,
					isSubstitutionTeacher: false,
					isFinished: false,
				},
				availableDate: "2017-09-28T12:00:00.000Z",
				dueDate: "2300-06-28T13:00:00.000Z",
				displayColor: "#54616e",
				description: "",
			},
		},
		{
			type: "lesson",
			content: {
				id: "3456",
				name: "Test Name",
				courseName: "Mathe",
				createdAt: "2017-09-28T11:58:46.601Z",
				updatedAt: "2017-09-28T11:58:46.601Z",
				hidden: false,
			},
		},
		{
			type: "lesson",
			content: {
				id: "7890",
				name: "Test Name2",
				courseName: "Mathe",
				createdAt: "2017-09-28T11:58:46.601Z",
				updatedAt: "2017-09-28T11:58:46.601Z",
				hidden: false,
			},
		},
		{
			type: "column-board",
			content: {
				id: "9876",
				title: "title",
				isVisible: false,
				createdAt: "2023-05-31T15:34:59.276Z",
				updatedAt: "2023-05-31T15:34:59.276Z",
			},
		},
	],
};

const emptyMockData = {
	roomId: "234",
	title: "Sample Course 2",
	displayColor: "green",
	elements: [],
};

const shareModuleMock = createModuleMocks(ShareModule, {
	getIsShareModalOpen: false,
});
const notifierModuleMock = createModuleMocks(NotifierModule);

const getWrapper = (props: any, options?: object) => {
	const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
		getCtlToolsTabEnabled: false,
		getEnv: {} as ConfigResponse,
	});

	const router = createMock<Router>();
	useRouterMock.mockReturnValue(router);

	const wrapper = mount(CourseDashboard, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
				[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
			},
		},
		props,
		...options,
	});

	return wrapper;
};

describe("@/components/templates/CourseDashboard.vue", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		setupStores({
			courseModule: CourseModule,
			envConfigModule: EnvConfigModule,
			copyModule: CopyModule,
		});
		const envs = envsFactory.build({
			FEATURE_LESSON_SHARE: true,
			FEATURE_TASK_SHARE: true,
		});
		envConfigModule.setEnvs(envs);
	});
	describe("common features", () => {
		it("should have props", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			expect(wrapper.vm.roomData).toStrictEqual(mockData);
			expect(wrapper.vm.role).toStrictEqual("teacher");
		});

		it("should list board card", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			const boardCard = wrapper.findAllComponents({ name: "CourseBoardCard" });
			expect(boardCard).toHaveLength(1);
		});

		it("should list task cards", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			const taskCards = wrapper.findAll(".task-card");
			expect(taskCards).toHaveLength(2);
		});

		it("should list lesson cards", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "student" });

			const lessonCards = wrapper.findAll(".lesson-card");
			expect(lessonCards).toHaveLength(2);
		});

		it("should have lessonData object", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			const expectedObject = {
				roomId: "123",
				displayColor: "black",
			};

			expect(wrapper.vm.lessonData).toStrictEqual(expectedObject);
		});

		it("should have taskData object", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			const expectedObject = {
				roomId: "123",
			};

			expect(wrapper.vm.taskData).toStrictEqual(expectedObject);
		});

		it("Should render empty state for teacher", async () => {
			const wrapper = getWrapper({
				roomDataObject: emptyMockData,
				role: "teacher",
			});
			const emptyStateComponent = wrapper.findComponent({
				name: "v-custom-empty-state",
			});
			expect(emptyStateComponent.exists()).toBe(true);
			expect(emptyStateComponent.props("imgHeight")).toStrictEqual("200px");
			expect(emptyStateComponent.props("title")).toStrictEqual(
				wrapper.vm.$t("pages.room.teacher.emptyState")
			);
		});

		it("Should render empty state for students", async () => {
			const wrapper = getWrapper({
				roomDataObject: emptyMockData,
				role: "student",
			});
			const emptyStateComponent = wrapper.findComponent({
				name: "v-custom-empty-state",
			});
			expect(emptyStateComponent.exists()).toBe(true);
			expect(emptyStateComponent.props("imgHeight")).toStrictEqual("200px");
			expect(emptyStateComponent.props("title")).toStrictEqual(
				wrapper.vm.$t("pages.room.student.emptyState")
			);
		});
	});

	describe("Drag & Drop operations", () => {
		it("should sortable value 'true' if user is a 'teacher'", () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			expect(wrapper.vm.sortable).toBe(true);
		});

		it("should sortable value 'false' if user is NOT a 'teacher'", () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "student" });
			expect(wrapper.vm.sortable).toBe(false);
		});

		it("should set 'touchDelay' and 'isTouchDevice' values if device is NOT mobile", () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			expect(wrapper.vm.isTouchDevice).toBe(false);
			expect(wrapper.vm.touchDelay).toStrictEqual(20);
		});

		it("should set 'touchDelay' and 'isTouchDevice' values if device is mobile", () => {
			const tempOntouchstart = window.ontouchstart;
			window.ontouchstart = () => null;
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			expect(wrapper.vm.isTouchDevice).toBe(true);
			expect(wrapper.vm.touchDelay).toStrictEqual(200);
			window.ontouchstart = tempOntouchstart;
		});

		it("should set 'dragInProgress' when dragging is started", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			const timeDuration = wrapper.vm.dragInProgressDelay;
			expect(wrapper.vm.dragInProgress).toBe(false);
			const element = wrapper.findComponent({ name: "draggable" });
			element.vm.$emit("start");
			expect(wrapper.vm.dragInProgress).toBe(true);
			element.vm.$emit("end");
			await new Promise((time) => setTimeout(time, timeDuration));
			expect(wrapper.vm.dragInProgress).toBe(false);
		});

		it("should sort elements after Drag&Drop", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			const items = JSON.parse(JSON.stringify(wrapper.vm.roomData.elements));
			items.splice(1, 0, items.splice(0, 1)[0]);

			expect(wrapper.vm.roomData.elements[0].content.courseName).toStrictEqual(
				"Mathe"
			);
			expect(wrapper.vm.roomData.elements[1].content.courseName).toStrictEqual(
				"Mathe_2"
			);

			const draggableElement = wrapper.findComponent({ name: "draggable" });
			await draggableElement.vm.$emit("update:modelValue", items);
			expect(wrapper.vm.roomData.elements[0].content.courseName).toStrictEqual(
				"Mathe_2"
			);
			expect(wrapper.vm.roomData.elements[1].content.courseName).toStrictEqual(
				"Mathe"
			);
		});

		it("sortable option should not true if the user is 'student'", () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "student" });
			expect(wrapper.vm.sortable).toBe(false);
		});

		it("should be sorted the elements by keyboard'", async () => {
			const moveByKeyboardMock = jest.fn().mockImplementation(() => ({}));
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			wrapper.vm.moveByKeyboard = moveByKeyboardMock;
			const cardElement = wrapper.findComponent({ ref: "item_1" });
			expect(wrapper.vm.isDragging).toBe(false);
			cardElement.vm.$emit("on-drag");
			expect(wrapper.vm.isDragging).toBe(true);
			await nextTick();

			cardElement.vm.$emit("move-element", {
				id: "1234",
				moveIndex: 1,
			});
			expect(moveByKeyboardMock).toHaveBeenCalled();
		});

		it("should NOT be sorted the elements by keyboard for students'", async () => {
			const moveByKeyboardMock = jest.fn().mockImplementation(() => ({}));
			const wrapper = getWrapper({ roomDataObject: mockData, role: "student" });

			wrapper.vm.moveByKeyboard = moveByKeyboardMock;
			const cardElement = wrapper.findComponent({ ref: "item_1" });
			expect(wrapper.vm.isDragging).toBe(false);
			cardElement.vm.$emit("on-drag");
			expect(wrapper.vm.isDragging).toBe(false);
			await nextTick();

			cardElement.vm.$emit("move-element", {
				id: "1234",
				moveIndex: 1,
			});
			expect(moveByKeyboardMock).not.toHaveBeenCalled();
		});

		it("should set 'isDragging' false if 'tab' key is pressed", async () => {
			const moveByKeyboardMock = jest.fn().mockImplementation(() => ({}));
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			wrapper.vm.moveByKeyboard = moveByKeyboardMock;
			const cardElement = wrapper.findComponent({ ref: "item_1" });
			expect(wrapper.vm.isDragging).toBe(false);
			cardElement.vm.$emit("on-drag");
			expect(wrapper.vm.isDragging).toBe(true);
			await nextTick();

			cardElement.vm.$emit("tab-pressed");
			expect(wrapper.vm.isDragging).toBe(false);
		});
	});

	describe("Sharing Lesson", () => {
		it("should call startShareFlow when share lesson item clicked", async () => {
			const wrapper = getWrapper({
				roomDataObject: mockData,
				role: "teacher",
			});

			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");
			lessonCard.vm.$emit("open-modal", "12345");

			expect(shareModuleMock.startShareFlow).toBeCalledWith({
				id: "12345",
				type: ShareTokenBodyParamsParentTypeEnum.Lessons,
			});
		});
	});

	describe("Sharing Task", () => {
		it("should call startShareFlow when share task item clicked", async () => {
			const wrapper = getWrapper({
				roomDataObject: mockData,
				role: "teacher",
			});
			const taskCard = wrapper.findComponent<VCard>(".task-card");

			taskCard.vm.$emit("share-task", "1234");

			expect(shareModuleMock.startShareFlow).toBeCalledWith({
				id: "1234",
				type: ShareTokenBodyParamsParentTypeEnum.Tasks,
			});
		});
	});

	describe("Deleting Items", () => {
		const findCustomDialog = (wrapper: VueWrapper, dataTestid: string) => {
			const dialog = wrapper
				.findAllComponents({ name: "v-custom-dialog" })
				.find((dialog) => dialog.vm.$attrs["data-testid"] === dataTestid);

			if (!dialog) {
				throw new Error(
					`Cannot find VCustomDialog with data-testid="${dataTestid}"`
				);
			}

			return dialog;
		};

		it("should call the openItemDeleteDialog method when lesson should be deleted", async () => {
			const openDeleteDialogMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.openItemDeleteDialog = openDeleteDialogMock;
			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");

			lessonCard.vm.$emit("delete-lesson");
			expect(openDeleteDialogMock).toHaveBeenCalled();
			expect(openDeleteDialogMock.mock.calls[0][0].id).toStrictEqual("3456");
			expect(openDeleteDialogMock.mock.calls[0][1]).toStrictEqual("lesson");
		});

		it("should call the openItemDeleteDialog method when task should be deleted", async () => {
			const openDeleteDialogMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.openItemDeleteDialog = openDeleteDialogMock;
			const taskCard = wrapper.findComponent<VCard>(".task-card");

			taskCard.vm.$emit("delete-task");
			expect(openDeleteDialogMock).toHaveBeenCalled();
			expect(openDeleteDialogMock.mock.calls[0][0].id).toStrictEqual("1234");
			expect(openDeleteDialogMock.mock.calls[0][1]).toStrictEqual("task");
		});

		it("should call deleteItem method after modal emits 'dialog-confirmed'", async () => {
			const deleteItemMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.deleteItem = deleteItemMock;
			wrapper.vm.itemDelete.isOpen = true;
			await nextTick();
			const deleteModal = findCustomDialog(wrapper, "delete-dialog-item");

			deleteModal.vm.$emit("dialog-confirmed");
			expect(deleteItemMock).toHaveBeenCalled();
		});

		it("should call store methods after modal emits 'dialog-confirmed' when deleting task", async () => {
			const deleteTaskMock = jest.fn();
			const fetchContentMock = jest.fn();
			const deleteLessonMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			courseModule.deleteTask = deleteTaskMock;
			courseModule.fetchContent = fetchContentMock;
			courseModule.deleteLesson = deleteLessonMock;
			const taskCard = wrapper.findComponent<VCard>(".task-card");

			taskCard.vm.$emit("delete-task");
			await nextTick();
			const deleteModal = findCustomDialog(wrapper, "delete-dialog-item");

			deleteModal.vm.$emit("dialog-confirmed");
			await nextTick();
			expect(deleteTaskMock).toHaveBeenCalled();
			expect(fetchContentMock).toHaveBeenCalled();
			expect(deleteLessonMock).not.toHaveBeenCalled();
		});

		it("should call store methods after modal emits 'dialog-confirmed' when deleting lesson", async () => {
			const deleteTaskMock = jest.fn();
			const fetchContentMock = jest.fn();
			const deleteLessonMock = jest.fn().mockResolvedValue(true);
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			courseModule.deleteTask = deleteTaskMock;
			courseModule.fetchContent = fetchContentMock;
			courseModule.deleteLesson = deleteLessonMock;
			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");

			lessonCard.vm.$emit("delete-lesson");
			await nextTick();
			const deleteModal = findCustomDialog(wrapper, "delete-dialog-item");

			deleteModal.vm.$emit("dialog-confirmed");
			await nextTick();
			expect(deleteTaskMock).not.toHaveBeenCalled();
			expect(deleteLessonMock).toHaveBeenCalled();
			expect(fetchContentMock).not.toHaveBeenCalled();
		});

		it("should close the modal view after clicking the 'cancel' button", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.itemDelete.isOpen = true;
			await nextTick();
			const cancelButton = wrapper.findComponent(
				`[data-testid="dialog-cancel"]`
			);
			cancelButton.trigger("click");
			expect(wrapper.vm.itemDelete.isOpen).toBe(false);
		});
	});

	describe("Finishing and Restoring Tasks", () => {
		describe("For teachers", () => {
			it("should call finishTask action", async () => {
				const finishTaskMock = jest.fn();
				const wrapper = getWrapper({
					roomDataObject: mockData,
					role: "teacher",
				});
				const taskCard = wrapper.findComponent<VCard>(".task-card");
				courseModule.finishTask = finishTaskMock;

				taskCard.vm.$emit("finish-task");

				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][0].action).toStrictEqual("finish");
			});

			it("should call restoreTask action", async () => {
				const finishTaskMock = jest.fn();
				const wrapper = getWrapper({
					roomDataObject: mockData,
					role: "teacher",
				});
				const taskCard = wrapper.findComponent<VCard>(".task-card");
				courseModule.finishTask = finishTaskMock;

				taskCard.vm.$emit("restore-task");

				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][0].action).toStrictEqual("restore");
			});
		});

		describe("For students", () => {
			it("should call finishTask action", async () => {
				const finishTaskMock = jest.fn();
				const wrapper = getWrapper({
					roomDataObject: mockData,
					role: "student",
				});
				const taskCard = wrapper.findComponent<VCard>(".task-card");
				courseModule.finishTask = finishTaskMock;

				taskCard.vm.$emit("finish-task");

				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][0].action).toStrictEqual("finish");
			});

			it("should call restoreTask action", async () => {
				const finishTaskMock = jest.fn();
				const wrapper = getWrapper({
					roomDataObject: mockData,
					role: "student",
				});
				const taskCard = wrapper.findComponent<VCard>(".task-card");
				courseModule.finishTask = finishTaskMock;

				taskCard.vm.$emit("restore-task");
				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][0].action).toStrictEqual("restore");
			});
		});
	});

	describe("Publishing and unpublishing a board", () => {
		it("should call publishBoard action", async () => {
			const publishCardMock = jest.fn();
			const wrapper = getWrapper({
				roomDataObject: mockData,
				role: "teacher",
			});
			const boardCard = wrapper.findComponent({ name: "course-board-card" });
			courseModule.publishCard = publishCardMock;

			boardCard.vm.$emit("update-visibility", true);

			expect(publishCardMock).toHaveBeenCalled();
			expect(publishCardMock.mock.calls[0][0].visibility).toStrictEqual(true);
		});
	});

	describe("CopyTask Process", () => {
		beforeEach(() => {
			const envs = envsFactory.build({
				FEATURE_COPY_SERVICE_ENABLED: true,
			});
			envConfigModule.setEnvs(envs);
		});

		it("should call the copyTask method when a task component emits 'copy-task' custom event", async () => {
			const copyTaskMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.copyTask = copyTaskMock;

			const taskCard = wrapper.findComponent<VCard>(".task-card");
			taskCard.vm.$emit("copy-task");

			expect(copyTaskMock).toHaveBeenCalled();
		});

		it("should emit 'copy-board-element' with correct task-related payload", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			const taskCard = wrapper.findComponent<VCard>(".task-card");
			taskCard.vm.$emit("copy-task");

			expect(wrapper.emitted()).toHaveProperty("copy-board-element");
			const copyBoardElementEvent = wrapper.emitted("copy-board-element");
			expect(copyBoardElementEvent).toStrictEqual([
				[
					{
						id: "1234",
						type: CopyParamsTypeEnum.Task,
						courseId: "123",
					},
				],
			]);
		});
	});

	describe("CopyLesson Process", () => {
		beforeEach(() => {
			const envs = envsFactory.build({
				FEATURE_COPY_SERVICE_ENABLED: true,
			});
			envConfigModule.setEnvs(envs);
		});

		it("should call the copyLesson method when a lesson component emits 'copy-lesson' custom event", async () => {
			const copyLessonMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.copyLesson = copyLessonMock;

			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");
			lessonCard.vm.$emit("copy-lesson");

			expect(copyLessonMock).toHaveBeenCalled();
		});

		it("should emit 'copy-board-element' with correct lesson-related payload", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");
			lessonCard.vm.$emit("copy-lesson");

			expect(wrapper.emitted()).toHaveProperty("copy-board-element");
			const copyBoardElementEvent = wrapper.emitted("copy-board-element");
			expect(copyBoardElementEvent).toStrictEqual([
				[
					{
						id: "3456",
						type: CopyParamsTypeEnum.Lesson,
						courseId: "123",
					},
				],
			]);
		});
	});

	describe("CopyBoard Process", () => {
		beforeEach(() => {
			const envs = envsFactory.build({
				FEATURE_COPY_SERVICE_ENABLED: true,
			});
			envConfigModule.setEnvs(envs);
		});

		it("should call the copyBoard method when a board component emits 'copy-board' custom event", async () => {
			const copyBoardMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.copyBoard = copyBoardMock;

			const boardCard = wrapper.findComponent<VCard>({
				name: "CourseBoardCard",
			});
			boardCard.vm.$emit("copy-board");

			expect(copyBoardMock).toHaveBeenCalled();
		});

		it("should emit 'copy-board-element' with correct board-related payload", () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			const boardCard = wrapper.findComponent<VCard>({
				name: "CourseBoardCard",
			});
			boardCard.vm.$emit("copy-board");

			expect(wrapper.emitted()).toHaveProperty("copy-board-element");
			const copyBoardElementEvent = wrapper.emitted("copy-board-element");
			expect(copyBoardElementEvent).toStrictEqual([
				[
					{
						id: "9876",
						type: CopyParamsTypeEnum.ColumnBoard,
						courseId: "123",
					},
				],
			]);
		});
	});
});
