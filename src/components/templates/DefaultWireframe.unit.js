import { mount } from "@vue/test-utils";
import DefaultWireframe from "../templates/DefaultWireframe.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe("DefaultWireframe", () => {
	it("shows title", () => {
		const wrapper = mount(DefaultWireframe, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { fullWidth: true, headline: "dummy title" },
		});

		const h1 = wrapper.find("h1");
		expect(h1.text()).toBe("dummy title");
	});
	it("shows breadcrumbs", () => {
		const wrapper = mount(DefaultWireframe, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				fullWidth: true,
				headline: "dummy title",
				breadcrumbs: [
					{
						title: "dummy breadcrumb 1",
						href: "/path1/",
					},
					{
						title: "dummy breadcrumb 2",
						href: "/path1/path2",
					},
				],
			},
		});

		const breadcrumbItems = wrapper.findAll(".v-breadcrumbs-item > a");
		expect(breadcrumbItems).toHaveLength(2);
		expect(breadcrumbItems[0].text()).toBe("dummy breadcrumb 1");
		expect(breadcrumbItems[0].attributes("href")).toBe("/path1/");
		expect(breadcrumbItems[1].text()).toBe("dummy breadcrumb 2");
		expect(breadcrumbItems[1].attributes("href")).toBe("/path1/path2");
	});

	it("has full width", () => {
		const wrapper = mount(DefaultWireframe, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { headline: "dummy title", fullWidth: true },
		});

		const contentWrapper = wrapper.find(".main-content");
		expect(contentWrapper.classes("container-full-width")).toBeTruthy();
		expect(contentWrapper.classes("container-max-width")).toBeFalsy();
	});

	it("has small width", () => {
		const wrapper = mount(DefaultWireframe, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { headline: "dummy title", fullWidth: false },
		});

		const contentWrapper = wrapper.find(".main-content");
		expect(contentWrapper.classes("container-full-width")).toBeFalsy();
		expect(contentWrapper.classes("container-max-width")).toBeTruthy();
	});

	it("displays content in slot", () => {
		const wrapper = mount(DefaultWireframe, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { headline: "dummy title", fullWidth: false },
			slots: {
				default: ["<p>some stuff</p>", "text"],
			},
		});
		const contentWrapper = wrapper.find(".main-content");
		expect(contentWrapper.text()).toBe("some stufftext");
	});

	it("displays headline in slot", () => {
		const wrapper = mount(DefaultWireframe, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { headline: "property title", fullWidth: false },
			slots: {
				header: [
					"<h1>slot title</h1>",
					"<div class='menu'>a custom menu or searchbar</div>",
				],
			},
		});
		const h1 = wrapper.find("h1");
		expect(h1.text()).toBe("slot title");
		const menu = wrapper.find(".menu");
		expect(menu.text()).toBe("a custom menu or searchbar");
	});
});
