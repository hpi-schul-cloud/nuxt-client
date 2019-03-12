import BaseIcon from "./BaseIcon";
import MaterialHomeIcon from "material-icons-svg/icons/baseline-home-24px.svg";

describe("@components/BaseIcon", () => {
	it(...isValidComponent(BaseIcon));

	it("renders correct font-awesome icon", () => {
		// TODO only works with faTrash
		const iconName = "trash";
		const iconPath = require("@fortawesome/free-solid-svg-icons/faTrash")
			.svgPathData;

		const wrapper = mount(BaseIcon, {
			propsData: {
				icon: iconName,
			},
		});
		expect(wrapper.element.innerHTML).toContain(iconPath);
	});
});
