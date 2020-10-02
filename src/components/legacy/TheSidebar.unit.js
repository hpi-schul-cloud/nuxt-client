import TheSidebar from "./TheSidebar";
import { render } from "@testing-library/vue";

describe("@components/legacy/TheSidebar", () => {
	it(...isValidComponent(TheSidebar));

	it("Render with empty routes", () => {
		const { getByTestId } = render(TheSidebar);
		expect(getByTestId("routesListTest")).toBeEmptyDOMElement();
	});

	it("Render with one route", () => {
		const testRoutes = [
			{
				title: "test",
				to: "home",
				icon: "test",
			},
		];
		const wrapper = shallowMount(TheSidebar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				routes: testRoutes,
			},
		});
		expect(wrapper.findAll("li")).toHaveLength(testRoutes.length);
		expect(wrapper.find("base-icon-stub").exists()).toBe(true);
	});

	it("Render with more routes mixing to and href", () => {
		const testRoutes = [
			{
				title: "test",
				to: "home",
				active: true,
				icon: "test",
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
				icon: "away",
			},
			{
				title: "google",
				href: "https://www.google.com",
				active: true,
				icon: "google",
			},
		];
		const wrapper = shallowMount(TheSidebar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				routes: testRoutes,
			},
		});
		expect(wrapper.findAll("li")).toHaveLength(testRoutes.length);
		expect(wrapper.findAll("base-icon-stub")).toHaveLength(4);
		expect(wrapper.findAll("base-link-stub").at(0).text()).toBe(
			testRoutes[0].title
		);
	});
});
