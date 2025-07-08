import CollaboraDisplay from "./CollaboraDisplay.vue";

describe("CollaboraDisplay", () => {
	const setup = () => {
		const wrapper = mount(CollaboraDisplay);

		return { wrapper };
	};

	it("should render CollaboraDisplay", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should render svg", () => {
		const { wrapper } = setup();

		const svg = wrapper.find("svg");
		expect(svg.exists()).toBe(true);
		expect(svg.html()).toContain("svg content to be defined");
	});
});
