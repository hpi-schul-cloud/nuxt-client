import { shallowMount } from "@vue/test-utils";
import TheSidebar from "./TheSidebar.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { reactive } from "vue";
import { SidebarItemList } from "@/utils/sidebar-base-items";
jest.mock("vue-router");

const useRouteMock = <jest.Mock<Partial<RouteLocationNormalizedLoaded>>>(
	useRoute
);

describe("@/components/legacy/TheSidebar", () => {
	const setup = (testRoutes: SidebarItemList) => {
		useRouteMock.mockImplementation(() => reactive({ path: "home" }));

		const wrapper = shallowMount(TheSidebar, {
			props: {
				routes: testRoutes,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	it("Render with empty routes", () => {
		const { wrapper } = setup([]);

		expect(wrapper.find('[data-testid="routesListTest"]')).toBeDefined();
	});

	it("Render with one route", async () => {
		const testRoutes: SidebarItemList = [
			{
				title: "common.labels.room",
				to: "home",
				icon: "test",
				testId: "testId",
				activeForUrls: ["home"],
			},
		];

		const { wrapper } = setup(testRoutes);

		expect(wrapper.findAll("li")).toHaveLength(testRoutes.length);
		expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(true);
	});

	it("Render with more routes mixing to and href", () => {
		const testRoutes: SidebarItemList = [
			{
				title: "common.labels.status",
				to: "home",
				icon: "test",
				testId: "testId",
				activeForUrls: ["home"],
			},
			{
				title: "common.labels.search",
				href: "https://www.bing.com",
				icon: "test",
				testId: "testId",
				activeForUrls: ["home"],
			},
			{
				title: "common.labels.title",
				to: "away",
				icon: "away",
				testId: "testId",
				activeForUrls: ["home"],
			},
			{
				title: "common.labels.teacher",
				href: "https://www.google.com",
				icon: "test",
				testId: "testId",
				activeForUrls: ["home"],
			},
		];

		const { wrapper } = setup(testRoutes);

		expect(wrapper.findAll("li")).toHaveLength(testRoutes.length);
		expect(wrapper.findAllComponents({ name: "v-icon" })).toHaveLength(4);
		expect(wrapper.findAll(".side-bar-title").at(0)?.text()).toBe(
			"common.labels.status"
		);
	});
});
