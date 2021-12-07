import { mount } from "@vue/test-utils";
import vCustomBreadcrumbs from "./vCustomBreadcrumbs.vue";

declare var createComponentMocks: Function;

const getWrapper = (props: object, options?: object) => {
	return mount(vCustomBreadcrumbs, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/atoms/vCustomBreadcrumbs", () => {
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
