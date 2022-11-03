import { mount } from "@vue/test-utils";
import DefaultWireframe from "../templates/DefaultWireframe.vue";

describe("DefaultWireframe", () => {
	it("shows title", () => {
		const wrapper = mount(DefaultWireframe, {
			...createComponentMocks({}),
			propsData: { fullWidth: true, headline: "dummy titel" },
		});

		const h1 = wrapper.find("h1");
		expect(h1.text()).toBe("dummy titel");
	});
	it("shows breadcrumbs", () => {
		const wrapper = mount(DefaultWireframe, {
			...createComponentMocks({}),
			propsData: {
				fullWidth: true,
				headline: "dummy titel",
				breadcrumbs: [
					{
						text: "dummy breadcrumb 1",
						href: "/path1/",
					},
					{
						text: "dummy breadcrumb 2",
						href: "/path1/path2",
					},
				],
			},
		});

		const breadcrumbItems = wrapper.findAll(".v-breadcrumbs__item").wrappers;
		expect(breadcrumbItems).toHaveLength(2);
		expect(breadcrumbItems[0].text()).toBe("dummy breadcrumb 1");
		expect(breadcrumbItems[0].attributes("href")).toBe("/path1/");
		expect(breadcrumbItems[1].text()).toBe("dummy breadcrumb 2");
		expect(breadcrumbItems[1].attributes("href")).toBe("/path1/path2");
	});

	it("has full width", () => {
		const wrapper = mount(DefaultWireframe, {
			...createComponentMocks({}),
			propsData: { headline: "dummy titel", fullWidth: true },
		});

		const contentWrapper = wrapper.find(".main-content");
		expect(contentWrapper.classes("container-full-width")).toBeTruthy();
		expect(contentWrapper.classes("container-max-width")).toBeFalsy();
	});

	it("has small width", () => {
		const wrapper = mount(DefaultWireframe, {
			...createComponentMocks({}),
			propsData: { headline: "dummy titel", fullWidth: false },
		});

		const contentWrapper = wrapper.find(".main-content");
		expect(contentWrapper.classes("container-full-width")).toBeFalsy();
		expect(contentWrapper.classes("container-max-width")).toBeTruthy();
	});

	it("displays content in slot", () => {
		const wrapper = mount(DefaultWireframe, {
			...createComponentMocks({}),
			propsData: { headline: "dummy titel", fullWidth: false },
			slots: {
				default: ["<p>some stuff</p>", "text"],
			},
		});
		const contentWrapper = wrapper.find(".main-content");
		expect(contentWrapper.text()).toBe("some stufftext");
	});

	it("displays headline in slot", () => {
		const wrapper = mount(DefaultWireframe, {
			...createComponentMocks({}),
			propsData: { headline: "property title", fullWidth: false },
			slots: {
				header: [
					"<h1>slot titel</h1>",
					"<div class='menu'>a custom menu or searchbar</div>",
				],
			},
		});
		const h1 = wrapper.find("h1");
		expect(h1.text()).toBe("slot titel");
		const menu = wrapper.find(".menu");
		expect(menu.text()).toBe("a custom menu or searchbar");
	});
});
