import DefaultWireframe from "../templates/DefaultWireframe.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ComponentMountingOptions, mount } from "@vue/test-utils";

describe("DefaultWireframe", () => {
	const setup = (options: ComponentMountingOptions<typeof DefaultWireframe> = {}) => {
		const wrapper = mount(DefaultWireframe, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
		});

		return wrapper;
	};

	it("shows title", () => {
		const wrapper = setup({
			props: { maxWidth: "full", headline: "dummy title" },
		});

		const h1 = wrapper.find("h1");
		expect(h1.text()).toBe("dummy title");
	});

	it("shows breadcrumbs", () => {
		const wrapper = setup({
			props: {
				fullWidth: true,
				headline: "dummy title",
				maxWidth: "full",
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
		const wrapper = setup({
			props: { maxWidth: "full", headline: "dummy title" },
		});

		const contentWrapper = wrapper.find(".main-content");
		expect(contentWrapper.classes("container-full-width")).toBeTruthy();
		expect(contentWrapper.classes("container-short-width")).toBeFalsy();
	});

	it("has small width", () => {
		const wrapper = setup({
			props: { maxWidth: "short", headline: "dummy title" },
		});

		const contentWrapper = wrapper.find(".main-content");
		expect(contentWrapper.classes("container-full-width")).toBeFalsy();
		expect(contentWrapper.classes("container-short-width")).toBeTruthy();
	});

	it("has nativ width", () => {
		const wrapper = setup({
			props: { maxWidth: "nativ", headline: "dummy title" },
		});

		const contentWrapper = wrapper.find(".main-content");
		expect(contentWrapper.classes("container-full-width")).toBeFalsy();
		expect(contentWrapper.classes("container-short-width")).toBeFalsy();
	});

	it("displays content in slot", () => {
		const wrapper = setup({
			props: { maxWidth: "full", headline: "dummy title" },
			slots: {
				default: ["<p>some stuff</p>", "text"],
			},
		});

		const contentWrapper = wrapper.find(".main-content");
		expect(contentWrapper.text()).toBe("some stufftext");
	});

	it("displays headline in slot", () => {
		const wrapper = setup({
			props: { headline: "property title", fullWidth: false, maxWidth: "full" },
			slots: {
				header: ["<h1>slot title</h1>", "<div class='menu'>a custom menu or searchbar</div>"],
			},
		});

		const h1 = wrapper.find("h1");
		expect(h1.text()).toBe("slot title");
		const menu = wrapper.find(".menu");
		expect(menu.text()).toBe("a custom menu or searchbar");
	});

	it("should emit 'fab:clicked' after click the fab button", async () => {
		const wrapper = setup({
			props: { maxWidth: "nativ" },
		});
		await wrapper.setProps({
			fabItems: {
				icon: "mdi-close",
				title: "dummy title",
			},
		});

		const fab = wrapper.findComponent({ name: "speed-dial-menu" });
		await fab.vm.$emit("fab:clicked");

		expect(wrapper.emitted("fab:clicked")).toHaveLength(1);
	});
});
