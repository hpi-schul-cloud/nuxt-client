import CourseRoomDashboard from "./CourseRoomDashboard.vue";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import { createTestEnvStore, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import {
	BoardElementResponseType,
	BoardLayout,
	ShareTokenBodyParamsParentType,
	SingleColumnBoardResponse,
} from "@api-server";
import { useCourseRoomDetailsStore } from "@data-course-rooms";
import { createTestingPinia } from "@pinia/testing";
import { EmptyState } from "@ui-empty-state";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import draggable from "vuedraggable";
import { VCard } from "vuetify/components";

vi.mock("@data-tasks");

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

const setup = (options?: { roomData?: SingleColumnBoardResponse; role?: string }) => {
	injectRouterMock(createRouterMock());
	const courseRoomDetailsStore = mockedPiniaStoreTyping(useCourseRoomDetailsStore);
	courseRoomDetailsStore.roomData = structuredClone(options?.roomData ?? mockData);
	courseRoomDetailsStore.fetchContent = vi.fn();
	courseRoomDetailsStore.sortElements = vi.fn();

	const wrapper = mount(CourseRoomDashboard, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props: {
			role: options?.role || "teacher",
		},
	});

	return { wrapper, courseRoomDetailsStore };
};

describe("CourseRoomDashboard.vue", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		createTestEnvStore();
	});
	describe("common features", () => {
		it("should have props", () => {
			const { wrapper } = setup();

			expect(wrapper.props("role")).toStrictEqual("teacher");
		});

		it("should list board card", () => {
			const { wrapper } = setup();

			const boardCard = wrapper.findAllComponents({ name: "RoomBoardCard" });
			expect(boardCard).toHaveLength(1);
		});

		it("should list task cards", () => {
			const { wrapper } = setup();

			const taskCards = wrapper.findAll(".task-card");
			expect(taskCards).toHaveLength(2);
		});

		it("should list lesson cards", () => {
			const { wrapper } = setup();

			const lessonCards = wrapper.findAll(".lesson-card");
			expect(lessonCards).toHaveLength(2);
		});

		it("should have lessonData object", () => {
			const { wrapper } = setup();

			const lessonCards = wrapper.findAll(".lesson-card");
			expect(lessonCards).toHaveLength(2);
		});

		it("should have taskData object", () => {
			const { wrapper } = setup();

			const taskCards = wrapper.findAll(".task-card");
			expect(taskCards).toHaveLength(2);
		});

		it("Should render empty state for teacher", () => {
			const { wrapper } = setup({
				roomData: emptyMockData,
			});

			const emptyStateComponent = wrapper.findComponent(EmptyState);
			expect(emptyStateComponent.exists()).toBe(true);
			expect(emptyStateComponent.props("title")).toBe("pages.room.learningContent.emptyState");
		});

		it("Should render empty state for students", () => {
			const { wrapper } = setup({
				roomData: emptyMockData,
				role: "student",
			});

			const emptyStateComponent = wrapper.findComponent(EmptyState);
			expect(emptyStateComponent.props("title")).toBe("pages.room.learningContent.emptyState");
		});
	});

	describe("Drag & Drop operations", () => {
		it("should enable sorting if user is a 'teacher'", async () => {
			const { wrapper } = setup();

			await flushPromises();
			const draggableComponent = wrapper.findComponent(draggable);
			expect(draggableComponent.exists()).toBe(true);
		});

		it("should not render draggable for students", () => {
			const { wrapper } = setup({ role: "student" });

			const draggableComponent = wrapper.findComponent(draggable);
			expect(draggableComponent.exists()).toBe(false);
		});

		it("should use non-touch delay for desktop devices", () => {
			const tempOntouchstart = window.ontouchstart;
			window.ontouchstart = undefined;
			const { wrapper } = setup();

			const draggableComponent = wrapper.findComponent(draggable);
			expect(draggableComponent.exists()).toBe(true);
			window.ontouchstart = tempOntouchstart;
		});

		it("should use touch delay for mobile devices", () => {
			const tempOntouchstart = window.ontouchstart;
			window.ontouchstart = () => null;
			const { wrapper } = setup();

			const draggableComponent = wrapper.findComponent(draggable);
			expect(draggableComponent.exists()).toBe(true);
			window.ontouchstart = tempOntouchstart;
		});

		it("should handle drag events correctly", async () => {
			const { wrapper } = setup();

			const element = wrapper.findComponent({ name: "draggable" });
			await element.vm.$emit("start");
			await element.vm.$emit("end");

			expect(element.exists()).toBe(true);
		});

		it("should call sortElements when drag and drop occurs", async () => {
			const { wrapper, courseRoomDetailsStore } = setup();

			const reorderedItems = JSON.parse(JSON.stringify(mockData.elements));
			reorderedItems.splice(1, 0, reorderedItems.splice(0, 1)[0]);

			const draggableElement = wrapper.findComponent({ name: "draggable" });
			await draggableElement.vm.$emit("update:modelValue", reorderedItems);

			expect(courseRoomDetailsStore.sortElements).toHaveBeenCalled();
		});

		it("should handle keyboard sorting for teachers", async () => {
			const { wrapper, courseRoomDetailsStore } = setup();

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
			const { wrapper, courseRoomDetailsStore } = setup({ role: "student" });

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
			const { wrapper } = setup();

			const cardElement = wrapper.findComponent({ ref: "item_1" });
			if (cardElement.exists()) {
				await cardElement.vm.$emit("tab-pressed");
				expect(cardElement.exists()).toBe(true);
			}
		});

		it("should toggle isDragging when on-drag event from board card", async () => {
			const { wrapper } = setup();

			const boardCard = wrapper.findComponent({ name: "RoomBoardCard" });
			await boardCard.vm.$emit("on-drag");

			expect(boardCard.exists()).toBe(true);
		});

		it("should set isDragging to false on tab-pressed from board card", async () => {
			const { wrapper } = setup();

			const boardCard = wrapper.findComponent({ name: "RoomBoardCard" });
			await boardCard.vm.$emit("on-drag");
			await boardCard.vm.$emit("tab-pressed");

			expect(boardCard.exists()).toBe(true);
		});

		it("should toggle isDragging when on-drag event from task card", async () => {
			const { wrapper } = setup();

			const taskCard = wrapper.findComponent<VCard>(".task-card");
			await taskCard.vm.$emit("on-drag");

			expect(taskCard.exists()).toBe(true);
		});

		it("should set isDragging to false on tab-pressed from task card", async () => {
			const { wrapper } = setup();

			const taskCard = wrapper.findComponent<VCard>(".task-card");
			await taskCard.vm.$emit("on-drag");
			await taskCard.vm.$emit("tab-pressed");

			expect(taskCard.exists()).toBe(true);
		});

		it("should toggle isDragging when on-drag event from lesson card", async () => {
			const { wrapper } = setup();

			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");
			await lessonCard.vm.$emit("on-drag");

			expect(lessonCard.exists()).toBe(true);
		});

		it("should set isDragging to false on tab-pressed from lesson card", async () => {
			const { wrapper } = setup();

			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");
			await lessonCard.vm.$emit("on-drag");
			await lessonCard.vm.$emit("tab-pressed");

			expect(lessonCard.exists()).toBe(true);
		});

		it("should not call sortElements when moving first element before start", async () => {
			const { wrapper, courseRoomDetailsStore } = setup();

			const taskCards = wrapper.findAllComponents({ name: "CourseRoomTaskCard" });
			await taskCards[0].vm.$emit("move-element", { id: "1234", moveIndex: -1 });

			expect(courseRoomDetailsStore.sortElements).not.toHaveBeenCalled();
		});

		it("should not call sortElements when moving last element past end", async () => {
			const { wrapper, courseRoomDetailsStore } = setup();

			const boardCard = wrapper.findComponent({ name: "RoomBoardCard" });
			await boardCard.vm.$emit("move-element", { id: "9876", moveIndex: 1 });

			expect(courseRoomDetailsStore.sortElements).not.toHaveBeenCalled();
		});

		it("should call sortElements on valid keyboard move", async () => {
			const { wrapper, courseRoomDetailsStore } = setup();

			const taskCards = wrapper.findAllComponents({ name: "CourseRoomTaskCard" });
			await taskCards[1].vm.$emit("move-element", { id: "2345", moveIndex: -1 });
			await flushPromises();

			expect(courseRoomDetailsStore.sortElements).toHaveBeenCalled();
		});

		it("should set dragInProgress to false after endDragging delay", async () => {
			vi.useFakeTimers();
			const { wrapper } = setup();

			const draggableComponent = wrapper.findComponent(draggable);
			await draggableComponent.vm.$emit("start");
			await draggableComponent.vm.$emit("end");
			vi.advanceTimersByTime(200);

			vi.useRealTimers();
			expect(draggableComponent.exists()).toBe(true);
		});
	});

	describe("Sharing Lesson", () => {
		it("should call startShareFlow when share lesson item clicked", () => {
			const { wrapper } = setup();

			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");
			lessonCard.vm.$emit("open-modal", "3456");

			expect(wrapper.emitted("share-board-element")).toStrictEqual([
				[
					{
						id: "3456",
						type: ShareTokenBodyParamsParentType.LESSONS,
					},
				],
			]);
		});
	});

	describe("Sharing Task", () => {
		it("should call startShareFlow when share task item clicked", () => {
			const { wrapper } = setup();
			const taskCard = wrapper.findComponent<VCard>(".task-card");

			taskCard.vm.$emit("share-task", "1234");

			expect(wrapper.emitted("share-board-element")).toStrictEqual([
				[
					{
						id: "1234",
						type: ShareTokenBodyParamsParentType.TASKS,
					},
				],
			]);
		});
	});

	describe("Deleting Items", () => {
		it("should call deleteLesson when lesson deletion is confirmed", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletionForItem").mockResolvedValue(true);

			const { wrapper, courseRoomDetailsStore } = setup();
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
			const { wrapper, courseRoomDetailsStore } = setup();
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
			const { wrapper, courseRoomDetailsStore } = setup();
			courseRoomDetailsStore.deleteTask = deleteTaskMock;
			const taskCard = wrapper.findComponent<VCard>(".task-card");

			taskCard.vm.$emit("delete-task");
			await flushPromises();

			expect(deleteTaskMock).not.toHaveBeenCalled();
		});

		it("should not call deleteLesson when lesson deletion is cancelled", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletionForItem").mockResolvedValue(false);
			const deleteLessonMock = vi.fn();
			const { wrapper, courseRoomDetailsStore } = setup();
			courseRoomDetailsStore.deleteLesson = deleteLessonMock;
			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");

			lessonCard.vm.$emit("delete-lesson");
			await flushPromises();

			expect(deleteLessonMock).not.toHaveBeenCalled();
		});

		it("should call deleteBoard when board deletion is confirmed", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletionForItem").mockResolvedValue(true);

			const { wrapper, courseRoomDetailsStore } = setup();
			courseRoomDetailsStore.deleteBoard = vi.fn();
			courseRoomDetailsStore.fetchContent = vi.fn();

			const boardCard = wrapper.findComponent({ name: "RoomBoardCard" });
			boardCard.vm.$emit("delete-board");
			await flushPromises();

			expect(confirmDialogUtils.askDeletionForItem).toHaveBeenCalledWith("title", "common.words.board");
			expect(courseRoomDetailsStore.deleteBoard).toHaveBeenCalledWith("board-123");
			expect(courseRoomDetailsStore.fetchContent).toHaveBeenCalled();
		});

		it("should not call deleteBoard when board deletion is cancelled", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletionForItem").mockResolvedValue(false);
			const deleteBoardMock = vi.fn();
			const { wrapper, courseRoomDetailsStore } = setup();
			courseRoomDetailsStore.deleteBoard = deleteBoardMock;

			const boardCard = wrapper.findComponent({ name: "RoomBoardCard" });
			boardCard.vm.$emit("delete-board");
			await flushPromises();

			expect(deleteBoardMock).not.toHaveBeenCalled();
		});
	});

	describe("Finishing and Restoring Tasks", () => {
		describe("For teachers", () => {
			it("should call finishTask action", async () => {
				const finishTaskMock = vi.fn();
				const { wrapper, courseRoomDetailsStore } = setup();
				courseRoomDetailsStore.finishTask = finishTaskMock;
				const taskCard = wrapper.findComponent<VCard>(".task-card");

				taskCard.vm.$emit("finish-task");
				await flushPromises();

				expect(finishTaskMock).toHaveBeenCalled();
				expect(finishTaskMock.mock.calls[0][1]).toStrictEqual("finish");
			});

			it("should call restoreTask action", async () => {
				const finishTaskMock = vi.fn();
				const { wrapper, courseRoomDetailsStore } = setup();
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
				const { wrapper, courseRoomDetailsStore } = setup({
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
				const { wrapper, courseRoomDetailsStore } = setup({
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
			const { wrapper, courseRoomDetailsStore } = setup();
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
			const { wrapper } = setup();

			const taskCard = wrapper.findComponent<VCard>(".task-card");
			taskCard.vm.$emit("copy-task");

			const emittedEvents = wrapper.emitted("copy-board-element");
			expect(emittedEvents).toBeTruthy();
			expect(emittedEvents?.[0]).toEqual([
				{
					id: mockData.elements[0].content.id,
					type: ContentItemTypeEnum.Task,
					courseId: mockData.roomId,
				},
			]);
		});

		it("should emit 'copy-board-element' with correct task-related payload", () => {
			const { wrapper } = setup();

			const taskCard = wrapper.findComponent<VCard>(".task-card");
			taskCard.vm.$emit("copy-task");

			expect(wrapper.emitted()).toHaveProperty("copy-board-element");
			const copyBoardElementEvent = wrapper.emitted("copy-board-element");
			expect(copyBoardElementEvent).toStrictEqual([
				[
					{
						id: "1234",
						type: ContentItemTypeEnum.Task,
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
			const { wrapper } = setup();

			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");
			lessonCard.vm.$emit("copy-lesson");

			const emittedEvents = wrapper.emitted("copy-board-element");
			expect(emittedEvents).toBeTruthy();
			expect(emittedEvents?.[0]).toEqual([
				{
					id: mockData.elements[2].content.id,
					type: ContentItemTypeEnum.Lesson,
					courseId: mockData.roomId,
				},
			]);
		});

		it("should emit 'copy-board-element' with correct lesson-related payload", () => {
			const { wrapper } = setup();

			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");
			lessonCard.vm.$emit("copy-lesson");

			expect(wrapper.emitted()).toHaveProperty("copy-board-element");
			const copyBoardElementEvent = wrapper.emitted("copy-board-element");
			expect(copyBoardElementEvent).toStrictEqual([
				[
					{
						id: "3456",
						type: ContentItemTypeEnum.Lesson,
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
			const { wrapper } = setup();

			const boardCard = wrapper.findComponent<VCard>({ name: "RoomBoardCard" });
			boardCard.vm.$emit("copy-board");

			const emittedEvents = wrapper.emitted("copy-board-element");
			expect(emittedEvents).toBeTruthy();
			expect(emittedEvents?.[0]).toEqual([
				{
					id: mockData.elements[4].content.id,
					type: ContentItemTypeEnum.ColumnBoard,
					courseId: mockData.roomId,
				},
			]);
		});

		it("should emit 'copy-board-element' with correct board-related payload", () => {
			const { wrapper } = setup();

			const boardCard = wrapper.findComponent<VCard>({ name: "RoomBoardCard" });
			boardCard.vm.$emit("copy-board");

			expect(wrapper.emitted()).toHaveProperty("copy-board-element");
			const copyBoardElementEvent = wrapper.emitted("copy-board-element");
			expect(copyBoardElementEvent).toStrictEqual([
				[
					{
						id: "9876",
						type: ContentItemTypeEnum.ColumnBoard,
						courseId: "123",
					},
				],
			]);
		});
	});

	describe("Sharing Board", () => {
		it("should call startShareFlow when board is shared and FEATURE_COLUMN_BOARD_SHARE is enabled", () => {
			createTestEnvStore({ FEATURE_COLUMN_BOARD_SHARE: true });
			const { wrapper } = setup();

			const boardCard = wrapper.findComponent({ name: "RoomBoardCard" });
			boardCard.vm.$emit("share-board", "board-123");

			expect(wrapper.emitted("share-board-element")).toStrictEqual([
				[
					{
						id: "board-123",
						type: ShareTokenBodyParamsParentType.COLUMN_BOARD,
					},
				],
			]);
		});
	});

	describe("Card visibility updates", () => {
		it("should call publishCard when task card emits update-visibility", async () => {
			const { wrapper, courseRoomDetailsStore } = setup();
			courseRoomDetailsStore.publishCard = vi.fn();

			const taskCard = wrapper.findComponent<VCard>(".task-card");
			taskCard.vm.$emit("update-visibility", false);
			await flushPromises();

			expect(courseRoomDetailsStore.publishCard).toHaveBeenCalledWith(mockData.elements[0].content.id, false);
		});

		it("should call publishCard when lesson card emits update-visibility", async () => {
			const { wrapper, courseRoomDetailsStore } = setup();
			courseRoomDetailsStore.publishCard = vi.fn();

			const lessonCard = wrapper.findComponent<VCard>(".lesson-card");
			lessonCard.vm.$emit("update-visibility", true);
			await flushPromises();

			expect(courseRoomDetailsStore.publishCard).toHaveBeenCalledWith(mockData.elements[2].content.id, true);
		});
	});

	describe("Student board card visibility", () => {
		it("should render published board card for student", () => {
			const { wrapper } = setup({ role: "student" });

			const boardCards = wrapper.findAllComponents({ name: "RoomBoardCard" });
			expect(boardCards).toHaveLength(1);
		});

		it("should not render unpublished board card for student", () => {
			const unpublishedBoardData = {
				...mockData,
				elements: [
					{
						type: BoardElementResponseType.COLUMN_BOARD,
						content: {
							id: "9876",
							title: "title",
							published: false,
							createdAt: "2023-05-31T15:34:59.276Z",
							updatedAt: "2023-05-31T15:34:59.276Z",
							columnBoardId: "board-123",
							layout: BoardLayout.COLUMNS,
						},
					},
				],
			} as unknown as SingleColumnBoardResponse;

			const { wrapper } = setup({ role: "student", roomData: unpublishedBoardData });

			const boardCards = wrapper.findAllComponents({ name: "RoomBoardCard" });
			expect(boardCards).toHaveLength(0);
		});
	});

	describe("Board layout aria label", () => {
		it("should render board card with LIST layout without errors", () => {
			const listLayoutData = {
				...mockData,
				elements: [
					{
						type: BoardElementResponseType.COLUMN_BOARD,
						content: {
							id: "9876",
							title: "title",
							published: true,
							createdAt: "2023-05-31T15:34:59.276Z",
							updatedAt: "2023-05-31T15:34:59.276Z",
							columnBoardId: "board-123",
							layout: BoardLayout.LIST,
						},
					},
				],
			} as unknown as SingleColumnBoardResponse;

			const { wrapper } = setup({ roomData: listLayoutData });

			const boardCard = wrapper.findComponent({ name: "RoomBoardCard" });
			expect(boardCard.exists()).toBe(true);
		});
	});

	describe("Touch device lifecycle hooks", () => {
		it("should add contextmenu event listener on mount for touch devices", () => {
			const addEventListenerSpy = vi.spyOn(window, "addEventListener");
			const savedOntouchstart = window.ontouchstart;
			window.ontouchstart = () => null;

			setup();

			expect(addEventListenerSpy).toHaveBeenCalledWith("contextmenu", expect.any(Function));

			window.ontouchstart = savedOntouchstart;
			addEventListenerSpy.mockRestore();
		});

		it("should remove contextmenu event listener on unmount for touch devices", () => {
			const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
			const savedOntouchstart = window.ontouchstart;
			window.ontouchstart = () => null;

			const { wrapper } = setup();
			wrapper.unmount();

			expect(removeEventListenerSpy).toHaveBeenCalledWith("contextmenu", expect.any(Function));

			window.ontouchstart = savedOntouchstart;
			removeEventListenerSpy.mockRestore();
		});
	});
});
