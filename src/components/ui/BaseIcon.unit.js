import BaseIcon from "./BaseIcon";

describe("@components/BaseIcon", () => {
	it(...isValidComponent(BaseIcon));

	/*
	Issue:
		The icon gets resolved asynchronous after the vue created() hook.
		Vue Isn't waiting for the iconpath to resolve, before rendering cause it doesn't support async created().
		This causes the tests to run, before vue has finished resolving and rendering the icon and therefore they fail.

	Note from vue-jest docs:
		vue-jest currently does not support all the features of vue-loader. [...]
		Some webpack-specific features such as code-splitting are not supported either.

	https://vue-test-utils.vuejs.org/guides/testing-single-file-components-with-jest.html#processing-single-file-components-in-jest
	*/

	/*
	it("renders correct material icon", (done) => {
		const iconName = "home";

		const wrapper = mount(BaseIcon, {
			propsData: {
				icon: iconName,
				source: "material",
			},
		});
		expect(wrapper.html()).toContain("baseline-home-24px.svg");
	});

	it("renders custom icon from assets", () => {
		const iconName = "clock";
		const wrapper = mount(BaseIcon, {
			propsData: {
				source: "custom",
				icon: iconName,
			},
		});
		expect(wrapper.html()).toContain("clock.svg");
	});

	it("render an empty box as image for non existant icon", () => {
		const iconName = "wrongIconName";

		const wrapper = mount(BaseIcon, {
			propsData: {
				icon: iconName,
			},
		});
		expect(wrapper.html()).toContain("background-image: url()");
	});
	*/
});
