import {
	printDateFromStringUTC as dateFromUTC,
	printDateTimeFromStringUTC as dateTimeFromUTC,
} from "@/plugins/datetime";
import CopyModule from "@/store/copy";
import NotifierModule from "@/store/notifier";
import TasksModule from "@/store/tasks";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import mocks from "@@/tests/test-utils/mockDataTasks";
import TaskItemStudent from "./TaskItemStudent";

const { tasks, openTasksWithoutDueDate, openTasksWithDueDate, invalidTasks } =
	mocks;

let tasksModuleMock;
let copyModuleMock;
let notifierModuleMock;

const mockRouter = {
	push: jest.fn(),
};

const getWrapper = (props, options) => {
	return mount(TaskItemStudent, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		provide: {
			tasksModule: tasksModuleMock,
			copyModule: copyModuleMock,
			[NOTIFIER_MODULE_KEY]: notifierModuleMock,
			[I18N_KEY]: { t: (key) => key },
		},
		propsData: props,
		...options,
		mocks: {
			$router: mockRouter,
		},
	});
};

describe("@/components/molecules/TaskItemStudent", () => {
	beforeEach(() => {
		tasksModuleMock = createModuleMocks(TasksModule);
		copyModuleMock = createModuleMocks(CopyModule);
		notifierModuleMock = createModuleMocks(NotifierModule);
	});

	it("Should direct user to legacy task details page", () => {
		const { location } = window;
		const wrapper = getWrapper({ task: tasks[0] });
		const taskCard = wrapper.findComponent({ name: "v-list-item" });
		taskCard.trigger("click");

		expect(location.pathname).toStrictEqual(`/homework/${tasks[0].id}`);
	});

	it("Should display no due date label if task has no dueDate", () => {
		const wrapper = getWrapper({ task: openTasksWithoutDueDate[0] });

		const dueDateLabel = wrapper.find("[data-test-id='dueDateLabel']");
		expect(dueDateLabel.text()).toBe("");
	});

	it("Should display due date label if task has dueDate", () => {
		const wrapper = getWrapper({ task: tasks[0] });

		const convertedDueDate = dateTimeFromUTC(tasks[0].dueDate);
		const expectedDueDateLabel = `${wrapper.vm.$i18n.t(
			"pages.tasks.labels.due"
		)} ${convertedDueDate}`;

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

		wrapper.vm.$vuetify.display.xsOnly = true;

		const convertedDueDate = dateFromUTC(tasks[0].dueDate);
		const expectedDueDateLabel = `${wrapper.vm.$i18n.t(
			"pages.tasks.labels.due"
		)} ${convertedDueDate}`;

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

		expect(wrapper.text()).toContain("Thema Malen nach Zahlen");
	});
});
