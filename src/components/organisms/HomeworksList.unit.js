import HomeworksList from "./HomeworksList";
import { homeworks } from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("@components/organisms/HomeworksList", () => {
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

	it("Should display due date label according to due date", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
				},
				vuetify
			),
			propsData: {
				homeworks: homeworks,
			},
		});

		const dateLabels = wrapper.findAll(".v-list-item__action-text");

		dateLabels.wrappers.forEach((dateLabel, index) => {
			expect(dateLabel.exists()).toBe(true);

			if (
				homeworks[index].duedate === null ||
				typeof homeworks[index].duedate === "undefined"
			)
				expect(dateLabel.text()).toBe("Kein Abgabedatum");
			else if (new Date(homeworks[index].duedate) >= new Date())
				expect(dateLabel.text()).toContain("Fällig");
			else expect(dateLabel.text()).toBe("Zu spät");
		});
	});
});
