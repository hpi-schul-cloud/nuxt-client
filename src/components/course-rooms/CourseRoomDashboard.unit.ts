import CourseRoomDashboard from "./CourseRoomDashboard.vue";
import { CopyParamsTypeEnum } from "@/store/copy";
import ShareModule from "@/store/share";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import { SHARE_MODULE_KEY } from "@/utils/inject";
import { createTestEnvStore, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BoardElementResponseType, BoardLayout, ShareTokenBodyParamsParentType } from "@api-server";
import { useCourseRoomDetailsStore } from "@data-course-rooms";
import { createTestingPinia } from "@pinia/testing";
import { EmptyState } from "@ui-empty-state";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { ComponentProps } from "vue-component-type-helpers";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import draggable from "vuedraggable";
import { VCard } from "vuetify/components";

const mockData = {
	roomId: "123",
	title: "Sample Course",
	displayColor: "black",
	isArchived: false,
	isSynchronized: false,
	elements: [
		{
			type: BoardElementResponseType.TASK,
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
			type: BoardElementResponseType.TASK,
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
			type: BoardElementResponseType.LESSON,
			content: {
				id: "3456",
				name: "Test Name",
				courseName: "Mathe",
				createdAt: "2017-09-28T11:58:46.601Z",
				updatedAt: "2017-09-28T11:58:46.601Z",
				hidden: false,
				numberOfPublishedTasks: 2,
				numberOfDraftTasks: 1,
				numberOfPlannedTasks: 3,
			},
		},
		{
			type: BoardElementResponseType.LESSON,
			content: {
				id: "7890",
				name: "Test Name2",
				courseName: "Mathe",
				createdAt: "2017-09-28T11:58:46.601Z",
				updatedAt: "2017-09-28T11:58:46.601Z",
				hidden: false,
				numberOfPublishedTasks: 1,
				numberOfDraftTasks: 0,
				numberOfPlannedTasks: 2,
			},
		},
		{
			type: BoardElementResponseType.COLUMN_BOARD,
			content: {
				id: "9876",
				title: "title",
				published: true,
				createdAt: "2023-05-31T15:34:59.276Z",
				updatedAt: "2023-05-31T15:34:59.276Z",
				columnBoardId: "board-123",
				layout: BoardLayout.COLUMNS,
			},
		},
	],
};

const emptyMockData = {
	roomId: "234",
	title: "Sample Course 2",
	displayColor: "green",
	isArchived: false,
	isSynchronized: false,
	elements: [],
};

const shareModuleMock = createModuleMocks(ShareModule, {
	getIsShareModalOpen: false,
});

const setup = (props: ComponentProps<typeof CourseRoomDashboard>, options?: object) => {
	injectRouterMock(createRouterMock());
	const courseRoomDetailsStore = mockedPiniaStoreTyping(useCourseRoomDetailsStore);

	const wrapper = mount(CourseRoomDashboard, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
			},
		},
		props,
		...options,
	});

	return { wrapper, courseRoomDetailsStore };
};

