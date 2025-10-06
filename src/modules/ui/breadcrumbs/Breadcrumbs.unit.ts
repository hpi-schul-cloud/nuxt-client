import Breadcrumbs from "./Breadcrumbs.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("@/components/atoms/Breadcrumbs", () => {
	const setup = () => {
		const wrapper = mount(Breadcrumbs, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				breadcrumbs: [{ title: "Cursos actuales", to: "/rooms/courses-overview" }],
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
});
