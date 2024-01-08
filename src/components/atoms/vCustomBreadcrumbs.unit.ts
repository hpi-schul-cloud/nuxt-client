import { mount } from "@vue/test-utils";
import vCustomBreadcrumbs from "./vCustomBreadcrumbs.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe("@/components/atoms/vCustomBreadcrumbs", () => {
	const setup = () => {
		const wrapper = mount(vCustomBreadcrumbs, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				breadcrumbs: [{ title: "Cursos actuales", to: "/rooms-overview" }],
			},
		});

		return { wrapper };
	};

	it("should display title and has link", () => {
		const { wrapper } = setup();

		const breadcrumbsItem = wrapper.findComponent({
			name: "v-breadcrumbs-item",
		});

		expect(breadcrumbsItem.props().to).toStrictEqual("/rooms-overview");
		expect(breadcrumbsItem.element.innerHTML).toContain("Cursos actuales");
	});
});
