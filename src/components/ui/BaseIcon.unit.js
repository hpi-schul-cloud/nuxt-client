import BaseIcon from "./BaseIcon";

describe("@components/BaseIcon", () => {
	it("exports a valid component", () => {
		expect(BaseIcon).toBeAComponent();
	});
	it("renders correct font-awesome icon", () => {
		const iconName = "sync";
		const iconPath = require("@fortawesome/free-solid-svg-icons/faSync")
			.svgPathData;

		const wrapper = mount(BaseIcon, {
			propsData: {
				icon: iconName,
			},
		});
		expect(wrapper.element.innerHTML).toContain(iconPath);
	});
});
