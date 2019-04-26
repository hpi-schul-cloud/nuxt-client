import TheFooter from "./TheFooter";

describe("@components/TheFooter", () => {
	it(...isValidComponent(TheFooter));

	const $theme = { name: "test" };
	it("check that all links are returned in the footer", () => {
		const wrapper = shallowMount(TheFooter, {
			mocks: {
				$theme,
			},
		});
		expect(wrapper.findAll("base-link-stub").length).toBe(8);
		expect(wrapper.find("span").text()).toBe(
			"© " + new Date().getFullYear() + " " + $theme.name
		);
	});
});
