import HomeworksList from "./HomeworksList";
import {
	homeworks,
	overDueHomeworks,
	openHomeworksSortedByDueDate,
} from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("@components/organisms/HomeworksList", () => {
	const mockStore = {
		homeworks: {
			getters: {
				list: () => homeworks,
				loading: () => false,
				isListEmpty: () => false,
				isListFilled: () => true,
				openHomeworksSortedByDueDate: () => openHomeworksSortedByDueDate,
				overDueHomeworks: () => overDueHomeworks,
			},
			state: () => ({
				list: homeworks,
				loading: false,
			}),
		},
	};
	const mockStoreEmpty = {
		homeworks: {
			getters: {
				list: () => [],
				loading: () => false,
				isListEmpty: () => true,
				isListFilled: () => false,
				openHomeworksSortedByDueDate: () => [],
				overDueHomeworks: () => [],
			},
			state: () => ({
				list: [],
				loading: false,
			}),
		},
	};
	const mockStoreLoading = {
		homeworks: {
			getters: {
				list: () => [],
				loading: () => true,
				isListEmpty: () => false,
				isListFilled: () => false,
				openHomeworksSortedByDueDate: () => [],
				overDueHomeworks: () => [],
			},
			state: () => ({
				list: [],
				loading: true,
			}),
		},
	};
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(HomeworksList));

	it("Should render complete homework items list", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStore,
				},
				vuetify
			),
			propsData: {
				homeworks,
			},
		});

		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(
			homeworks.length
		);
	});

	it("Should render an empty list", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStoreEmpty,
				},
				vuetify
			),
		});

		expect(wrapper.props("homeworks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});

	it("Should link list item links to homework/<id> page", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStore,
				},
				vuetify
			),
			propsData: {
				homeworks,
			},
		});

		const firstLink = wrapper.find("a");

		expect(firstLink.exists()).toBe(true);
		expect(firstLink.attributes().href).toBe(`/homework/${homeworks[0]._id}`);
	});

	it("Should display due date labels according to due date", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStore,
				},
				vuetify
			),
			propsData: {
				homeworks,
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
			else expect(dateLabel.text()).toContain("Abgabe am");
		});
	});

	/* 	it.todo("Should render hint, if homework is closed to due date", () => {
		const dueDateHintLabels = wrapper.findAll(
			"[data-test-id='dueDateHintLabel']"
		);
		expect(dueDateHintLabels).toHaveLength(homeworks.length);

		dueDateHintLabels.wrappers.forEach((dateHintLabel, index) => {
			expect(dateHintLabel.exists()).toBe(true);
			const current = new Date();
			const currentPlusOneDay = new Date();
			currentPlusOneDay.setDate(currentPlusOneDay.getDate() + 1);

			if (
				new Date(homeworks[index].duedate) < currentPlusOneDay &&
				new Date(homeworks[index].duedate) > current
			)
				//TODO: this case is never reached with the test data
				expect(dateHintLabel.text()).toBe("DueSoon");
			else if (new Date(homeworks[index].duedate) < current)
				expect(dateHintLabel.text()).toContain("Verpasst");
			else expect(dateHintLabel.text()).toContain("");
		});
	}); */

	it("Should render loading state while fetching homeworks", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStoreLoading,
				},
				vuetify
			),
			propsData: {
				homeworks: [],
			},
		});

		expect(wrapper.find(".v-skeleton-loader__text").exists()).toBe(true);
		expect(
			wrapper.find(".v-skeleton-loader__list-item-avatar-two-line").exists()
		).toBe(true);
		expect(wrapper.props("homeworks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});
});
