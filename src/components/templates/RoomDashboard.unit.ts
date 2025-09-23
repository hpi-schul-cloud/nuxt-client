import { beforeAll, Mock } from "vitest";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3";
import { courseRoomDetailsModule } from "@/store";
import CopyModule, { CopyParamsTypeEnum } from "@/store/copy";
import CourseRoomDetailsModule from "@/store/course-room-details";
import NotifierModule from "@/store/notifier";
import ShareModule from "@/store/share";
import { NOTIFIER_MODULE_KEY, SHARE_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { ComponentProps } from "vue-component-type-helpers";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createMock } from "@golevelup/ts-vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { Router, useRouter } from "vue-router";
import { VCard } from "vuetify/lib/components/index";
import RoomDashboard from "./RoomDashboard.vue";
import { EmptyState } from "@ui-empty-state";

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

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

const getWrapper = (
	props: ComponentProps<typeof RoomDashboard>,
	options?: object
) => {
	const router = createMock<Router>();
	useRouterMock.mockReturnValue(router);

	const wrapper = mount(RoomDashboard, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
				[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
			},
		},
		props,
		...options,
	});

	return wrapper;
};

describe("@/components/templates/RoomDashboard.vue", () => {
	beforeAll(() => {
		createTestEnvStore({
			FEATURE_LESSON_SHARE: true,
			FEATURE_TASK_SHARE: true,
		});
	});
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		setupStores({
			courseRoomDetailsModule: CourseRoomDetailsModule,
			copyModule: CopyModule,
		});
	});
	describe("common features", () => {
		it("should have props", () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			expect(wrapper.vm.roomData).toStrictEqual(mockData);
			expect(wrapper.vm.role).toStrictEqual("teacher");
		});

		it("should list board card", () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			const boardCard = wrapper.findAllComponents({ name: "RoomBoardCard" });
			expect(boardCard).toHaveLength(1);
		});

		it("should list task cards", () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			const taskCards = wrapper.findAll(".task-card");
			expect(taskCards).toHaveLength(2);
		});

		it("should list lesson cards", () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "student" });

			const lessonCards = wrapper.findAll(".lesson-card");
			expect(lessonCards).toHaveLength(2);
		});

		it("should have lessonData object", () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			const expectedObject = {
				roomId: "123",
				displayColor: "black",
			};

			expect(wrapper.vm.lessonData).toStrictEqual(expectedObject);
		});

		it("should have taskData object", () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			const expectedObject = {
				roomId: "123",
			};

			expect(wrapper.vm.taskData).toStrictEqual(expectedObject);
		});

		it("Should render empty state for teacher", () => {
			const wrapper = getWrapper({
				roomDataObject: emptyMockData,
				role: "teacher",
			});

			const emptyStateComponent = wrapper.findComponent(EmptyState);
			expect(emptyStateComponent.exists()).toBe(true);
			expect(emptyStateComponent.props("title")).toBe(
				"pages.room.learningContent.emptyState"
			);
		});

		it("Should render empty state for students", () => {
			const wrapper = getWrapper({
				roomDataObject: emptyMockData,
				role: "student",
			});

			const emptyStateComponent = wrapper.findComponent(EmptyState);
			expect(emptyStateComponent.props("title")).toBe(
				"pages.room.learningContent.emptyState"
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
			const tempOntouchstart = window.ontouchstart;
			window.ontouchstart = undefined;
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			expect(wrapper.vm.isTouchDevice).toBe(false);
			expect(wrapper.vm.touchDelay).toStrictEqual(20);
			window.ontouchstart = tempOntouchstart;
		});

		it("should set 'touchDelay' and 'isTouchDevice' values if device is mobile", () => {
			const tempOntouchstart = window.ontouchstart;
			window.ontouchstart = () => null;
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			expect(wrapper.vm.isTouchDevice).toBe(true);
			expect(wrapper.vm.touchDelay).toStrictEqual(200);
			window.ontouchstart = tempOntouchstart;
		});

		it("should set 'dragInProgress' when dragging is started", () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			const timeDuration = wrapper.vm.dragInProgressDelay;
			expect(wrapper.vm.dragInProgress).toBe(false);
			const element = wrapper.findComponent({ name: "draggable" });
			element.vm.$emit("start");
			expect(wrapper.vm.dragInProgress).toBe(true);
			element.vm.$emit("end");
			vi.advanceTimersByTime(timeDuration);
			expect(wrapper.vm.dragInProgress).toBe(false);
		});

		it("should sort elements after Drag&Drop", async () => {
			courseRoomDetailsModule.sortElements = vi
				.fn()
				.mockImplementation(vi.fn());
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
			const moveByKeyboardMock = vi.fn().mockImplementation(() => ({}));
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
			const moveByKeyboardMock = vi.fn().mockImplementation(() => ({}));
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
			const moveByKeyboardMock = vi.fn().mockImplementation(() => ({}));
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
		it("should call startShareFlow when share lesson item clicked", () => {
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
		it("should call startShareFlow when share task item clicked", () => {
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

		it("should call the openItemDeleteDialog method when lesson should be deleted", () => {
			const openDeleteDialogMock = vi.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.openItemDeleteDialog = openDeleteDialogMock;
			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");

			lessonCard.vm.$emit("delete-lesson");
			expect(openDeleteDialogMock).toHaveBeenCalled();
			expect(openDeleteDialogMock.mock.calls[0][0].id).toStrictEqual("3456");
			expect(openDeleteDialogMock.mock.calls[0][1]).toStrictEqual("lesson");
		});

		it("should call the openItemDeleteDialog method when task should be deleted", () => {
			const openDeleteDialogMock = vi.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.openItemDeleteDialog = openDeleteDialogMock;
			const taskCard = wrapper.findComponent<VCard>(".task-card");

			taskCard.vm.$emit("delete-task");
			expect(openDeleteDialogMock).toHaveBeenCalled();
			expect(openDeleteDialogMock.mock.calls[0][0].id).toStrictEqual("1234");
			expect(openDeleteDialogMock.mock.calls[0][1]).toStrictEqual("task");
		});

		it("should call deleteItem method after modal emits 'dialog-confirmed'", async () => {
			const deleteItemMock = vi.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.deleteItem = deleteItemMock;
			wrapper.vm.itemDelete.isOpen = true;
			await nextTick();
			const deleteModal = findCustomDialog(wrapper, "delete-dialog-item");

			deleteModal.vm.$emit("dialog-confirmed");
			expect(deleteItemMock).toHaveBeenCalled();
		});

		it("should call store methods after modal emits 'dialog-confirmed' when deleting task", async () => {
			const deleteTaskMock = vi.fn();
			const fetchContentMock = vi.fn();
			const deleteLessonMock = vi.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			courseRoomDetailsModule.deleteTask = deleteTaskMock;
			courseRoomDetailsModule.fetchContent = fetchContentMock;
			courseRoomDetailsModule.deleteLesson = deleteLessonMock;
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
			const deleteTaskMock = vi.fn();
			const fetchContentMock = vi.fn();
			const deleteLessonMock = vi.fn().mockResolvedValue(true);
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			courseRoomDetailsModule.deleteTask = deleteTaskMock;
			courseRoomDetailsModule.fetchContent = fetchContentMock;
			courseRoomDetailsModule.deleteLesson = deleteLessonMock;
			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");

			lessonCard.vm.$emit("delete-lesson");
			await nextTick();
			const deleteModal = findCustomDialog(wrapper, "delete-dialog-item");

			deleteModal.vm.$emit("dialog-confirmed");
			await nextTick();
			expect(deleteTaskMock).not.toHaveBeenCalled();
			expect(deleteLessonMock).toHaveBeenCalled();
			expect(fetchContentMock).toHaveBeenCalled();
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
			it("should call finishTask action", () => {
				const finishTaskMock = vi.fn();
				const wrapper = getWrapper({
					roomDataObject: mockData,
					role: "teacher",
				});
				const taskCard = wrapper.findComponent<VCard>(".task-card");
				courseRoomDetailsModule.finishTask = finishTaskMock;

				taskCard.vm.$emit("finish-task");

				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][0].action).toStrictEqual("finish");
			});

			it("should call restoreTask action", () => {
				const finishTaskMock = vi.fn();
				const wrapper = getWrapper({
					roomDataObject: mockData,
					role: "teacher",
				});
				const taskCard = wrapper.findComponent<VCard>(".task-card");
				courseRoomDetailsModule.finishTask = finishTaskMock;

				taskCard.vm.$emit("restore-task");

				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][0].action).toStrictEqual("restore");
			});
		});

		describe("For students", () => {
			it("should call finishTask action", () => {
				const finishTaskMock = vi.fn();
				const wrapper = getWrapper({
					roomDataObject: mockData,
					role: "student",
				});
				const taskCard = wrapper.findComponent<VCard>(".task-card");
				courseRoomDetailsModule.finishTask = finishTaskMock;

				taskCard.vm.$emit("finish-task");

				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][0].action).toStrictEqual("finish");
			});

			it("should call restoreTask action", () => {
				const finishTaskMock = vi.fn();
				const wrapper = getWrapper({
					roomDataObject: mockData,
					role: "student",
				});
				const taskCard = wrapper.findComponent<VCard>(".task-card");
				courseRoomDetailsModule.finishTask = finishTaskMock;

				taskCard.vm.$emit("restore-task");
				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][0].action).toStrictEqual("restore");
			});
		});
	});

	describe("Publishing and unpublishing a board", () => {
		it("should call publishBoard action", () => {
			const publishCardMock = vi.fn();
			const wrapper = getWrapper({
				roomDataObject: mockData,
				role: "teacher",
			});
			const boardCard = wrapper.findComponent({ name: "room-board-card" });
			courseRoomDetailsModule.publishCard = publishCardMock;

			boardCard.vm.$emit("update-visibility", true);

			expect(publishCardMock).toHaveBeenCalled();
			expect(publishCardMock.mock.calls[0][0].visibility).toStrictEqual(true);
		});
	});

	describe("CopyTask Process", () => {
		beforeAll(() => {
			createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });
		});

		it("should call the copyTask method when a task component emits 'copy-task' custom event", () => {
			const copyTaskMock = vi.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.copyTask = copyTaskMock;

			const taskCard = wrapper.findComponent<VCard>(".task-card");
			taskCard.vm.$emit("copy-task");

			expect(copyTaskMock).toHaveBeenCalled();
		});

		it("should emit 'copy-board-element' with correct task-related payload", () => {
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
		beforeAll(() => {
			createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });
		});

		it("should call the copyLesson method when a lesson component emits 'copy-lesson' custom event", () => {
			const copyLessonMock = vi.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.copyLesson = copyLessonMock;

			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");
			lessonCard.vm.$emit("copy-lesson");

			expect(copyLessonMock).toHaveBeenCalled();
		});

		it("should emit 'copy-board-element' with correct lesson-related payload", () => {
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
		beforeAll(() => {
			createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });
		});

		it("should call the copyBoard method when a board component emits 'copy-board' custom event", () => {
			const copyBoardMock = vi.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.copyBoard = copyBoardMock;

			const boardCard = wrapper.findComponent<VCard>({ name: "RoomBoardCard" });
			boardCard.vm.$emit("copy-board");

			expect(copyBoardMock).toHaveBeenCalled();
		});

		it("should emit 'copy-board-element' with correct board-related payload", () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			const boardCard = wrapper.findComponent<VCard>({ name: "RoomBoardCard" });
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
