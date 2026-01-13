import Breadcrumbs from "./Breadcrumbs.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

describe("Breadcrumbs", () => {
	const setup = (breadcrumbs?: Array<{ title: string; to: string }>) => {
		const wrapper = mount(Breadcrumbs, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				breadcrumbs: breadcrumbs ?? [{ title: "Cursos actuales", to: "/rooms/courses-overview" }],
			},
		});
		return { wrapper };
	};

	it("should display title and has link", () => {
		const { wrapper } = setup();

		const breadcrumbsItem = wrapper.findComponent({
			name: "v-breadcrumbs-item",
		});

		expect(breadcrumbsItem.props().to).toStrictEqual("/rooms/courses-overview");
		expect(breadcrumbsItem.element.innerHTML).toContain("Cursos actuales");
	});

	describe("when breadcrumb's title is too long and the screen size is xs", () => {
		it("should crop the title and apply .breadcrumbs-item-max-width class", async () => {
			const longTitle = "This is a very long breadcrumb title that should be cropped";
			const { wrapper } = setup([{ title: longTitle, to: "/some/path" }]);

			Object.defineProperty(window, "innerWidth", { writable: true, value: 500 });
			window.dispatchEvent(new Event("resize"));
			await nextTick();

			const breadcrumbsItem = wrapper.findComponent({
				name: "v-breadcrumbs-item",
			});

			expect(breadcrumbsItem.props().to).toStrictEqual("/some/path");
			expect(breadcrumbsItem.classes()).toContain("breadcrumbs-item-max-width");
		});
	});
});
