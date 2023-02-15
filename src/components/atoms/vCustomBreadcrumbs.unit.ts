import { mount, MountOptions } from "@vue/test-utils";
import vCustomBreadcrumbs from "./vCustomBreadcrumbs.vue";
import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";

const getWrapper = (props: object, options?: object) => {
	return mount(vCustomBreadcrumbs as MountOptions<Vue>, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@/components/atoms/vCustomBreadcrumbs", () => {
	const prop = {
		breadcrumbs: [{ text: "Cursos actuales", to: "/rooms-overview" }],
	};

	it("should display title and has link", () => {
		const wrapper = getWrapper({ ...prop });

		const breadcrumbsItem = wrapper.find(".breadcrumbs-item") as any;

		expect(breadcrumbsItem.vm.to).toStrictEqual("/rooms-overview");
		expect(breadcrumbsItem.element.innerHTML).toContain("Cursos actuales");
	});
});
