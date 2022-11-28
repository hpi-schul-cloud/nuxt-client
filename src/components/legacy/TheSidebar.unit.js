import TheSidebar from "./TheSidebar";
// import { render } from "@/testing-library/vue";

const $route = {
	path: "home",
};

describe("@/components/legacy/TheSidebar", () => {
	// it("Render with empty routes", () => {
	// 	const { getByTestId } = render(TheSidebar, { routes: [{ path: "home" }] });
	// 	expect(getByTestId("routesListTest")).toBeEmptyDOMElement();
	// });

	it("Render with one route", () => {
		const testRoutes = [
			{
				title: "test",
				to: "home",
				icon: "test",
				testId: "testId",
				activeForUrls: ["home"],
			},
		];
		const wrapper = shallowMount(TheSidebar, {
			...createComponentMocks({ i18n: true, $route }),
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
				testId: "testId",
				activeForUrls: ["home"],
			},
			{
				title: "can't go to bing",
				href: "https://www.bing.com",
				active: false,
				icon: "trash",
				testId: "testId",
				activeForUrls: [],
			},
			{
				title: "test active false",
				to: "away",
				active: false,
				icon: "away",
				testId: "testId",
				activeForUrls: ["away"],
			},
			{
				title: "google",
				href: "https://www.google.com",
				active: true,
				icon: "google",
				testId: "testId",
				activeForUrls: [],
			},
		];
		const wrapper = shallowMount(TheSidebar, {
			...createComponentMocks({ i18n: true, $route }),
			propsData: {
				routes: testRoutes,
			},
		});
		expect(wrapper.findAll("li")).toHaveLength(testRoutes.length);
		expect(wrapper.findAll("base-icon-stub")).toHaveLength(4);
		expect(wrapper.findAll("base-link-stub").at(1).text()).toBe(
			testRoutes[0].title
		);
	});
});
