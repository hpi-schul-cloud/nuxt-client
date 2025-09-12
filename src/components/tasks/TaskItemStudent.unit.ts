import {
	printDateFromStringUTC as dateFromUTC,
	printDateTimeFromStringUTC as dateTimeFromUTC,
} from "@/plugins/datetime";
import CopyModule from "@/store/copy";
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
import TaskItemStudent from "./TaskItemStudent.vue";
import { ComponentProps } from "vue-component-type-helpers";

const { tasks, openTasksWithoutDueDate, openTasksWithDueDate, invalidTasks } =
	mocks;

let tasksModuleMock: TasksModule;
let copyModuleMock: CopyModule;
let notifierModuleMock: NotifierModule;

const mockRouter = {
	push: vi.fn(),
};

const getWrapper = (props: ComponentProps<typeof TaskItemStudent>) => {
	return mount(TaskItemStudent, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				tasksModule: tasksModuleMock,
				[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
			},
		},
		props,
		mocks: {
			$router: mockRouter,
		},
	});
};

describe("@/components/tasks/TaskItemStudent", () => {
	beforeEach(() => {
		tasksModuleMock = createModuleMocks(TasksModule);
		copyModuleMock = createModuleMocks(CopyModule);
		notifierModuleMock = createModuleMocks(NotifierModule);
	});

	it("Should direct user to legacy task details page", async () => {
		Object.defineProperty(window, "location", {
			set: vi.fn(),
			get: () => createMock<Location>(),
		});
		const locationSpy = vi.spyOn(window, "location", "set");

		const wrapper = getWrapper({ task: tasks[0] });
		const taskCard = wrapper.findComponent({ name: "v-list-item" });
		await taskCard.trigger("click");

		expect(locationSpy).toHaveBeenCalledWith(`/homework/${tasks[0].id}`);
	});

	it("Should display no due date label if task has no dueDate", () => {
		const wrapper = getWrapper({ task: openTasksWithoutDueDate[0] });

		const dueDateLabel = wrapper.find("[data-test-id='dueDateLabel']");
		expect(dueDateLabel.text()).toBe("");
	});

	it("Should display due date label if task has dueDate", () => {
		const wrapper = getWrapper({ task: tasks[0] });

		const convertedDueDate = dateTimeFromUTC(tasks[0].dueDate);
		const expectedDueDateLabel = `pages.tasks.labels.due ${convertedDueDate}`;

		const dueDateLabel = wrapper.find("[data-test-id='dueDateLabel']");
		expect(dueDateLabel.text()).toBe(expectedDueDateLabel);
	});

	it("Should render hint label, if task is close to due date and not submitted", () => {
		const current = new Date();
		current.setHours(current.getHours() + 1);
		const closeToDueDate = current.toISOString();

		const taskCloseToDueDate = {
			id: "59cce2c61113d1132c98dc02",
			_id: "59cce2c61113d1132c98dc02",
			name: "Private Aufgabe von Marla - mit Kurs, abgelaufen",
			dueDate: closeToDueDate,
			courseName: "Mathe",
			createdAt: "2017-09-28T11:49:39.924Z",
			status: {
				isFinished: false,
				submitted: 0,
			},
		};

		const wrapper = getWrapper({ task: taskCloseToDueDate });

		expect(wrapper.find("[data-test-id='dueDateHintLabel']").exists()).toBe(
			true
		);
	});

	it("Should not render hint label, if task is close to due date and submitted", () => {
		const current = new Date();
		current.setHours(current.getHours() + 1);
		const closeToDueDate = current.toISOString();

		const taskCloseToDueDate = {
			id: "59cce2c61113d1132c98dc02",
			_id: "59cce2c61113d1132c98dc02",
			name: "Private Aufgabe von Marla - mit Kurs, abgelaufen",
			dueDate: closeToDueDate,
			courseName: "Mathe",
			createdAt: "2017-09-28T11:49:39.924Z",
			status: {
				isFinished: false,
				submitted: 1,
			},
		};

		const wrapper = getWrapper({ task: taskCloseToDueDate });

		expect(wrapper.find("[data-test-id='dueDateHintLabel']").exists()).toBe(
			false
		);
	});

	it("Should render no hint label if the task is due in the far future", () => {
		const wrapper = getWrapper({ task: openTasksWithDueDate[0] });

		expect(wrapper.find("[data-test-id='dueDateHintLabel']").exists()).toBe(
			false
		);
	});

	it("computed DueDateLabel() method should be able to render a shortened date", () => {
		const wrapper = getWrapper({ task: openTasksWithDueDate[0] });

		wrapper.vm.$vuetify.display.xs = true;

		const convertedDueDate = dateFromUTC(tasks[0].dueDate);
		const expectedDueDateLabel = `pages.tasks.labels.due ${convertedDueDate}`;

		expect(wrapper.vm.dueDateLabel).toBe(expectedDueDateLabel);
	});

	it("accepts valid task props", () => {
		const { validator } = TaskItemStudent.props.task;
		const validTasks = tasks;

		validTasks.forEach((task) => {
			expect(validator(task)).toBe(true);
		});

		invalidTasks.forEach((task) => {
			expect(validator(task)).toBe(false);
		});
	});

	it("should display topic", () => {
		const wrapper = getWrapper({ task: openTasksWithDueDate[0] });

		expect(wrapper.text()).toContain(
			"offencommon.words.topic Malen nach Zahlen"
		);
	});
});
