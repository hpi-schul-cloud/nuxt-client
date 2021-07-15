import HomeworksList from "./HomeworksList";
import {
	homeworks,
	overDueHomeworks,
	openHomeworks,
} from "@@/stories/mockData/Homeworks";
import { fromNowToFuture } from "@plugins/datetime";
import Vuetify from "vuetify";

describe("@components/organisms/HomeworksList", () => {
	const mockStore = {
		homeworks: {
			getters: {
				getList: () => homeworks,
				getStatus: () => "completed",
				isListEmpty: () => false,
				isListFilled: () => true,
				openHomeworks: () => openHomeworks,
				overDueHomeworks: () => overDueHomeworks,
			},
			state: () => ({
				list: homeworks,
				loading: false,
			}),
		},
	};

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(HomeworksList));

	it("accepts only student and teacher as type prop", () => {
		const validTypes = ["student", "teacher"];
		const { validator } = HomeworksList.props.type;

		validTypes.forEach((type) => {
			expect(validator(type)).toBe(true);
		});

		expect(validator("wrong type")).toBe(false);
	});

	it("Should render complete homework items list", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
			propsData: {
				homeworks,
				type: "student",
			},
		});

		const dueDateLabels = wrapper.findAll("[data-test-id='dueDateLabel']");
		expect(dueDateLabels).toHaveLength(homeworks.length);

		dueDateLabels.wrappers.forEach((dateLabel, index) => {
			expect(dateLabel.exists()).toBe(true);
			if (
				homeworks[index].duedate === null ||
				typeof homeworks[index].duedate === "undefined"
			)
				expect(dateLabel.text()).toBe("Kein Abgabedatum");
			else expect(dateLabel.text()).toContain("Abgabe ");
		});
	});

	it("Should render an empty list, if there are no homeworks", () => {
		const mockStoreEmpty = {
			homeworks: {
				getters: {
					getList: () => [],
					getStatus: () => "completed",
					isListEmpty: () => true,
					isListFilled: () => false,
					openHomeworks: () => [],
					overDueHomeworks: () => [],
				},
				state: () => ({
					list: [],
					loading: false,
				}),
			},
		};

		const wrapper = mount(HomeworksList, {
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
		expect(wrapper.props("homeworks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});

	it("Should render hint label, if homework is close to due date", () => {
		const current = new Date();
		current.setHours(current.getHours() + 1);
		const closeToDueDate = current.toISOString();

		const homeworkCloseToDueDate = {
			id: "59cce2c61113d1132c98dc02",
			_id: "59cce2c61113d1132c98dc02",
			name: "Private Aufgabe von Marla - mit Kurs, abgelaufen",
			duedate: closeToDueDate,
			courseName: "Mathe",
			createdAt: "2017-09-28T11:49:39.924Z",
		};
		const extendedHomeworks = openHomeworks.concat(homeworkCloseToDueDate);
		const mockStoreCloseToDueDate = {
			homeworks: {
				getters: {
					getList: () => homeworks,
					getStatus: () => "completed",
					isListEmpty: () => false,
					isListFilled: () => true,
					openHomeworks: () => openHomeworks,
					overDueHomeworks: () => overDueHomeworks,
				},
				state: () => ({
					list: homeworks,
					loading: false,
				}),
			},
		};

		const homeworksCloseToDueDate = extendedHomeworks.filter((homework) => {
			const timeDiff = fromNowToFuture(homework.duedate, "hours");
			if (timeDiff === null) {
				return false;
			} else return timeDiff <= 24;
		});

		const wrapper = mount(HomeworksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreCloseToDueDate,
			}),
			vuetify,
			propsData: {
				type: "student",
				homeworks: extendedHomeworks,
			},
		});

		const dueDateHintLabels = wrapper.findAll(
			"[data-test-id='dueDateHintLabel']"
		);

		expect(dueDateHintLabels).toHaveLength(homeworksCloseToDueDate.length);
	});

	it("Should render overdue label, if homework is overdue ", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
			propsData: {
				type: "student",
				homeworks,
			},
		});

		const overDueLabels = wrapper.findAll("[data-test-id='overDueDateLabel']");

		expect(overDueLabels).toHaveLength(overDueHomeworks.length);
	});

	it("Should render loading state while fetching homework", () => {
		const mockStoreLoading = {
			homeworks: {
				getters: {
					getList: () => [],
					getStatus: () => "pending",
					isListEmpty: () => false,
					isListFilled: () => false,
					openHomeworks: () => [],
					overDueHomeworks: () => [],
				},
				state: () => ({
					list: [],
					loading: true,
				}),
			},
		};
		const wrapper = mount(HomeworksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreLoading,
			}),
			vuetify,
			propsData: {
				homeworks: [],
				type: "student",
			},
		});

		expect(wrapper.find(".v-skeleton-loader__text").exists()).toBe(true);
		expect(
			wrapper.find(".v-skeleton-loader__list-item-avatar-two-line").exists()
		).toBe(true);
		expect(wrapper.props("homeworks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});

	it("should accept valid type props", () => {
		const { validator } = HomeworksList.props.type;
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
		const wrapper = mount(HomeworksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
			propsData: {
				homeworks,
				type: "student",
			},
		});

		const subHeader = wrapper.findAll(".v-subheader");
		expect(subHeader.exists()).toBe(false);
	});

	it("Should render a subheader if title prop is not set", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
			propsData: {
				homeworks,
				type: "student",
				title: "my subheader",
			},
		});

		const subHeader = wrapper.findAll(".v-subheader");
		expect(subHeader.exists()).toBe(true);
	});
});
