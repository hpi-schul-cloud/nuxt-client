import FloatingFab from "./FloatingFab";
import BaseIcon from "@components/base/BaseIcon";
import BaseButton from "@components/base/BaseButton";

describe("@components/FloatingFab", () => {
	it(...isValidComponent(FloatingFab));

	it("Renders a default fab", () => {
		const wrapper = mount(FloatingFab);
		expect(wrapper.contains(BaseIcon)).toBe(true);
		expect(wrapper.contains(BaseButton)).toBe(true);
		expect(wrapper.props("icon")).toBe("add");
		expect(wrapper.props("position")).toBe("bottom-right");
	});
});
