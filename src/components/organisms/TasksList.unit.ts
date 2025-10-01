import TaskItemTeacher from "../molecules/TaskItemTeacher.vue";
import TasksList from "./TasksList.vue";
import CopyModule, { CopyParamsTypeEnum } from "@/store/copy";
import FinishedTasksModule from "@/store/finished-tasks";
import NotifierModule from "@/store/notifier";
import TasksModule from "@/store/tasks";
import { COPY_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import mocks from "@@/tests/test-utils/mockDataTasks";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeAll } from "vitest";

const { tasks } = mocks;

describe("@/components/organisms/TasksList", () => {
	let tasksModuleMock: TasksModule;
	let finishedTasksModuleMock: FinishedTasksModule;
	let copyModuleMock: CopyModule;
	let notifierModuleMock: NotifierModule;

	const mountComponent = (options = {}) => {
		const wrapper = mount(TasksList, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
					tasksModule: tasksModuleMock,
					finishedTasksModule: finishedTasksModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
				},
			},
			...options,
		});

		return wrapper;
	};

	const tasksModuleGetters: Partial<TasksModule> = {
		getTasks: tasks,
		getStatus: "completed",
		hasTasks: true,
	};

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	beforeEach(() => {
		copyModuleMock = createModuleMocks(CopyModule);
		tasksModuleMock = createModuleMocks(TasksModule, tasksModuleGetters);
		finishedTasksModuleMock = createModuleMocks(FinishedTasksModule, {
			getTasks: [],
			tasksIsEmpty: true,
		});
		notifierModuleMock = createModuleMocks(NotifierModule);
	});

	describe("props", () => {
		it("should accept valid type & role props", () => {
			const typeValidator = TasksList.props.type.validator;
			const roleValidator = TasksList.props.userRole.validator;
			const validTypes = ["current", "finished"];
			const validRoles = ["student", "teacher"];
			const invalidValues = ["invalid", "type"];

			validRoles.forEach((role) => {
				expect(roleValidator(role)).toBe(true);
			});

			validTypes.forEach((type) => {
				expect(typeValidator(type)).toBe(true);
			});

			invalidValues.forEach((type) => {
				expect(typeValidator(type)).toBe(false);
			});

			invalidValues.forEach((role) => {
				expect(roleValidator(role)).toBe(false);
			});
		});
	});

	describe("subheader rendering", () => {
		it("Should render no subheader if title prop is not set", () => {
			const wrapper = mountComponent({
				propsData: {
					tasks,
					userRole: "student",
				},
			});

			const subHeader = wrapper.findAll(".v-subheader");
			expect(subHeader.length).toStrictEqual(0);
		});

		it("Should render a subheader if title prop is set", () => {
			const wrapper = mountComponent({
				propsData: {
					tasks,
					userRole: "student",
					title: "my subheader",
				},
			});

			const subHeader = wrapper.findAll(".v-subheader");
			expect(subHeader.length).toStrictEqual(0);
		});
	});

	it("Should render complete task items list", () => {
		const wrapper = mountComponent({
			propsData: {
				tasks,
				userRole: "student",
			},
		});

		const dueDateLabels = wrapper.findAll("[data-test-id='dueDateLabel']");
		expect(dueDateLabels).toHaveLength(tasks.length);

		dueDateLabels.forEach((dateLabel, index) => {
			expect(dateLabel.exists()).toBe(true);
			if (tasks[index].dueDate === null || tasks[index].dueDate === undefined) {
				expect(dateLabel.text()).toBe("");
			} else {
				expect(dateLabel.text()).toContain("pages.tasks.labels.due ");
			}
		});
	});

	it("Should render an empty list, if there are no tasks", () => {
		tasksModuleMock = createModuleMocks(TasksModule, {
			getTasks: [],
			getStatus: "completed",
			hasTasks: false,
		});

		const wrapper = mountComponent({
			propsData: {
				userRole: "student",
			},
		});

		expect(wrapper.props()).toStrictEqual({
			userRole: "student",
			tasks: [],
			title: null,
			type: "current",
			hasPagination: false,
		});
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});

	describe("when loading tasks", () => {
		it("Should render loading state while fetching initial tasks", () => {
			tasksModuleMock = createModuleMocks(TasksModule, {
				...tasksModuleGetters,
				hasTasks: true,
				getStatus: "pending",
			});

			const wrapper = mountComponent({
				propsData: {
					tasks: [],
					userRole: "student",
				},
			});

			expect(wrapper.find(".v-skeleton-loader__text").exists()).toBe(true);
			expect(wrapper.find(".v-skeleton-loader__list-item-avatar-two-line").exists()).toBe(true);
			expect(wrapper.find(".v-progress-circular").exists()).toBe(false);
			expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
			expect(wrapper.props()).toStrictEqual({
				userRole: "student",
				tasks: [],
				title: null,
				type: "current",
				hasPagination: false,
			});
		});

		it("Should render loading state while fetching more tasks", () => {
			tasksModuleMock = createModuleMocks(TasksModule, {
				...tasksModuleGetters,
				getStatus: "pending",
			});

			finishedTasksModuleMock = createModuleMocks(FinishedTasksModule, {
				getIsInitialized: true,
			});

			const wrapper = mountComponent({
				propsData: {
					tasks,
					userRole: "student",
					hasPagination: true,
				},
			});

			expect(wrapper.find(".v-progress-circular").exists()).toBe(true);
			expect(wrapper.find(".v-skeleton-loader__text").exists()).toBe(false);
			expect(wrapper.find(".v-skeleton-loader__list-item-avatar-two-line").exists()).toBe(false);
		});

		it("Should compute correct status", () => {
			tasksModuleMock = createModuleMocks(TasksModule, {
				...tasksModuleGetters,
				getStatus: "completed",
			});

			finishedTasksModuleMock = createModuleMocks(FinishedTasksModule, {
				getStatus: "pending",
			});

			const wrapper = mountComponent({
				propsData: {
					tasks,
					userRole: "student",
				},
			});

			expect(wrapper.vm.status).toBe("completed");
		});
	});

	it("should passthrough copy-task event", async () => {
		const wrapper = mountComponent({
			propsData: {
				tasks,
				userRole: "teacher",
			},
		});

		const payload = {
			id: "123",
			courseId: "c789",
			type: CopyParamsTypeEnum.Task,
		};

		const oneTaskItemTeacher = wrapper.findComponent(TaskItemTeacher);
		oneTaskItemTeacher.vm.$emit("copy-task", payload);

		expect(wrapper.emitted()["copy-task"]?.[0]).toEqual(expect.arrayContaining([payload]));
	});
});
