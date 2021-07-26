import Vuetify from "vuetify";
import vCustomDoublePanels from "./vCustomDoublePanels";

describe("@components/molecules/vCustomDoublePanels", () => {
	const propsData = {
		panelOneCount: 1,
		panelTwoCount: 13,
		panelOneTitle: "Panel one title",
		panelTwoTitle: "Panel two title",
		status: "completed",
		isEmpty: false,
		expandedDefault: 0,
	};

	const propsDataLoading = {
		panelOneCount: 1,
		panelTwoCount: 13,
		panelOneTitle: "Panel one title",
		panelTwoTitle: "Panel two title",
		status: "pending",
		isEmpty: false,
		expandedDefault: 0,
	};

	const propsDataPanelOneEmpty = {
		panelOneCount: 0,
		panelTwoCount: 12,
		panelOneTitle: "Panel one title",
		panelTwoTitle: "Panel two title",
		status: "completed",
		isEmpty: false,
		expandedDefault: 1,
	};

	const propsDataPanelTwoEmpty = {
		panelOneCount: 12,
		panelTwoCount: 0,
		panelOneTitle: "Panel one title",
		panelTwoTitle: "Panel two title",
		status: "completed",
		isEmpty: false,
		expandedDefault: 0,
	};

	const propsDataEmpty = {
		panelOneCount: 0,
		panelTwoCount: 0,
		panelOneTitle: "Panel one title",
		panelTwoTitle: "Panel two title",
		status: "completed",
		isEmpty: true,
		expandedDefault: 0,
	};
	const slot = "<div class='slot' />";
	const slot2 = "<div class='slot2' />";

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(vCustomDoublePanels));

	it("Should render its slots", () => {
		const wrapper = mount(vCustomDoublePanels, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData,
			slots: {
				panelOne: slot,
				panelTwo: slot,
			},
		});

		expect(wrapper.find(".slot").exists()).toBe(true);
	});

	it("Accepts valid panel count props", () => {
		const { validator } = vCustomDoublePanels.props.panelOneCount;
		const validCount = 1234;
		const invalidCounts = [-1, undefined, {}];

		expect(validator(validCount)).toBe(true);

		invalidCounts.forEach((count) => {
			expect(validator(count)).toBe(false);
		});
	});

	it("Accepts valid status props", () => {
		const { validator } = vCustomDoublePanels.props.status;
		const validStati = [null, "completed", "pending", "error"];
		const invalidStatus = "Invalid status";
		expect(validator(invalidStatus)).toBe(false);
		validStati.forEach((status) => {
			expect(validator(status)).toBe(true);
		});
	});

	it("Accepts valid expanded props", () => {
		const { validator } = vCustomDoublePanels.props.expandedDefault;
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
		const wrapper = mount(vCustomDoublePanels, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: propsDataLoading,
		});

		expect(wrapper.find(".v-skeleton-loader__text").exists()).toBe(true);
	});

	it("Should render only panel 1 disabled, if panel 2 has data", () => {
		const wrapper = mount(vCustomDoublePanels, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: propsDataPanelOneEmpty,
		});
		const expansionPanels = wrapper.findAll(".v-expansion-panel");

		expect(expansionPanels.exists()).toBe(true);
		expect(expansionPanels).toHaveLength(2);
		expect(expansionPanels.at(0).classes()).toContain(
			"v-expansion-panel--disabled"
		);
		expect(expansionPanels.at(1).classes()).not.toContain(
			"v-expansion-panel--disabled"
		);
	});

	it("Should render only panel 2 disabled, if panel 1 has data", () => {
		const wrapper = mount(vCustomDoublePanels, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: propsDataPanelTwoEmpty,
		});
		const expansionPanels = wrapper.findAll(".v-expansion-panel");

		expect(expansionPanels.exists()).toBe(true);
		expect(expansionPanels).toHaveLength(2);
		expect(expansionPanels.at(0).classes()).not.toContain(
			"v-expansion-panel--disabled"
		);
		expect(expansionPanels.at(1).classes()).toContain(
			"v-expansion-panel--disabled"
		);
	});

	it("Shouldn't render headers, if it's empty", () => {
		const wrapper = mount(vCustomDoublePanels, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: propsDataEmpty,
		});

		expect(wrapper.find(".v-expansion-panel-header").exists()).toBe(false);
	});

	it("Should trigger toggle on panel header click", async () => {
		const mockMethod = jest.spyOn(vCustomDoublePanels.methods, "toggle");
		const wrapper = mount(vCustomDoublePanels, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: propsData,
		});

		await wrapper.find("button").trigger("click");
		expect(mockMethod).toHaveBeenCalled();
	});

	it("'toggle()' should collapse expanded panel and expand the collapsed one", async () => {
		const wrapper = mount(vCustomDoublePanels, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData,
			slots: {
				panelOne: slot,
				panelTwo: slot2,
			},
		});

		const expansionDivs = wrapper.findAll("div[aria-expanded]");
		expect(expansionDivs.at(0).attributes("aria-expanded")).toBe("true");
		expect(expansionDivs.at(1).attributes("aria-expanded")).toBe("false");

		await wrapper.vm.toggle();
		await wrapper.vm.$nextTick();

		expect(expansionDivs.at(0).attributes("aria-expanded")).toBe("false");
		expect(expansionDivs.at(1).attributes("aria-expanded")).toBe("true");
	});
});
