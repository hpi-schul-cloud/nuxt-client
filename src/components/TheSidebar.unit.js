import TheSidebar from "./TheSidebar";

describe("@components/TheSidebar", () => {
	it(...isValidComponent(TheSidebar));

	it("Render with empty routes", () => {
		const wrapper = shallowMount(TheSidebar);
		expect(wrapper.find("ul").isEmpty()).toBe(true);
	});

	it("Render with one route", () => {
		const testRoutes = [
			{
				title: "test",
				to: "home",
			},
		];
		const wrapper = shallowMount(TheSidebar, {
			propsData: {
				routes: testRoutes,
			},
		});
		expect(wrapper.findAll("li").length).toBe(testRoutes.length);
		expect(wrapper.find("base-icon-stub").exists()).toBe(false);
	});

	it("Render with more routes mixing to and href", () => {
		const testRoutes = [
			{
				title: "test",
				to: "home",
				active: true,
			},
			{
				title: "can't go to bing",
				href: "https://www.bing.com",
				active: false,
				icon: "trash",
			},
			{
				title: "test active false",
				to: "away",
				active: false,
			},
			{
				title: "google",
				href: "https://www.google.com",
				active: true,
			},
		];
		const wrapper = shallowMount(TheSidebar, {
			propsData: {
				routes: testRoutes,
			},
		});
		expect(wrapper.findAll("li").length).toBe(testRoutes.length);
		expect(wrapper.findAll("base-icon-stub").length).toBe(1);
		expect(
			wrapper
				.findAll("base-link-stub")
				.at(0)
				.text()
		).toBe(testRoutes[0].title);
	});
});
