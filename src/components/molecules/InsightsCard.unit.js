import createComponentMocks from "@@/tests/test-utils/componentMocks";
import InsightsCard from "./InsightsCard";

describe("@components/molecules/InsightsCard", () => {
	const getWrapper = (attrs) => {
		return mount(InsightsCard, {
			...createComponentMocks({
				i18n: true,
			}),
			...attrs,
		});
	};

	it(...isValidComponent(InsightsCard));

	it("renders title and data props if both exist", () => {
		const testTitle = "TestTitle";
		const testData = { current: "5", last: "2" };

		const wrapper = getWrapper({
			propsData: {
				title: testTitle,
				data: testData,
			},
		});
		expect(wrapper.props("title")).toBe(testTitle);
		expect(wrapper.props("data")).toBe(testData);
	});

	it("renders content slot", () => {
		const wrapper = getWrapper({
			slots: {
				content: '<div class="test-class"></div>',
			},
		});
		expect(wrapper.find(".test-class").exists()).toBe(true);
	});

	it("renders footer slot", () => {
		const wrapper = getWrapper({
			slots: {
				footer: '<div class="test-class"></div>',
			},
		});
		expect(wrapper.find(".test-class").exists()).toBe(true);
	});

	it("renders chart-card class if !data props", () => {
		const wrapper = getWrapper(InsightsCard);
		expect(wrapper.classes("chart-card")).toBe(true);
	});

	it("does not render chart-card class if data props", () => {
		const wrapper = getWrapper({
			propsData: {
				data: { current: "5", last: "2" },
			},
		});
		expect(wrapper.classes("chart-card")).toBe(false);
	});

	it("renders insights-card__content-diff class if data.current prop", () => {
		const wrapper = getWrapper({
			propsData: {
				data: { current: "5", last: "2" },
			},
		});
		expect(wrapper.find(".insights-card__content-diff").exists()).toBe(true);
	});

	it("does not render insights-card__content-diff class if !data.current prop", () => {
		const wrapper = getWrapper({
			propsData: {
				data: { last: "2" },
			},
		});
		expect(wrapper.find(".insights-card__content-diff").exists()).toBe(false);
	});

	it("renders arrow-down class if data.current < data.last", () => {
		const wrapper = getWrapper({
			propsData: {
				data: { current: 1, last: 2 },
			},
		});
		expect(wrapper.find(".arrow-down").exists()).toBe(true);
	});

	it("renders arrow-up class if data.current > data.last", () => {
		const wrapper = getWrapper({
			propsData: {
				data: { current: 2, last: 1 },
			},
		});
		expect(wrapper.find(".arrow-up").exists()).toBe(true);
	});

	it("renders dau over mau % if !data.current", () => {
		const { element } = getWrapper({
			propsData: {
				data: { last: "12" },
			},
		});
		expect(element.innerHTML).toContain("%");
	});

	it("does not render dau over mau % if data.current", () => {
		const { element } = getWrapper({
			propsData: {
				data: { current: "1", last: "12" },
			},
		});
		expect(element.innerHTML).not.toContain("%");
	});
});
