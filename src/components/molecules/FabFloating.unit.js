import FabFloating from "./FabFloating";

const topRightFab = {
	components: { FabFloating },
	template: `<fab-floating position="top-right" />`,
};

const topLeftFab = {
	components: { FabFloating },
	template: `<fab-floating position="top-left" />`,
};

const bottomLeftFab = {
	components: { FabFloating },
	template: `<fab-floating position="bottom-left" />`,
};

const bottomRightFab = {
	components: { FabFloating },
	template: `<fab-floating position="bottom-right" />`,
};

describe("@components/FabFloating", () => {
	it(...isValidComponent(FabFloating));

	it("Renders a default fab", () => {
		const wrapper = mount(FabFloating, {
			propsData: {
				ariaLabel: "Some Label",
			},
		});
		expect(wrapper.attributes().style).toBe("right: 5vw; bottom: 4vh;");
	});

	it("Renders a fab top right", () => {
		const wrapper = mount(topRightFab);
		expect(wrapper.attributes().style).toBe("right: 5vw; top: 4vh;");
	});

	it("Renders a fab top left", () => {
		const wrapper = mount(topLeftFab);
		expect(wrapper.attributes().style).toBe("left: 5vw; top: 4vh;");
	});

	it("Renders a fab bottom left", () => {
		const wrapper = mount(bottomLeftFab);
		expect(wrapper.attributes().style).toBe("left: 5vw; bottom: 4vh;");
	});

	it("Renders a fab bottom right", () => {
		const wrapper = mount(bottomRightFab);
		expect(wrapper.attributes().style).toBe("right: 5vw; bottom: 4vh;");
	});
});
