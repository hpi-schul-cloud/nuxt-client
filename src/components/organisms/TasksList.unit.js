import TasksList from "./TasksList";
import {
	tasks,
	overDueTasks,
	openTasks,
} from "@@/stories/mockData/Tasks";
import { fromNowToFuture } from "@plugins/datetime";
import Vuetify from "vuetify";

describe("@components/organisms/TasksList", () => {
	const mockStore = {
		tasks: {
			getters: {
				getList: () => tasks,
				getStatus: () => "completed",
				hasNoTasks: () => false,
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

	it("accepts only student and teacher as type prop", () => {
		const validTypes = ["student", "teacher"];
		const { validator } = TasksList.props.type;

		validTypes.forEach((type) => {
			expect(validator(type)).toBe(true);
		});

		expect(validator("wrong type")).toBe(false);
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
				type: "student",
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
					hasNoTasks: () => true,
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
				type: "student",
			},
		});
		expect(wrapper.props("tasks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});

	it("Should render hint label, if task is close to due date", () => {
		const current = new Date();
		current.setHours(current.getHours() + 1);
		const closeToDueDate = current.toISOString();

		const taskCloseToDueDate = {
			id: "59cce2c61113d1132c98dc02",
			_id: "59cce2c61113d1132c98dc02",
			name: "Private Aufgabe von Marla - mit Kurs, abgelaufen",
			duedate: closeToDueDate,
			courseName: "Mathe",
			createdAt: "2017-09-28T11:49:39.924Z",
		};
		const extendedTasks = openTasks.concat(taskCloseToDueDate);
		const mockStoreCloseToDueDate = {
			tasks: {
				getters: {
					getList: () => tasks,
					getStatus: () => "completed",
					hasNoTasks: () => false,
					openTasks: () => openTasks,
					overDueTasks: () => overDueTasks,
				},
				state: () => ({
					list: tasks,
					status: "completed",
				}),
			},
		};

		const tasksCloseToDueDate = extendedTasks.filter((task) => {
			const timeDiff = fromNowToFuture(task.duedate, "hours");
			if (timeDiff === null) {
				return false;
			} else return timeDiff <= 24;
		});

		const wrapper = mount(TasksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreCloseToDueDate,
			}),
			vuetify,
			propsData: {
				type: "student",
				tasks: extendedTasks,
			},
		});

		const dueDateHintLabels = wrapper.findAll(
			"[data-test-id='dueDateHintLabel']"
		);

		expect(dueDateHintLabels).toHaveLength(tasksCloseToDueDate.length);
	});

	it("Should render loading state while fetching task", () => {
		const mockStoreLoading = {
			tasks: {
				getters: {
					getList: () => [],
					getStatus: () => "pending",
					hasNoTasks: () => false,
					openTasks: () => [],
					overDueTasks: () => [],
				},
				state: () => ({
					list: [],
					status: "pending",
				}),
			},
		};
		const wrapper = mount(TasksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreLoading,
			}),
			vuetify,
			propsData: {
				tasks: [],
				type: "student",
			},
		});

		expect(wrapper.find(".v-skeleton-loader__text").exists()).toBe(true);
		expect(
			wrapper.find(".v-skeleton-loader__list-item-avatar-two-line").exists()
		).toBe(true);
		expect(wrapper.props("tasks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});

	it("should accept valid type props", () => {
		const { validator } = TasksList.props.type;
		const validTypes = ["student", "teacher"];
		const invalidTypes = ["invalid", "type"];

		validTypes.forEach((type) => {
			expect(validator(type)).toBe(true);
		});

		invalidTypes.forEach((type) => {
			expect(validator(type)).toBe(false);
		});
	});

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
				type: "student",
			},
		});

		const subHeader = wrapper.findAll(".v-subheader");
		expect(subHeader.exists()).toBe(false);
	});

	it("Should render a subheader if title prop is not set", () => {
		const wrapper = mount(TasksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
			propsData: {
				tasks,
				type: "student",
				title: "my subheader",
			},
		});

		const subHeader = wrapper.findAll(".v-subheader");
		expect(subHeader.exists()).toBe(true);
	});
});
