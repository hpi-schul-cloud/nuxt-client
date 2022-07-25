import mocks from "@@/tests/test-utils/mockDataTasks";
import TaskItemTeacher from "./TaskItemTeacher";

const {
	tasksTeacher,
	drafts,
	plannedTask,
	dueDateTasksTeacher,
	noDueDateTasksTeacher,
} = mocks;

const defineWindowWidth = (width) => {
	Object.defineProperty(window, "innerWidth", {
		writable: true,
		configurable: true,
		value: width,
	});
	window.dispatchEvent(new Event("resize"));
};

const getWrapper = (props, options) => {
	return mount(TaskItemTeacher, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		attachTo: document.body,
		...options,
	});
};

describe("@components/molecules/TaskItemTeacher", () => {
	defineWindowWidth(1264);

	it(...isValidComponent(TaskItemTeacher));

	it("accepts valid task props", () => {
		const { validator } = TaskItemTeacher.props.task;
		const validTasks = tasksTeacher;

		validTasks.forEach((task) => {
			expect(validator(task)).toBe(true);
		});
	});

	it("should compute correct href value", () => {
		const wrapper = getWrapper({
			task: tasksTeacher[0],
		});

		expect(wrapper.vm.href).toStrictEqual(`/homework/${tasksTeacher[0].id}`);
		expect(wrapper.attributes("href")).toStrictEqual(
			`/homework/${tasksTeacher[0].id}`
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
				expect(taskLabel.text()).toMatch(/Ohne Kurszuordnung/i);
				expect(wrapper.vm.courseName).toStrictEqual("Ohne Kurszuordnung");
			});

			describe("when teacher is a subtitution teacher", () => {
				const wrapper = getWrapper({
					task: drafts[1],
				});

				it("should add 'substitution' to the course label", () => {
					const taskLabel = wrapper.find("[data-testid='task-label']");

					expect(taskLabel.exists()).toBe(true);
					expect(taskLabel.text()).toMatch(/Vertretung Ohne Kurszuordnung/i);
					expect(wrapper.vm.courseName).toStrictEqual(
						"Vertretung Ohne Kurszuordnung"
					);
				});
			});
		});

		const wrapper = getWrapper({
			task: drafts[0],
		});

		it("should set isDraft to true", () => {
			expect(wrapper.vm.isDraft).toBe(true);
		});

		it("should compute correct avatar icon value", () => {
			expect(wrapper.vm.avatarIcon).toStrictEqual("$taskDraft");
		});

		it("should not show task status", () => {
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
			const wrapper = getWrapper({
				task: dueDateTasksTeacher[0],
			});

			it("should add 'substitution' to the course label", () => {
				const taskLabel = wrapper.find("[data-testid='task-label']");

				expect(taskLabel.exists()).toBe(true);
				expect(taskLabel.text()).toMatch(/Vertretung Mathe/i);
				expect(wrapper.vm.courseName).toStrictEqual("Vertretung Mathe");
			});
		});

		const wrapper = getWrapper({
			task: tasksTeacher[0],
		});

		it("should set isDraft to true", () => {
			expect(wrapper.vm.isDraft).toBe(false);
		});

		it("should compute correct avatar icon value", () => {
			expect(wrapper.vm.avatarIcon).toStrictEqual("$taskOpenFilled");
		});
	});

	describe("when a task is planned", () => {
		const wrapper = getWrapper({
			task: plannedTask,
		});

		it("should set isPlanned to true", () => {
			expect(wrapper.vm.isPlanned).toBe(true);
		});

		it("should not show task status", () => {
			expect(wrapper.find("[data-testid='task-status']").exists()).toBe(false);
			expect(wrapper.vm.showTaskStatus).toBe(false);
		});

		it("should show planned label", () => {
			const taskLabel = wrapper.find("[data-testid='task-label']");

			expect(taskLabel.exists()).toBe(true);
			expect(taskLabel.text()).toMatch(/Geplant 28.09.00/i);
			expect(wrapper.vm.plannedLabel).toStrictEqual(`Geplant 28.09.00`);
		});
	});

	describe("when a task is without due date", () => {
		const wrapper = getWrapper({
			task: noDueDateTasksTeacher[0],
		});

		it("should show correct due date label", () => {
			const taskLabel = wrapper.find("[data-testid='task-label']");

			expect(taskLabel.exists()).toBe(true);
			expect(taskLabel.text()).toMatch(/Kein Abgabedatum/i);
			expect(wrapper.vm.dueDateLabel).toStrictEqual(`Kein Abgabedatum`);
		});
	});

	describe("when a task has a due date", () => {
		const wrapper = getWrapper({
			task: dueDateTasksTeacher[0],
		});

		it("should show correct due date label", () => {
			const taskLabel = wrapper.find("[data-testid='task-label']");

			expect(taskLabel.exists()).toBe(true);
			expect(taskLabel.text()).toMatch(/Abgabe 11.06.00/i);
			expect(wrapper.vm.dueDateLabel).toStrictEqual(`Abgabe 11.06.00`);
		});
	});

	describe("when a task has a topic", () => {
		const wrapper = getWrapper({
			task: dueDateTasksTeacher[0],
		});

		it("should show correct topic label", () => {
			const topicLabel = wrapper.find("[data-testid='task-topic']");

			expect(topicLabel.exists()).toBe(true);
			expect(topicLabel.text()).toMatch(/Thema Malen nach Zahlen/i);
			expect(wrapper.vm.topic).toStrictEqual(`Thema Malen nach Zahlen`);
		});
	});

	describe("when a task has no topic", () => {
		const wrapper = getWrapper({
			task: dueDateTasksTeacher[1],
		});

		it("should show correct topic label", () => {
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

				const menuBtn = wrapper.find(".v-btn");
				await menuBtn.trigger("click");

				expect(wrapper.vm.isMenuActive).toBe(true);
				expect(wrapper.find(".menuable__content__active").exists()).toBe(true);
			});

			it("should close menu on btn click", async () => {
				const wrapper = getWrapper({
					task: drafts[1],
				});

				const menuBtn = wrapper.find(".v-btn");
				await menuBtn.trigger("click");
				await menuBtn.trigger("click");

				expect(wrapper.vm.isMenuActive).toBe(false);
				expect(wrapper.find(".menuable__content__active").exists()).toBe(false);
			});

			it.todo("should close & hide menu on outside click");
		});

		describe("keyboard events", () => {
			it("should show menu btn on tab focus", async () => {
				const wrapper = getWrapper({
					task: drafts[1],
				});

				await wrapper.trigger("focus");
				expect(wrapper.vm.isActive).toBe(true);
				const menuBtn = wrapper.find("#task-menu-btn");
				expect(menuBtn.isVisible()).toBe(true);
			});
		});

		it("should link to btn edit page on edit btn click", async () => {
			const wrapper = getWrapper({
				task: tasksTeacher[0],
			});

			const menuBtn = wrapper.find(".v-btn");
			await menuBtn.trigger("click");
			const editBtn = wrapper.find("#task-action-edit");

			expect(editBtn.attributes("href")).toBe(
				`/homework/${tasksTeacher[0].id}/edit`
			);
		});

		it("always show menu on mobile", () => {
			defineWindowWidth(375);

			const wrapper = getWrapper({
				task: tasksTeacher[0],
			});

			const menuBtn = wrapper.find("#task-menu-btn");
			expect(menuBtn.isVisible()).toBe(true);
		});
	});
});