describe("CourseRoomDashboard.vue", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		createTestEnvStore({
			FEATURE_LESSON_SHARE: true,
			FEATURE_TASK_SHARE: true,
		});
	});
	describe("common features", () => {
		it("should have props", () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

			expect(wrapper.props("roomDataObject")).toStrictEqual(mockData);
			expect(wrapper.props("role")).toStrictEqual("teacher");
		});

		it("should list board card", () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

			const boardCard = wrapper.findAllComponents({ name: "RoomBoardCard" });
			expect(boardCard).toHaveLength(1);
		});

		it("should list task cards", () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

			const taskCards = wrapper.findAll(".task-card");
			expect(taskCards).toHaveLength(2);
		});

		it("should list lesson cards", () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "student" });

			const lessonCards = wrapper.findAll(".lesson-card");
			expect(lessonCards).toHaveLength(2);
		});

		it("should have lessonData object", () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

			const lessonCards = wrapper.findAll(".lesson-card");
			expect(lessonCards).toHaveLength(2);
		});

		it("should have taskData object", () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

			const taskCards = wrapper.findAll(".task-card");
			expect(taskCards).toHaveLength(2);
		});

		it("Should render empty state for teacher", () => {
			const { wrapper } = setup({
				roomDataObject: emptyMockData,
				role: "teacher",
			});

			const emptyStateComponent = wrapper.findComponent(EmptyState);
			expect(emptyStateComponent.exists()).toBe(true);
			expect(emptyStateComponent.props("title")).toBe("pages.room.learningContent.emptyState");
		});

		it("Should render empty state for students", () => {
			const { wrapper } = setup({
				roomDataObject: emptyMockData,
				role: "student",
			});

			const emptyStateComponent = wrapper.findComponent(EmptyState);
			expect(emptyStateComponent.props("title")).toBe("pages.room.learningContent.emptyState");
		});
	});

	describe("Drag & Drop operations", () => {
		it("should enable sorting if user is a 'teacher'", async () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

			await flushPromises();
			const draggableComponent = wrapper.findComponent(draggable);
			expect(draggableComponent.exists()).toBe(true);
		});

		it("should not render draggable for students", () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "student" });

			const draggableComponent = wrapper.findComponent(draggable);
			expect(draggableComponent.exists()).toBe(false);
		});

		it("should use non-touch delay for desktop devices", () => {
			const tempOntouchstart = window.ontouchstart;
			window.ontouchstart = undefined;
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

			const draggableComponent = wrapper.findComponent(draggable);
			expect(draggableComponent.exists()).toBe(true);
			window.ontouchstart = tempOntouchstart;
		});

		it("should use touch delay for mobile devices", () => {
			const tempOntouchstart = window.ontouchstart;
			window.ontouchstart = () => null;
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

			const draggableComponent = wrapper.findComponent(draggable);
			expect(draggableComponent.exists()).toBe(true);
			window.ontouchstart = tempOntouchstart;
		});

		it("should handle drag events correctly", async () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

			const element = wrapper.findComponent({ name: "draggable" });
			await element.vm.$emit("start");
			await element.vm.$emit("end");

			expect(element.exists()).toBe(true);
		});

		it("should call sortElements when drag and drop occurs", async () => {
			const { wrapper, courseRoomDetailsStore } = setup({ roomDataObject: mockData, role: "teacher" });
			// courseRoomDetailsStore.sortElements.mockImplementation(vi.fn());

			const reorderedItems = JSON.parse(JSON.stringify(mockData.elements));
			reorderedItems.splice(1, 0, reorderedItems.splice(0, 1)[0]);

			const draggableElement = wrapper.findComponent({ name: "draggable" });
			await draggableElement.vm.$emit("update:modelValue", reorderedItems);

			expect(courseRoomDetailsStore.sortElements).toHaveBeenCalled();
		});

		it("should handle keyboard sorting for teachers", async () => {
			// const courseRoomDetailsStore = mockedPiniaStoreTyping(useCourseRoomDetailsStore);
			const { wrapper, courseRoomDetailsStore } = setup({ roomDataObject: mockData, role: "teacher" });

			const cardElement = wrapper.findComponent({ ref: "item_1" });
			if (cardElement.exists()) {
				await cardElement.vm.$emit("move-element", {
					id: "1234",
					moveIndex: 1,
				});

				expect(courseRoomDetailsStore.sortElements).toHaveBeenCalled();
			}
		});

		it("should not allow keyboard sorting for students", async () => {
			// const courseRoomDetailsStore = mockedPiniaStoreTyping(useCourseRoomDetailsStore);
			const { wrapper, courseRoomDetailsStore } = setup({ roomDataObject: mockData, role: "student" });

			const cardElement = wrapper.findComponent({ ref: "item_1" });
			if (cardElement.exists()) {
				await cardElement.vm.$emit("move-element", {
					id: "1234",
					moveIndex: 1,
				});

				expect(courseRoomDetailsStore.sortElements).not.toHaveBeenCalled();
			}
		});

		it("should handle tab-pressed event", async () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

			const cardElement = wrapper.findComponent({ ref: "item_1" });
			if (cardElement.exists()) {
				await cardElement.vm.$emit("tab-pressed");
				expect(cardElement.exists()).toBe(true);
			}
		});
	});

	describe("Sharing Lesson", () => {
		it("should call startShareFlow when share lesson item clicked", () => {
			const { wrapper } = setup({
				roomDataObject: mockData,
				role: "teacher",
			});

			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");
			lessonCard.vm.$emit("open-modal", "12345");

			expect(shareModuleMock.startShareFlow).toBeCalledWith({
				id: "12345",
				type: ShareTokenBodyParamsParentType.LESSONS,
			});
		});
	});

	describe("Sharing Task", () => {
		it("should call startShareFlow when share task item clicked", () => {
			const { wrapper } = setup({
				roomDataObject: mockData,
				role: "teacher",
			});
			const taskCard = wrapper.findComponent<VCard>(".task-card");

			taskCard.vm.$emit("share-task", "1234");

			expect(shareModuleMock.startShareFlow).toBeCalledWith({
				id: "1234",
				type: ShareTokenBodyParamsParentType.TASKS,
			});
		});
	});

	describe("Deleting Items", () => {
		it("should call deleteLesson when lesson deletion is confirmed", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletionForItem").mockResolvedValue(true);

			const { wrapper, courseRoomDetailsStore } = setup({ roomDataObject: mockData, role: "teacher" });
			courseRoomDetailsStore.deleteLesson = vi.fn();
			courseRoomDetailsStore.fetchContent = vi.fn();

			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");

			lessonCard.vm.$emit("delete-lesson");
			await flushPromises();

			expect(confirmDialogUtils.askDeletionForItem).toHaveBeenCalledWith("Test Name", "common.words.topic");
			expect(courseRoomDetailsStore.deleteLesson).toHaveBeenCalledWith("3456");
			expect(courseRoomDetailsStore.fetchContent).toHaveBeenCalled();
		});

		it("should call deleteTask when task deletion is confirmed", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletionForItem").mockResolvedValue(true);
			const { wrapper, courseRoomDetailsStore } = setup({ roomDataObject: mockData, role: "teacher" });
			courseRoomDetailsStore.deleteTask = vi.fn();
			courseRoomDetailsStore.fetchContent = vi.fn();
			const taskCard = wrapper.findComponent<VCard>(".task-card");

			taskCard.vm.$emit("delete-task");
			await flushPromises();

			expect(courseRoomDetailsStore.deleteTask).toHaveBeenCalledWith("1234");
			expect(courseRoomDetailsStore.fetchContent).toHaveBeenCalled();
		});

		it("should not call deleteTask when task deletion is cancelled", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletionForItem").mockResolvedValue(false);
			const deleteTaskMock = vi.fn();
			// const courseRoomDetailsStore = mockedPiniaStoreTyping(useCourseRoomDetailsStore);
			const { wrapper, courseRoomDetailsStore } = setup({ roomDataObject: mockData, role: "teacher" });
			courseRoomDetailsStore.deleteTask = deleteTaskMock;
			const taskCard = wrapper.findComponent<VCard>(".task-card");

			taskCard.vm.$emit("delete-task");
			await flushPromises();

			expect(deleteTaskMock).not.toHaveBeenCalled();
		});

		it("should not call deleteLesson when lesson deletion is cancelled", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletionForItem").mockResolvedValue(false);
			const deleteLessonMock = vi.fn();
			// const courseRoomDetailsStore = mockedPiniaStoreTyping(useCourseRoomDetailsStore);
			const { wrapper, courseRoomDetailsStore } = setup({ roomDataObject: mockData, role: "teacher" });
			courseRoomDetailsStore.deleteLesson = deleteLessonMock;
			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");

			lessonCard.vm.$emit("delete-lesson");
			await flushPromises();

			expect(deleteLessonMock).not.toHaveBeenCalled();
		});
	});

	describe("Finishing and Restoring Tasks", () => {
		describe("For teachers", () => {
			it("should call finishTask action", async () => {
				const finishTaskMock = vi.fn();
				// const courseRoomDetailsStore = mockedPiniaStoreTyping(useCourseRoomDetailsStore);
				const { wrapper, courseRoomDetailsStore } = setup({
					roomDataObject: mockData,
					role: "teacher",
				});
				courseRoomDetailsStore.finishTask = finishTaskMock;
				const taskCard = wrapper.findComponent<VCard>(".task-card");

				taskCard.vm.$emit("finish-task");
				await flushPromises();

				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][1]).toStrictEqual("finish");
			});

			it("should call restoreTask action", async () => {
				const finishTaskMock = vi.fn();
				// const courseRoomDetailsStore = mockedPiniaStoreTyping(useCourseRoomDetailsStore);
				const { wrapper, courseRoomDetailsStore } = setup({
					roomDataObject: mockData,
					role: "teacher",
				});
				courseRoomDetailsStore.finishTask = finishTaskMock;
				const taskCard = wrapper.findComponent<VCard>(".task-card");

				taskCard.vm.$emit("restore-task");
				await flushPromises();

				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][1]).toStrictEqual("restore");
			});
		});

		describe("For students", () => {
			it("should call finishTask action", async () => {
				const finishTaskMock = vi.fn();
				// const courseRoomDetailsStore = mockedPiniaStoreTyping(useCourseRoomDetailsStore);
				const { wrapper, courseRoomDetailsStore } = setup({
					roomDataObject: mockData,
					role: "student",
				});
				courseRoomDetailsStore.finishTask = finishTaskMock;
				const taskCard = wrapper.findComponent<VCard>(".task-card");

				taskCard.vm.$emit("finish-task");
				await flushPromises();

				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][1]).toStrictEqual("finish");
			});

			it("should call restoreTask action", async () => {
				const finishTaskMock = vi.fn();
				// const courseRoomDetailsStore = mockedPiniaStoreTyping(useCourseRoomDetailsStore);
				const { wrapper, courseRoomDetailsStore } = setup({
					roomDataObject: mockData,
					role: "student",
				});
				courseRoomDetailsStore.finishTask = finishTaskMock;
				const taskCard = wrapper.findComponent<VCard>(".task-card");

				taskCard.vm.$emit("restore-task");
				await flushPromises();

				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][1]).toStrictEqual("restore");
			});
		});
	});

	describe("Publishing and unpublishing a board", () => {
		it("should call publishBoard action", async () => {
			const publishCardMock = vi.fn();
			// const courseRoomDetailsStore = mockedPiniaStoreTyping(useCourseRoomDetailsStore);
			const { wrapper, courseRoomDetailsStore } = setup({
				roomDataObject: mockData,
				role: "teacher",
			});
			courseRoomDetailsStore.publishCard = publishCardMock;
			const boardCard = wrapper.findComponent({ name: "RoomBoardCard" });

			boardCard.vm.$emit("update-visibility", true);
			await flushPromises();

			expect(publishCardMock).toHaveBeenCalled();
			expect(publishCardMock.mock.calls[0][1]).toStrictEqual(true);
		});
	});

	describe("CopyTask Process", () => {
		beforeEach(() => {
			setActivePinia(createTestingPinia());
			createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });
		});

		it("should emit 'copy-board-element' event when a task component emits 'copy-task' custom event", () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

			const taskCard = wrapper.findComponent<VCard>(".task-card");
			taskCard.vm.$emit("copy-task");

			const emittedEvents = wrapper.emitted("copy-board-element");
			expect(emittedEvents).toBeTruthy();
			expect(emittedEvents?.[0]).toEqual([
				{
					id: mockData.elements[0].content.id,
					type: CopyParamsTypeEnum.Task,
					courseId: mockData.roomId,
				},
			]);
		});

		it("should emit 'copy-board-element' with correct task-related payload", () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

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
			setActivePinia(createTestingPinia());
			createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });
		});

		it("should emit 'copy-board-element' event when a lesson component emits 'copy-lesson' custom event", () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");
			lessonCard.vm.$emit("copy-lesson");

			const emittedEvents = wrapper.emitted("copy-board-element");
			expect(emittedEvents).toBeTruthy();
			expect(emittedEvents?.[0]).toEqual([
				{
					id: mockData.elements[2].content.id,
					type: CopyParamsTypeEnum.Lesson,
					courseId: mockData.roomId,
				},
			]);
		});

		it("should emit 'copy-board-element' with correct lesson-related payload", () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

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
			setActivePinia(createTestingPinia());
			createTestEnvStore({ FEATURE_COPY_SERVICE_ENABLED: true });
		});

		it("should emit 'copy-board-element' event when a board component emits 'copy-board' custom event", () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

			const boardCard = wrapper.findComponent<VCard>({ name: "RoomBoardCard" });
			boardCard.vm.$emit("copy-board");

			const emittedEvents = wrapper.emitted("copy-board-element");
			expect(emittedEvents).toBeTruthy();
			expect(emittedEvents?.[0]).toEqual([
				{
					id: mockData.elements[4].content.id,
					type: CopyParamsTypeEnum.ColumnBoard,
					courseId: mockData.roomId,
				},
			]);
		});

		it("should emit 'copy-board-element' with correct board-related payload", () => {
			const { wrapper } = setup({ roomDataObject: mockData, role: "teacher" });

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
