import ResponsiveButton from "./ResponsiveButton";
import BaseButton from "./BaseButton";

// const defaultButton = {
// 	components: { BaseButton },
// 	template: `<base-button>Default</base-button>`,
// };

describe("@components/ResponsiveButton", () => {
	it(...isValidComponent(ResponsiveButton));

	// it("Generates a default button", () => {
	// 	const wrapper = mount(defaultButton);
	// 	expect(wrapper.find("button").exists()).toBe(true);
	// });
});
