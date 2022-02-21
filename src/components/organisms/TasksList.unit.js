import TasksList from "./TasksList";
import mocks from "@@/tests/test-utils/mockDataTasks";
import Vuetify from "vuetify";
import { createModuleMocks } from "@/utils/mock-store-module";
import { TaskModule } from "@/store/tasks";

const { tasks, overDueTasks, openTasks } = mocks;

const mockTaskModule = jest.fn();
jest.mock("@store/tasks", () => ({
	...jest.requireActual("@store/tasks"),
	__esModule: true,
	get default() {
		return mockTaskModule();
	},
}));

describe("@components/organisms/TasksList", () => {
	let taskModuleMock;
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();

		taskModuleMock = {
			...createModuleMocks(TaskModule),
			getList: tasks,
			getStatus: "completed",
			hasTasks: true,
			openTasks: openTasks,
			overDueTasks: overDueTasks,
		};
		mockTaskModule.mockReturnValue(taskModuleMock);
	});

	it(...isValidComponent(TasksList));

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
			const wrapper = mount(TasksList, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				vuetify,
				propsData: {
					tasks,
					userRole: "student",
				},
			});

			const subHeader = wrapper.findAll(".v-subheader");
			expect(subHeader.exists()).toBe(false);
		});

		it("Should render a subheader if title prop is set", () => {
			const wrapper = mount(TasksList, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				vuetify,
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
		const wrapper = mount(TasksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
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
				tasks[index].duedate === null ||
				typeof tasks[index].duedate === "undefined"
			)
				expect(dateLabel.text()).toBe("Kein Abgabedatum");
			else expect(dateLabel.text()).toContain("Abgabe ");
		});
	});

	it("Should render an empty list, if there are no tasks", () => {
		taskModuleMock = {
			...taskModuleMock,
			getList: [],
			getStatus: "completed",
			hasTasks: false,
			openTasks: [],
			overDueTasks: [],
		};

		const wrapper = mount(TasksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				userRole: "student",
			},
		});
		expect(wrapper.props("tasks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});

	describe("when loading tasks", () => {
		it("Should render loading state while fetching initial tasks", () => {
			taskModuleMock = {
				...taskModuleMock,
				hasTasks: true,
				getStatus: "pending",
			};
			mockTaskModule.mockReturnValue(taskModuleMock);

			const wrapper = mount(TasksList, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				vuetify,
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
			const wrapper = mount(TasksList, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				vuetify,
				propsData: {
					tasks,
					userRole: "student",
					hasPagination: true,
				},
				computed: {
					status() {
						return "pending";
					},
					finishedTasksIsInitialized() {
						return true;
					},
				},
			});

			expect(wrapper.vm.showSpinner).toBe(true);
			expect(wrapper.find(".v-progress-circular").exists()).toBe(true);
			expect(wrapper.find(".v-skeleton-loader__text").exists()).toBe(false);
			expect(
				wrapper.find(".v-skeleton-loader__list-item-avatar-two-line").exists()
			).toBe(false);
		});

		it("Should compute correct status", () => {
			taskModuleMock = {
				...taskModuleMock,
				getStatus: "completed",
			};
			mockTaskModule.mockReturnValue(taskModuleMock);

			const wrapper = mount(TasksList, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				vuetify,
				propsData: {
					tasks,
					userRole: "student",
				},
			});

			expect(wrapper.vm.status).toBe("completed");
		});
	});
});
