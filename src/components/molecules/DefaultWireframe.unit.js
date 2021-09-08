import { mount } from "@vue/test-utils";
import DefaultWireframe from "./DefaultWireframe.vue";

describe("DefaultWireframe", () => {
	it("shows title", () => {
		const wrapper = mount(DefaultWireframe, {
			...createComponentMocks({}),
			propsData: { headline: "dummy titel" },
		});

		const h1 = wrapper.find("h1");
		expect(h1.text()).toBe("dummy titel");
	});
	it("shows breadcrumps", () => {
		const wrapper = mount(DefaultWireframe, {
			...createComponentMocks({}),
			propsData: {
				headline: "dummy titel",
				breadcrumbs: [
					{
						text: "dummy breadcrump 1",
						href: "/path1/",
					},
					{
						text: "dummy breadcrump 2",
						href: "/path1/path2",
					},
				],
			},
		});

		const breadcrumpItems = wrapper.findAll(".v-breadcrumbs__item").wrappers;
		expect(breadcrumpItems).toHaveLength(2);
		expect(breadcrumpItems[0].text()).toBe("dummy breadcrump 1");
		expect(breadcrumpItems[0].attributes("href")).toBe("/path1/");
		expect(breadcrumpItems[1].text()).toBe("dummy breadcrump 2");
		expect(breadcrumpItems[1].attributes("href")).toBe("/path1/path2");
	});

	it("has full width as default", () => {
		const wrapper = mount(DefaultWireframe, {
			...createComponentMocks({}),
			propsData: { headline: "dummy titel" },
		});

		const contentWrapper = wrapper.find(".main-content");
		expect(contentWrapper.classes("container-full-width")).toBeTrue();
		expect(contentWrapper.classes("container-max-width")).toBeFalse();
	});

	it("has full width", () => {
		const wrapper = mount(DefaultWireframe, {
			...createComponentMocks({}),
			propsData: { headline: "dummy titel", fullWidth: true },
		});

		const contentWrapper = wrapper.find(".main-content");
		expect(contentWrapper.classes("container-full-width")).toBeTrue();
		expect(contentWrapper.classes("container-max-width")).toBeFalse();
	});

	it("has max width", () => {
		const wrapper = mount(DefaultWireframe, {
			...createComponentMocks({}),
			propsData: { headline: "dummy titel", fullWidth: false },
		});

		const contentWrapper = wrapper.find(".main-content");
		expect(contentWrapper.classes("container-full-width")).toBeFalse();
		expect(contentWrapper.classes("container-max-width")).toBeTrue();
	});
});
