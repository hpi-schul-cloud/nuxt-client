import CopyModule, { CopyParamsTypeEnum } from "@/store/copy";
import NotifierModule from "@/store/notifier";
import TasksModule from "@/store/tasks";
import { COPY_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import mocks from "@@/tests/test-utils/mockDataTasks";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-vitest";
import { mount } from "@vue/test-utils";
import { VBtn, VListItem } from "vuetify/lib/components/index";
import TaskItemMenu from "./TaskItemMenu.vue";
import TaskItemTeacher from "./TaskItemTeacher.vue";

const {
	tasksTeacher,
	drafts,
	plannedTask,
	dueDateTasksTeacher,
	noDueDateTasksTeacher,
} = mocks;

let tasksModuleMock: TasksModule;
let copyModuleMock: CopyModule;
let notifierModuleMock: NotifierModule;

const mockRouter = {
	push: vi.fn(),
};

const getWrapper = (props: { task: object }) => {
	return mount(TaskItemTeacher, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				tasksModule: tasksModuleMock,
				[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
			},
		},
		props: props,
		mocks: {
			$router: mockRouter,
		},
	});
};

describe("@/components/tasks/TaskItemTeacher", () => {
	const defineWindowWidth = (width: number) => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: width,
		});
		window.dispatchEvent(new Event("resize"));
	};

	defineWindowWidth(1264);

	beforeEach(() => {
		tasksModuleMock = createModuleMocks(TasksModule);
		copyModuleMock = createModuleMocks(CopyModule);
		notifierModuleMock = createModuleMocks(NotifierModule);
	});

	it("accepts valid task props", () => {
		const { validator } = TaskItemTeacher.props.task;
		const validTasks = tasksTeacher;

		validTasks.forEach((task) => {
			expect(validator(task)).toBe(true);
		});
	});

	it("should direct user to legacy task details page", () => {
		Object.defineProperty(window, "location", {
			set: vi.fn(),
			get: () => createMock<Location>(),
		});
		const locationSpy = vi.spyOn(window, "location", "set");

		const wrapper = getWrapper({ task: tasksTeacher[0] });
		const taskCard = wrapper.findComponent(VListItem);
		taskCard.trigger("click");

		expect(locationSpy).toHaveBeenCalledWith(`/homework/${tasksTeacher[0].id}`);
	});

	it("should passthrough copy-task event", async () => {
		const wrapper = getWrapper({
			task: tasksTeacher[0],
		});

		const payload = {
			id: "123",
			courseId: "c789",
			type: CopyParamsTypeEnum.Task,
		};

		const oneTaskItemMenu = wrapper.findComponent(TaskItemMenu);
		oneTaskItemMenu.vm.$emit("copy-task", payload);

		expect(wrapper.emitted()["copy-task"]?.[0]).toStrictEqual(
			expect.arrayContaining([payload])
		);
	});

	describe("when task is a draft task", () => {
		describe("when task has no course", () => {
			it("should set course name to 'no course assigned'", () => {
				const wrapper = getWrapper({
					task: drafts[2],
				});

				const taskLabel = wrapper.find("[data-testid='task-label']");

				expect(taskLabel.exists()).toBe(true);
				expect(taskLabel.text()).toContain("pages.tasks.labels.noCourse");
				expect(wrapper.vm.courseName).toStrictEqual(
					"pages.tasks.labels.noCourse"
				);
			});

			it("should show createdAt date in label", () => {
				const wrapper = getWrapper({
					task: drafts[2],
				});

				const taskLabel = wrapper.find("[data-testid='task-label']");

				expect(taskLabel.exists()).toBe(true);
				expect(taskLabel.text()).toContain(
					"components.molecules.TaskItemMenu.labels.createdAt 28.09.17"
				);
				expect(wrapper.vm.taskLabel).toStrictEqual(
					"pages.tasks.labels.noCourse - components.molecules.TaskItemMenu.labels.createdAt 28.09.17"
				);
			});

			describe("when teacher is a subtitution teacher", () => {
				it("should add 'substitution' to the course label", () => {
					const wrapper = getWrapper({
						task: drafts[1],
					});

					const taskLabel = wrapper.find("[data-testid='task-label']");

					expect(taskLabel.exists()).toBe(true);
					expect(taskLabel.text()).toContain(
						"common.words.substitute pages.tasks.labels.noCourse"
					);
					expect(wrapper.vm.courseName).toStrictEqual(
						"common.words.substitute pages.tasks.labels.noCourse"
					);
				});
			});
		});

		it("should set isDraft to true", () => {
			const wrapper = getWrapper({
				task: drafts[0],
			});
			expect(wrapper.vm.isDraft).toBe(true);
		});

		it("should compute correct avatar icon value", () => {
			const wrapper = getWrapper({
				task: drafts[0],
			});
			expect(wrapper.vm.avatarIcon).toStrictEqual("$taskDraft");
		});

		it("should not show task status", () => {
			const wrapper = getWrapper({
				task: drafts[0],
			});
			expect(wrapper.find("[data-testid='task-status']").exists()).toBe(false);
			expect(wrapper.vm.showTaskStatus).toBe(false);
		});
	});

	describe("when task is not a draft task", () => {
		it("should set course name correctly", () => {
			const wrapper = getWrapper({
				task: dueDateTasksTeacher[1],
			});

			const taskLabel = wrapper.find("[data-testid='task-label']");

			expect(taskLabel.exists()).toBe(true);
			expect(taskLabel.text()).toMatch(/Mathe/i);
			expect(wrapper.vm.courseName).toStrictEqual("Mathe");
		});

		describe("when teacher is a subtitution teacher", () => {
			it("should add 'substitution' to the course label", () => {
				const wrapper = getWrapper({
					task: dueDateTasksTeacher[0],
				});

				const taskLabel = wrapper.find("[data-testid='task-label']");

				expect(taskLabel.exists()).toBe(true);
				expect(taskLabel.text()).toContain("common.words.substitute Mathe");
				expect(wrapper.vm.courseName).toStrictEqual(
					"common.words.substitute Mathe"
				);
			});
		});

		it("should set isDraft to true", () => {
			const wrapper = getWrapper({
				task: tasksTeacher[0],
			});
			expect(wrapper.vm.isDraft).toBe(false);
		});

		it("should compute correct avatar icon value", () => {
			const wrapper = getWrapper({
				task: tasksTeacher[0],
			});
			expect(wrapper.vm.avatarIcon).toStrictEqual("$taskOpenFilled");
		});
	});

	describe("when a task is planned", () => {
		it("should set isPlanned to true", () => {
			const wrapper = getWrapper({
				task: plannedTask,
			});

			expect(wrapper.vm.isPlanned).toBe(true);
		});

		it("should not show task status", () => {
			const wrapper = getWrapper({
				task: plannedTask,
			});

			expect(wrapper.find("[data-testid='task-status']").exists()).toBe(false);
			expect(wrapper.vm.showTaskStatus).toBe(false);
		});

		it("should show planned label", () => {
			const wrapper = getWrapper({
				task: plannedTask,
			});

			const taskLabel = wrapper.find("[data-testid='task-label']");

			expect(taskLabel.exists()).toBe(true);
			expect(taskLabel.text()).toStrictEqual(
				"Deutsch - pages.tasks.labels.planned 28.09.00"
			);
			expect(wrapper.vm.taskLabel).toStrictEqual(
				"Deutsch - pages.tasks.labels.planned 28.09.00"
			);
		});
	});

	describe("when a task is without due date", () => {
		it("should show correct due date label", () => {
			const wrapper = getWrapper({
				task: noDueDateTasksTeacher[0],
			});

			const taskLabel = wrapper.find("[data-testid='task-label']");

			expect(taskLabel.exists()).toBe(true);
			expect(taskLabel.text()).toMatch(/Mathe/i);
			expect(wrapper.vm.taskLabel).toStrictEqual("Mathe");
		});
	});

	describe("when a task has a due date", () => {
		it("should show correct due date label", () => {
			const wrapper = getWrapper({
				task: dueDateTasksTeacher[0],
			});

			const taskLabel = wrapper.find("[data-testid='task-label']");

			expect(taskLabel.exists()).toBe(true);
			expect(taskLabel.text()).toMatch(
				"common.words.substitute Mathe - pages.tasks.labels.due 11.06.00"
			);
			expect(wrapper.vm.taskLabel).toStrictEqual(
				`common.words.substitute Mathe - pages.tasks.labels.due 11.06.00`
			);
		});
	});

	describe("when a task has a topic", () => {
		it("should show correct topic label", () => {
			const wrapper = getWrapper({
				task: dueDateTasksTeacher[0],
			});

			const topicLabel = wrapper.find("[data-testid='task-topic']");

			expect(topicLabel.exists()).toBe(true);
			expect(topicLabel.text()).toMatch("common.words.topic Malen nach Zahlen");
			expect(wrapper.vm.topic).toStrictEqual(
				"common.words.topic Malen nach Zahlen"
			);
		});
	});

	describe("when a task has an unpublished lesson", () => {
		it("should show unpublished lesson info", () => {
			const wrapper = getWrapper({
				task: dueDateTasksTeacher[4],
			});

			const lessonChipLarge = wrapper.find(
				"[data-testid='task-lesson-chip-large']"
			);
			const lessonChipSmall = wrapper.find(
				"[data-testid='task-lesson-chip-small']"
			);
			const taskStatus = wrapper.find("[data-testid='task-status']");
			const taskStatusSmall = wrapper.find("[data-testid='task-status-small']");
			const hasUnpublished = wrapper.vm.hasUnpublishedLesson;

			expect(hasUnpublished).toBe(true);
			expect(lessonChipLarge.exists()).toBe(true);
			expect(lessonChipSmall.exists()).toBe(true);
			expect(taskStatus.exists()).toBe(false);
			expect(taskStatusSmall.exists()).toBe(false);
		});
	});

	describe("when a task has no topic", () => {
		it("should show correct topic label", () => {
			const wrapper = getWrapper({
				task: dueDateTasksTeacher[1],
			});

			const topicLabel = wrapper.find("[data-testid='task-topic']");

			expect(topicLabel.exists()).toBe(false);
			expect(wrapper.vm.topic).toStrictEqual("");
		});
	});

	describe("when menu is used", () => {
		describe("mouse events", () => {
			it("should open menu on btn click", async () => {
				const wrapper = getWrapper({
					task: drafts[1],
				});

				const menuBtn = wrapper.findComponent(VBtn);
				await menuBtn.trigger("click");

				expect(
					wrapper.findComponent(`[data-testid="task-edit"]`).isVisible()
				).toBe(true);
			});

			it("should close menu on btn click", async () => {
				const wrapper = getWrapper({
					task: drafts[1],
				});

				const menuBtn = wrapper.find(".v-btn");
				await menuBtn.trigger("click");
				await menuBtn.trigger("click");

				expect(wrapper.find(".menuable__content__active").exists()).toBe(false);
			});

			it.todo("should close & hide menu on outside click");
		});

		describe("keyboard events", () => {
			it("should show menu btn on tab focus", async () => {
				const wrapper = getWrapper({
					task: drafts[1],
				});

				const vListItem = wrapper.findComponent(VListItem);
				await vListItem.trigger("focus");

				expect(wrapper.vm.isActive).toBe(true);
				const menuBtn = wrapper.findComponent(`[data-testid=task-menu]`);

				expect(menuBtn.isVisible()).toBe(true);
			});
		});

		it("should link to btn edit page on edit btn click", async () => {
			const wrapper = getWrapper({
				task: tasksTeacher[0],
			});

			const menuBtn = wrapper.findComponent(VBtn);
			await menuBtn.trigger("click");
			const editBtn = wrapper.findComponent(`[data-testid="task-edit"]`);

			expect(editBtn.attributes("href")).toBe(
				`/homework/${tasksTeacher[0].id}/edit`
			);
		});

		it("always show menu on mobile", () => {
			defineWindowWidth(375);

			const wrapper = getWrapper({
				task: tasksTeacher[0],
			});

			const menuBtn = wrapper.findComponent(VBtn);
			expect(menuBtn.isVisible()).toBe(true);
		});
	});
});
