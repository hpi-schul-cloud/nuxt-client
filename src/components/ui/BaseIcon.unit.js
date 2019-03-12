import BaseIcon from "./BaseIcon";
import MaterialHomeIcon from "material-icons-svg/icons/baseline-home-24px.svg";
import CustomClockIcon from "/src/assets/icons/clock.svg";
import { backgroundImages } from "~/node_modules/polished/lib/index";

describe("@components/BaseIcon", () => {
	it(...isValidComponent(BaseIcon));

	//TODO!
	it("renders correct material icon", () => {
		const iconName = "home";

		const wrapper = mount(BaseIcon, {
			propsData: {
				icon: iconName,
			},
		});
		expect(wrapper.html()).toContain(MaterialHomeIcon);
	});

	it("renders custom icon from assets", () => {
		const iconName = "clock";
		const wrapper = mount(BaseIcon, {
			propsData: {
				source: "custom",
				icon: iconName,
			},
		});
		console.log(CustomClockIcon);
		expect(wrapper.html()).toContain(CustomClockIcon);
	});

	it("render nothing as image for non existant icon", () => {
		const iconName = "wrong";

		const wrapper = mount(BaseIcon, {
			propsData: {
				icon: iconName,
			},
		});
		expect(wrapper.html()).toContain("background-image: url()");
	});
});
