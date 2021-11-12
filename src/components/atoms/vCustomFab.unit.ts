import { mount } from "@vue/test-utils";
import { mdiPlus, mdiAccountPlus, mdiAccountMultipleMinus } from "@mdi/js";
import vCustomFab from "./vCustomFab.vue";
import { vuetify } from "@@/nuxt.config";

declare var createComponentMocks: Function;

const simpleExtendedFab = {
	actions: [],
	icon: mdiPlus,
	title: "User",
	href: "/",
};

const multipleActionsExtendedFab = {
	actions: [
		{
			label: "Add User",
			icon: mdiAccountPlus,
			to: "/",
		},
		{
			label: "Delete User",
			icon: mdiAccountMultipleMinus,
			to: "/",
		},
	],
	icon: mdiPlus,
	title: "User",
};

const simpleFab = {
	actions: [],
	icon: mdiPlus,
};

const getWrapper = (props: object, options?: object) => {
	return mount(vCustomFab, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/atoms/vCustomFab", () => {
	describe("simple fab", () => {
		it("should not display title", () => {
			const wrapper = getWrapper({ ...simpleFab });

			expect(wrapper.text()).toStrictEqual("");
		});

		it("should display icon", () => {
			const wrapper = getWrapper({ ...simpleFab });
			const icon = wrapper.find(".v-icon");

			expect(icon.exists()).toBe(true);
		});

		it("should have default size ", () => {
			const wrapper = getWrapper({ ...simpleFab });

			expect(wrapper.classes()).toContain("v-size--default");
		});
	});

	describe("extended fab", () => {
		it("should display title", () => {
			const wrapper = getWrapper({ ...simpleExtendedFab });

			expect(wrapper.text()).toStrictEqual("User");
		});

		it("should display icon", () => {
			const wrapper = getWrapper({ ...simpleExtendedFab });
			const icon = wrapper.find(".v-icon");

			expect(icon.exists()).toBe(true);
		});

		it("should have small size with extended width", () => {
			const wrapper = getWrapper({ ...simpleExtendedFab });

			expect(wrapper.classes()).toContain("v-size--small");
			expect(wrapper.classes()).toContain("extended-fab");
		});

		it("should be positioned top right on desktop", () => {
			const wrapper = getWrapper({ ...simpleExtendedFab });

			expect(wrapper.classes()).toContain("v-btn--right");
			expect(wrapper.classes()).toContain("v-btn--top");
		});

		it("should be positioned bottom right on mobile", () => {
			Object.defineProperty(window, "innerWidth", {
				writable: true,
				configurable: true,
				value: 375,
			});
			window.dispatchEvent(new Event("resize"));

			const wrapper = getWrapper({ ...simpleExtendedFab });

			expect(wrapper.classes()).toContain("v-btn--bottom");
			expect(wrapper.classes()).toContain("v-btn--right");
		});

		it("should become link when href is given", () => {
			const wrapper = getWrapper({ ...simpleExtendedFab });

			const link = wrapper.find("a");

			expect(link.exists()).toBe(true);
			expect(link.attributes().href).toBe("/");
		});

		// apparantly testing scroll behviour is not possible with jest

		// it("extended fab should collapse on scroll down", () => {});
		// it("extended fab should extend on scroll up", () => {});
	});

	describe("extended fab with speed dial menu", () => {
		it("should become speed dial component when multiple actions are given", () => {
			const wrapper = getWrapper({ ...multipleActionsExtendedFab });

			expect(wrapper.classes()).toContain("v-speed-dial");
		});

		it("should set speed dial menu direction to bottom on desktop", () => {
			Object.defineProperty(window, "innerWidth", {
				writable: true,
				configurable: true,
				value: 1024,
			});
			window.dispatchEvent(new Event("resize"));
			const wrapper = getWrapper({ ...multipleActionsExtendedFab });

			expect(wrapper.classes()).toContain("v-speed-dial--direction-bottom");
		});

		it("should set speed dial menu direction to top on mobile", () => {
			Object.defineProperty(window, "innerWidth", {
				writable: true,
				configurable: true,
				value: 375,
			});
			window.dispatchEvent(new Event("resize"));

			const wrapper = getWrapper({ ...multipleActionsExtendedFab });

			expect(wrapper.classes()).toContain("v-speed-dial--direction-top");
		});

	/* 	it("should open speed dial menu on click", async () => {
			const wrapper = getWrapper({ ...multipleActionsExtendedFab }, { attachTo: document.body});
			const fab = wrapper.find("#fab");
			await fab.trigger("click");

			expect(fab.emitted('click')).toHaveLength(1)
			expect(fab.classes()).toContain("v-size--default");

			const actions = wrapper.find(".v-speed-dial__list");
			const action = wrapper.findComponent({ name: 'speed-dial-action' })
			expect(actions.exists()).toBe(true);
			expect(action.exists()).toBe(true);
		}); */

		//it("should collapse when speed dial menu is opened", () => {});
	});
});
