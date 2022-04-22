import TasksList from "./TasksList.vue";
import mocks from "@@/tests/test-utils/mockDataTasks";
import TaskModule from "@/store/tasks";
import FinishedTaskModule from "@/store/finished-tasks";
import { provide } from "@nuxtjs/composition-api";
import { mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { Task } from "@/store/types/tasks";
import { createModuleMocks } from "@/utils/mock-store-module";

const { tasks, overDueTasks, openTasks } = mocks;

describe("@components/organisms/TasksList", () => {
	let taskModuleMock: TaskModule;
	let finishedTaskModuleMock: FinishedTaskModule;
	let wrapper: Wrapper<Vue>;

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(TasksList, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("taskModule", taskModuleMock);
				provide("finishedTaskModule", finishedTaskModuleMock);
			},
			...attrs,
		});

		return wrapper;
	};

	const taskModuleGetters: Partial<TaskModule> = {
		getTasks: tasks as unknown as Task[],
		getStatus: "completed",
		hasTasks: true,
	};

	beforeEach(() => {
		taskModuleMock = createModuleMocks(TaskModule, taskModuleGetters);

		finishedTaskModuleMock = createModuleMocks(FinishedTaskModule, {
			getTasks: [],
			tasksIsEmpty: true,
		});
	});

	describe("props", () => {
		it("should accept valid type & role props", () => {
			//@ts-ignore
			const typeValidator = TasksList.props.type.validator;
			//@ts-ignore
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
			wrapper = mountComponent({
				propsData: {
					tasks,
					userRole: "student",
				},
			});

			const subHeader = wrapper.findAll(".v-subheader");
			expect(subHeader.exists()).toBe(false);
		});

		it("Should render a subheader if title prop is set", () => {
			wrapper = mountComponent({
				propsData: {
					tasks,
					userRole: "student",
					title: "my subheader",
				},
			});

			const subHeader = wrapper.findAll(".v-subheader");
			expect(subHeader.exists()).toBe(true);
		});
	});

	it("Should render complete task items list", () => {
		wrapper = mountComponent({
			propsData: {
				tasks,
				userRole: "student",
			},
		});

		const dueDateLabels = wrapper.findAll("[data-test-id='dueDateLabel']");
		expect(dueDateLabels).toHaveLength(tasks.length);

		dueDateLabels.wrappers.forEach((dateLabel, index) => {
			expect(dateLabel.exists()).toBe(true);
			if (
				//@ts-ignore
				tasks[index].duedate === null ||
				//@ts-ignore
				typeof tasks[index].duedate === "undefined"
			)
				expect(dateLabel.text()).toBe("Kein Abgabedatum");
			else expect(dateLabel.text()).toContain("Abgabe ");
		});
	});

	it("Should render an empty list, if there are no tasks", () => {
		taskModuleMock = createModuleMocks(TaskModule, {
			getTasks: [],
			getStatus: "completed",
			hasTasks: false,
		});

		wrapper = mountComponent({
			propsData: {
				userRole: "student",
			},
		});

		expect(wrapper.props("tasks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});

	describe("when loading tasks", () => {
		it("Should render loading state while fetching initial tasks", () => {
			taskModuleMock = createModuleMocks(TaskModule, {
				...taskModuleGetters,
				hasTasks: true,
				getStatus: "pending",
			});

			wrapper = mountComponent({
				propsData: {
					tasks: [],
					userRole: "student",
				},
			});

			expect(wrapper.find(".v-skeleton-loader__text").exists()).toBe(true);
			expect(
				wrapper.find(".v-skeleton-loader__list-item-avatar-two-line").exists()
			).toBe(true);
			expect(wrapper.find(".v-progress-circular").exists()).toBe(false);
			expect(wrapper.props("tasks")).toStrictEqual([]);
			expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
		});

		it("Should render loading state while fetching more tasks", () => {
			taskModuleMock = createModuleMocks(TaskModule, {
				...taskModuleGetters,
				getStatus: "pending",
			});

			finishedTaskModuleMock = createModuleMocks(FinishedTaskModule, {
				getIsInitialized: true,
			});

			wrapper = mountComponent({
				propsData: {
					tasks,
					userRole: "student",
					hasPagination: true,
				},
			});

			//@ts-ignore
			expect(wrapper.vm.showSpinner).toBe(true);
			expect(wrapper.find(".v-progress-circular").exists()).toBe(true);
			expect(wrapper.find(".v-skeleton-loader__text").exists()).toBe(false);
			expect(
				wrapper.find(".v-skeleton-loader__list-item-avatar-two-line").exists()
			).toBe(false);
		});

		it("Should compute correct status", () => {
			taskModuleMock = createModuleMocks(TaskModule, {
				...taskModuleGetters,
				getStatus: "completed",
			});

			finishedTaskModuleMock = createModuleMocks(FinishedTaskModule, {
				getStatus: "pending",
			});

			wrapper = mountComponent({
				propsData: {
					tasks,
					userRole: "student",
				},
			});

			//@ts-ignore
			expect(wrapper.vm.status).toBe("completed");
		});
	});
});
