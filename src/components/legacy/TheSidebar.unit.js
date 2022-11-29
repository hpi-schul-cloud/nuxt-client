import TheSidebar from "./TheSidebar";
// import { render } from "@/testing-library/vue";
import { createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("@/components/legacy/TheSidebar", () => {
	it("Render with empty routes", () => {
		const router = new VueRouter([{ path: "home" }]);

		const wrapper = shallowMount(TheSidebar, {
			localVue,
			router,
		});

		expect(wrapper.find('[data-testid="routesListTest"]')).toBeDefined();
	});

	it("Render with one route", async () => {
		const router = new VueRouter([{ path: "home" }]);

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
			propsData: {
				routes: testRoutes,
			},
			localVue,
			router,
		});
		expect(wrapper.findAll("li")).toHaveLength(testRoutes.length);
		expect(wrapper.find("base-icon-stub").exists()).toBe(true);
	});

	it("Render with more routes mixing to and href", () => {
		const router = new VueRouter([{ path: "home" }]);

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
			propsData: {
				routes: testRoutes,
			},
			localVue,
			router,
		});
		expect(wrapper.findAll("li")).toHaveLength(testRoutes.length);
		expect(wrapper.findAll("base-icon-stub")).toHaveLength(4);
		expect(wrapper.findAll("base-link-stub").at(1).text()).toBe(
			testRoutes[0].title
		);
	});
});
