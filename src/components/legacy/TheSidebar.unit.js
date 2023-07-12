import TheSidebar from "./TheSidebar";
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
				title: "common.labels.room",
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
		expect(wrapper.find("v-icon").exists()).toBe(true);
	});

	it("Render with more routes mixing to and href", () => {
		const router = new VueRouter([{ path: "home" }]);

		const testRoutes = [
			{
				title: "common.labels.status",
				to: "home",
				active: true,
				icon: "test",
				testId: "testId",
				activeForUrls: ["home"],
			},
			{
				title: "common.labels.search",
				href: "https://www.bing.com",
				active: false,
				icon: "test",
				testId: "testId",
				activeForUrls: [],
			},
			{
				title: "common.labels.title",
				to: "away",
				active: false,
				icon: "away",
				testId: "testId",
				activeForUrls: ["away"],
			},
			{
				title: "common.labels.teacher",
				href: "https://www.google.com",
				active: true,
				icon: "test",
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
		expect(wrapper.findAll("v-icon")).toHaveLength(4);
		expect(wrapper.findAll(".side-bar-title").at(0).text()).toBe("Status");
	});
});
