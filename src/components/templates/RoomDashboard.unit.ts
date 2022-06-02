import { envConfigModule, roomModule, taskModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import RoomModule from "@/store/room";
import TaskModule from "@/store/tasks";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import RoomDashboard from "./RoomDashboard.vue";

declare var createComponentMocks: Function;

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
				duedate: "2300-09-28T13:00:00.000Z",
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
				duedate: "2300-06-28T13:00:00.000Z",
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
	],
};

const emptyMockData = {
	roomId: "234",
	title: "Sample Course 2",
	displayColor: "green",
	elements: [],
};

const getWrapper = (props: object, options?: object) => {
	return mount<any>(RoomDashboard, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/templates/RoomDashboard.vue", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		setupStores({
			tasks: TaskModule,
			room: RoomModule,
			"env-config": EnvConfigModule,
		});
		// @ts-ignore
		envConfigModule.setEnvs({ FEATURE_LESSON_SHARE: true });
	});
	describe("common features", () => {
		it("should have props", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			expect(wrapper.vm.roomData).toStrictEqual(mockData);
			expect(wrapper.vm.role).toStrictEqual("teacher");
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
			const emptyStateComponent = wrapper.find(
				`[data-testid="empty-state-item"]`
			) as any;
			expect(emptyStateComponent.exists()).toBe(true);
			expect(emptyStateComponent.vm.imgHeight).toStrictEqual("200px");
			expect(emptyStateComponent.vm.title).toStrictEqual(
				wrapper.vm.$i18n.t("pages.room.teacher.emptyState")
			);
		});

		it("Should render empty state for students", async () => {
			const wrapper = getWrapper({
				roomDataObject: emptyMockData,
				role: "student",
			});
			const emptyStateComponent = wrapper.find(
				`[data-testid="empty-state-item"]`
			) as any;
			expect(emptyStateComponent.exists()).toBe(true);
			expect(emptyStateComponent.vm.imgHeight).toStrictEqual("200px");
			expect(emptyStateComponent.vm.title).toStrictEqual(
				wrapper.vm.$i18n.t("pages.room.student.emptyState")
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
			const element = wrapper.find(".elements");
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

			const draggableElement = wrapper.find(".elements");
			await draggableElement.vm.$emit("input", items);
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
			const moveByKeyboardMock = jest.fn().mockImplementation(() => {});
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			wrapper.vm.moveByKeyboard = moveByKeyboardMock;
			const cardElement = wrapper.findComponent({ ref: "item_1" });
			expect(wrapper.vm.isDragging).toBe(false);
			cardElement.vm.$emit("on-drag");
			expect(wrapper.vm.isDragging).toBe(true);
			await wrapper.vm.$nextTick();

			cardElement.vm.$emit("move-element", {
				id: "1234",
				moveIndex: 1,
			});
			expect(moveByKeyboardMock).toHaveBeenCalled();
		});

		it("should NOT be sorted the elements by keyboard for students'", async () => {
			const moveByKeyboardMock = jest.fn().mockImplementation(() => {});
			const wrapper = getWrapper({ roomDataObject: mockData, role: "student" });

			wrapper.vm.moveByKeyboard = moveByKeyboardMock;
			const cardElement = wrapper.findComponent({ ref: "item_1" });
			expect(wrapper.vm.isDragging).toBe(false);
			cardElement.vm.$emit("on-drag");
			expect(wrapper.vm.isDragging).toBe(false);
			await wrapper.vm.$nextTick();

			cardElement.vm.$emit("move-element", {
				id: "1234",
				moveIndex: 1,
			});
			expect(moveByKeyboardMock).not.toHaveBeenCalled();
		});

		it("should set 'isDragging' false if 'tab' key is pressed", async () => {
			const moveByKeyboardMock = jest.fn().mockImplementation(() => {});
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			wrapper.vm.moveByKeyboard = moveByKeyboardMock;
			const cardElement = wrapper.findComponent({ ref: "item_1" });
			expect(wrapper.vm.isDragging).toBe(false);
			cardElement.vm.$emit("on-drag");
			expect(wrapper.vm.isDragging).toBe(true);
			await wrapper.vm.$nextTick();

			cardElement.vm.$emit("tab-pressed");
			expect(wrapper.vm.isDragging).toBe(false);
		});
	});

	describe("Sharing Lesson", () => {
		it("should set 'lessonShare.isOpen' value to true when more menu item clicked", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			const lessonCard = wrapper.find(".lesson-card");

			expect(wrapper.vm.lessonShare.isOpen).toBe(false);
			lessonCard.vm.$emit("open-modal", "12345");
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.lessonShare.isOpen).toBe(true);
		});

		it("lesson share modal should be visible if 'lessonShare.isOpen' is set true", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			const shareModal = wrapper.find(".room-dialog") as any;

			expect(shareModal.vm.isOpen).toBe(false);
			wrapper.vm.lessonShare.isOpen = true;
			await wrapper.vm.$nextTick();
			expect(shareModal.vm.isOpen).toBe(true);
		});
	});

	describe("Deleting Items", () => {
		it("should call the openItemDeleteDialog method when lesson should be deleted", async () => {
			const openDeleteDialogMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.openItemDeleteDialog = openDeleteDialogMock;
			const lessonCard = wrapper.find(".lesson-card");

			lessonCard.vm.$emit("delete-lesson");
			expect(openDeleteDialogMock).toHaveBeenCalled();
			expect(openDeleteDialogMock.mock.calls[0][0].id).toStrictEqual("3456");
			expect(openDeleteDialogMock.mock.calls[0][1]).toStrictEqual("lesson");
		});

		it("should call the openItemDeleteDialog method when task should be deleted", async () => {
			const openDeleteDialogMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.openItemDeleteDialog = openDeleteDialogMock;
			const taskCard = wrapper.find(".task-card");

			taskCard.vm.$emit("delete-task");
			expect(openDeleteDialogMock).toHaveBeenCalled();
			expect(openDeleteDialogMock.mock.calls[0][0].id).toStrictEqual("1234");
			expect(openDeleteDialogMock.mock.calls[0][1]).toStrictEqual("task");
		});

		it("item delete modal should be visible if 'itemDelete.isOpen' is set true", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			const deleteModal = wrapper.find(
				`[data-testid="delete-dialog-item"]`
			) as any;

			expect(deleteModal.vm.isOpen).toBe(false);
			wrapper.vm.itemDelete.isOpen = true;
			await wrapper.vm.$nextTick();
			expect(deleteModal.vm.isOpen).toBe(true);
		});

		it("should call deleteItem method after modal emits 'dialog-confirmed'", async () => {
			const deleteItemMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.deleteItem = deleteItemMock;
			wrapper.vm.itemDelete.isOpen = true;
			await wrapper.vm.$nextTick();
			const deleteModal = wrapper.find(
				`[data-testid="delete-dialog-item"]`
			) as any;
			deleteModal.vm.$emit("dialog-confirmed");
			expect(deleteItemMock).toHaveBeenCalled();
		});

		it("should call store methods after modal emits 'dialog-confirmed' when deleting task", async () => {
			const deleteTaskMock = jest.fn();
			const fetchContentMock = jest.fn();
			const deleteLessonMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			taskModule.deleteTask = deleteTaskMock;
			roomModule.fetchContent = fetchContentMock;
			roomModule.deleteLesson = deleteLessonMock;
			const taskCard = wrapper.find(".task-card");

			taskCard.vm.$emit("delete-task");
			await wrapper.vm.$nextTick();
			const deleteModal = wrapper.find(
				`[data-testid="delete-dialog-item"]`
			) as any;
			deleteModal.vm.$emit("dialog-confirmed");
			await wrapper.vm.$nextTick();
			expect(deleteTaskMock).toHaveBeenCalled();
			expect(fetchContentMock).toHaveBeenCalled();
			expect(deleteLessonMock).not.toHaveBeenCalled();
		});

		it("should call store methods after modal emits 'dialog-confirmed' when deleting lesson", async () => {
			const deleteTaskMock = jest.fn();
			const fetchContentMock = jest.fn();
			const deleteLessonMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			taskModule.deleteTask = deleteTaskMock;
			roomModule.fetchContent = fetchContentMock;
			roomModule.deleteLesson = deleteLessonMock;
			const lessonCard = wrapper.find(".lesson-card");

			lessonCard.vm.$emit("delete-lesson");
			await wrapper.vm.$nextTick();
			const deleteModal = wrapper.find(
				`[data-testid="delete-dialog-item"]`
			) as any;
			deleteModal.vm.$emit("dialog-confirmed");
			await wrapper.vm.$nextTick();
			expect(deleteTaskMock).not.toHaveBeenCalled();
			expect(fetchContentMock).not.toHaveBeenCalled();
			expect(deleteLessonMock).toHaveBeenCalled();
		});

		it("should close the modal view after clicking the 'cancel' button", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.itemDelete.isOpen = true;
			await wrapper.vm.$nextTick();
			const cancelButton = wrapper.find(`[data-testid="dialog-cancel"]`);
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
				const taskCard = wrapper.find(".task-card");
				roomModule.finishTask = finishTaskMock;

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
				const taskCard = wrapper.find(".task-card");
				roomModule.finishTask = finishTaskMock;

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
				const taskCard = wrapper.find(".task-card");
				roomModule.finishTask = finishTaskMock;

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
				const taskCard = wrapper.find(".task-card");
				roomModule.finishTask = finishTaskMock;

				taskCard.vm.$emit("restore-task");
				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][0].action).toStrictEqual("restore");
			});
		});
	});

	describe("CopyTask Process", () => {
		beforeEach(() => {
			// @ts-ignore
			envConfigModule.setEnvs({ FEATURE_TASK_COPY_ENABLED: true });
		});
		it("should call the copyTask method when a task component emits 'copy-task' custom event", async () => {
			const copyTaskMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			wrapper.vm.copyTask = copyTaskMock;

			const taskCard = wrapper.find(".task-card");
			taskCard.vm.$emit("copy-task");

			expect(copyTaskMock).toHaveBeenCalled();
		});

		it("should call the 'store copyTask action' method when a task component emits 'copy-task' custom event", async () => {
			const roomModuleCopyMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			roomModule.copyTask = roomModuleCopyMock;

			const taskCard = wrapper.find(".task-card");
			taskCard.vm.$emit("copy-task");
			await wrapper.vm.$nextTick();

			expect(roomModuleCopyMock).toHaveBeenCalled();
			expect(roomModuleCopyMock.mock.calls[0][0]).toStrictEqual("1234");
		});

		it("should set 'copyProcess' data property method when a task component emits 'copy-task' custom event", async () => {
			const roomModuleCopyMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });
			roomModule.copyTask = roomModuleCopyMock;

			roomModule.setTaskCopyResult({
				title: "Aufgabe",
				type: "task",
				status: "success",
				id: "123",
				elements: [{ title: "description", type: "leaf", status: "success" }],
			});

			const taskCard = wrapper.find(".task-card");
			taskCard.vm.$emit("copy-task");
			await wrapper.vm.$nextTick();

			expect(wrapper.vm.copyProcess.data).toStrictEqual({
				title: "Aufgabe",
				type: "task",
				status: "success",
				id: "123",
				elements: [{ title: "description", type: "leaf", status: "success" }],
			});
			expect(wrapper.vm.copyProcess.isOpen).toBe(true);
		});

		it("should redirect to the task edit page when the CopyProcess component emits 'process-edit' custom event", async () => {
			const location = window.location;
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			const copyProcess = wrapper.find(`[data-testid="copy-process"]`);
			copyProcess.vm.$emit("process-edit", "1234");
			await wrapper.vm.$nextTick();
			expect(location.pathname).toStrictEqual(
				"/homework/1234/edit?returnUrl=/rooms/123"
			);
		});

		it("should call the 'deleteTask' method and when the CopyProcess component emits 'process-delete' custom event", async () => {
			const deleteTaskMock = jest.fn();
			const fetchContentMock = jest.fn();
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			taskModule.deleteTask = deleteTaskMock;
			roomModule.fetchContent = fetchContentMock;

			const copyProcess = wrapper.find(`[data-testid="copy-process"]`);
			copyProcess.vm.$emit("process-delete", "1234");
			await wrapper.vm.$nextTick();
			expect(deleteTaskMock).toHaveBeenCalled();
			expect(deleteTaskMock.mock.calls[0][0]).toStrictEqual("1234");
			expect(fetchContentMock).toHaveBeenCalled();
		});

		it("should empty 'copyProcess' data property method when CopyProcess component emits 'dialog-closed'", async () => {
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			roomModule.setTaskCopyResult({
				title: "Aufgabe",
				type: "task",
				status: "success",
				id: "123",
				elements: [{ title: "description", type: "leaf", status: "success" }],
			});

			const taskCard = wrapper.find(".task-card");
			taskCard.vm.$emit("copy-task");
			await wrapper.vm.$nextTick();

			const copyProcess = wrapper.find(`[data-testid="copy-process"]`);
			copyProcess.vm.$emit("dialog-closed", false);
			await wrapper.vm.$nextTick();

			expect(wrapper.vm.copyProcess.data).toStrictEqual({});
			expect(wrapper.vm.copyProcess.isOpen).toBe(false);
		});

		it("should redirect to legacy client if FEATURE_TASK_COPY_ENABLED flag is not set true", async () => {
			const location = window.location;
			const wrapper = getWrapper({ roomDataObject: mockData, role: "teacher" });

			// @ts-ignore
			envConfigModule.setEnvs({ FEATURE_TASK_COPY_ENABLED: false });

			const taskCard = wrapper.find(".task-card");
			taskCard.vm.$emit("copy-task");

			await wrapper.vm.$nextTick();
			expect(location.pathname).toStrictEqual(
				"/homework/1234/copy?returnUrl=rooms/123"
			);
		});
	});
});
