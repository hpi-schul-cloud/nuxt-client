import FloatingFab from "./FloatingFab";
import BaseIcon from "@components/base/BaseIcon";
import BaseButton from "@components/base/BaseButton";

const topRightFab = {
	components: { FloatingFab },
	template: `<floating-fab position="top-right"/>`,
};

const topLeftFab = {
	components: { FloatingFab },
	template: `<floating-fab position="top-left"/>`,
};

const bottomLeftFab = {
	components: { FloatingFab },
	template: `<floating-fab position="bottom-left"/>`,
};

const bottomRightFab = {
	components: { FloatingFab },
	template: `<floating-fab position="bottom-right"/>`,
};

describe("@components/FloatingFab", () => {
	it(...isValidComponent(FloatingFab));

	it("Renders a default fab", () => {
		const wrapper = mount(FloatingFab);
		expect(wrapper.contains(BaseIcon)).toBe(true);
		expect(wrapper.contains(BaseButton)).toBe(true);
		expect(wrapper.props("icon")).toBe("add");
		expect(wrapper.props("position")).toBe("bottom-right");
		expect(wrapper.attributes().style).toBe("right: 5vw; bottom: 4vh;");
	});

	it("Renders a fab top right", () => {
		const wrapper = mount(topRightFab);
		expect(wrapper.contains(BaseIcon)).toBe(true);
		expect(wrapper.contains(BaseButton)).toBe(true);
		expect(wrapper.attributes().style).toBe("right: 5vw; top: 4vh;");
	});

	it("Renders a fab top left", () => {
		const wrapper = mount(topLeftFab);
		expect(wrapper.contains(BaseIcon)).toBe(true);
		expect(wrapper.contains(BaseButton)).toBe(true);
		expect(wrapper.attributes().style).toBe("left: 5vw; top: 4vh;");
	});

	it("Renders a fab bottom left", () => {
		const wrapper = mount(bottomLeftFab);
		expect(wrapper.contains(BaseIcon)).toBe(true);
		expect(wrapper.contains(BaseButton)).toBe(true);
		expect(wrapper.attributes().style).toBe("left: 5vw; bottom: 4vh;");
	});

	it("Renders a fab bottom right", () => {
		const wrapper = mount(bottomRightFab);
		expect(wrapper.contains(BaseIcon)).toBe(true);
		expect(wrapper.contains(BaseButton)).toBe(true);
		expect(wrapper.attributes().style).toBe("right: 5vw; bottom: 4vh;");
	});
});
