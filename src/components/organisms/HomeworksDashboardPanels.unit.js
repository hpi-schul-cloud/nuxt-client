import Vuetify from "vuetify";
import HomeworksDashboardPanels from "./HomeworksDashboardPanels";

describe("@components/organisms/HomeworksDashboardPanels", () => {
	const propsData = {
		panelOneCount: 1,
		panelTwoCount: 13,
		panelOneTitle: "Panel one title",
		panelTwoTitle: "Panel two title",
		status: "completed",
		isEmpty: false,
	};

	const propsDataLoading = {
		panelOneCount: 1,
		panelTwoCount: 13,
		panelOneTitle: "Panel one title",
		panelTwoTitle: "Panel two title",
		status: "pending",
		isEmpty: false,
	};

	const propsDataOneEmpty = {
		panelOneCount: 0,
		panelTwoCount: 12,
		panelOneTitle: "Panel one title",
		panelTwoTitle: "Panel two title",
		status: "completed",
		isEmpty: false,
	};
	const propsDataEmpty = {
		panelOneCount: 0,
		panelTwoCount: 0,
		panelOneTitle: "Panel one title",
		panelTwoTitle: "Panel two title",
		status: "completed",
		isEmpty: true,
	};
	const panel = "<div class='panel' />";

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(HomeworksDashboardPanels));

	it("Should render its slots", () => {
		const wrapper = mount(HomeworksDashboardPanels, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData,
			slots: {
				panelOne: panel,
				panelTwo: panel,
			},
		});

		expect(wrapper.find(".panel").exists()).toBe(true);
	});

	it("Accepts valid panel count props", () => {
		const { validator } = HomeworksDashboardPanels.props.panelOneCount;
		const validCount = 1234;
		const invalidCounts = [-1, undefined, {}];

		expect(validator(validCount)).toBe(true);

		invalidCounts.forEach((count) => {
			expect(validator(count)).toBe(false);
		});
	});

	it("Accepts valid status props", () => {
		const { validator } = HomeworksDashboardPanels.props.status;
		const validStati = [null, "completed", "pending", "error"];
		const invalidStatus = "Invalid status";
		expect(validator(invalidStatus)).toBe(false);
		validStati.forEach((status) => {
			expect(validator(status)).toBe(true);
		});
	});

	it("Accepts valid expanded props", () => {
		const { validator } = HomeworksDashboardPanels.props.expanded;
		const validProp1 = 0;
		const validProp2 = 1;
		const invalidPropValues = [-1, undefined, {}, 2];

		expect(validator(validProp1)).toBe(true);
		expect(validator(validProp2)).toBe(true);

		invalidPropValues.forEach((count) => {
			expect(validator(count)).toBe(false);
		});
	});

	it("Should render skeleton loader when the status is pending", () => {
		const wrapper = mount(HomeworksDashboardPanels, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: propsDataLoading,
		});

		expect(wrapper.find(".v-skeleton-loader__text").exists()).toBe(true);
	});

	it("Should disable each panel, if its count is 0", () => {
		const wrapper = mount(HomeworksDashboardPanels, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: propsDataOneEmpty,
		});
		expect(wrapper.find(".v-expansion-panel--disabled").exists()).toBe(true);
	});

	it("Shouldn't render headers, if it's empty", () => {
		const wrapper = mount(HomeworksDashboardPanels, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: propsDataEmpty,
		});

		expect(wrapper.find(".v-expansion-panel-header").exists()).toBe(false);
	});
});
