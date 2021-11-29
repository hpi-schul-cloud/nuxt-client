import TasksList from "./TasksList";
import mocks from "@@/stories/mockData/Tasks";
import Vuetify from "vuetify";
import TaskModule from "@/store/tasks";
import FinishedTaskModule from "@/store/finished-tasks";

const { tasks, overDueTasks, openTasks } = mocks;

describe("@components/organisms/TasksList", () => {
	const mockStore = {
		tasks: {
			getters: {
				getList: () => tasks,
				getStatus: () => "completed",
				hasTasks: () => true,
				openTasks: () => openTasks,
				overDueTasks: () => overDueTasks,
			},
			state: () => ({
				list: tasks,
				status: "completed",
			}),
		},
	};

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(TasksList));

	describe("props", () => {
		it("should accept valid type & role props", () => {
			const typeValidator = TasksList.props.type.validator;
			const roleValidator = TasksList.props.role.validator;
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
					store: mockStore,
				}),
				vuetify,
				propsData: {
					tasks,
					role: "student",
				},
			});

			const subHeader = wrapper.findAll(".v-subheader");
			expect(subHeader.exists()).toBe(false);
		});

		it("Should render a subheader if title prop is set", () => {
			const spy = jest
				.spyOn(TaskModule, "getStatus", "get")
				.mockReturnValue("completed");

			const wrapper = mount(TasksList, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				vuetify,
				propsData: {
					tasks,
					role: "student",
					title: "my subheader",
				},
			});

			const subHeader = wrapper.findAll(".v-subheader");
			expect(subHeader.exists()).toBe(true);

			spy.mockRestore();
		});
	});

	it("Should render complete task items list", () => {
		const wrapper = mount(TasksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
			propsData: {
				tasks,
				role: "student",
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
		const mockStoreEmpty = {
			tasks: {
				getters: {
					getList: () => [],
					getStatus: () => "completed",
					hasTasks: () => false,
					openTasks: () => [],
					overDueTasks: () => [],
				},
				state: () => ({
					list: [],
					status: "completed",
				}),
			},
		};

		const wrapper = mount(TasksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreEmpty,
			}),
			vuetify,
			propsData: {
				role: "student",
			},
		});
		expect(wrapper.props("tasks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});

	it("Should render loading state while fetching initial tasks", () => {
		const spy1 = jest
			.spyOn(TaskModule, "hasTasks", "get")
			.mockReturnValue(true);
		const spy2 = jest
			.spyOn(TaskModule, "getStatus", "get")
			.mockReturnValue("pending");

		const wrapper = mount(TasksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				tasks: [],
				role: "student",
			},
		});

		expect(wrapper.find(".v-skeleton-loader__text").exists()).toBe(true);
		expect(
			wrapper.find(".v-skeleton-loader__list-item-avatar-two-line").exists()
		).toBe(true);
		expect(wrapper.props("tasks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);

		spy1.mockRestore();
		spy2.mockRestore();
	});

	it("Should render loading state while fetching more tasks", () => {
		const spy1 = jest
			.spyOn(TaskModule, "hasTasks", "get")
			.mockReturnValue(true);
		const spy2 = jest
			.spyOn(FinishedTaskModule, "getStatus", "get")
			.mockReturnValue("pending");
		const spy3 = jest
			.spyOn(FinishedTaskModule, "getInitialized", "get")
			.mockReturnValue(true);

		const wrapper = mount(TasksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				tasks,
				role: "student",
				hasPagination: true,
			},
		});

		console.log(tasks.length);
		expect(wrapper.find(".v-progress-circular").exists()).toBe(true);
		/* 	expect(
			wrapper.find(".v-skeleton-loader__list-item-avatar-two-line").exists()
		).toBe(true);
		expect(wrapper.props("tasks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0); */

		spy1.mockRestore();
		spy2.mockRestore();
		spy3.mockRestore();
	});
});
