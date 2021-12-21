import { mount } from "@vue/test-utils";
import { mdiPlus, mdiAccountPlus, mdiAccountMultipleMinus } from "@mdi/js";
import vCustomFab from "./vCustomFab.vue";
import { vuetify } from "@@/nuxt.config";

declare var createComponentMocks: Function;

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
	describe("when fab is simple (icon only)", () => {
		const simpleFab = {
			actions: [],
			icon: mdiPlus,
		};

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
		it("should have aria label", () => {
			const wrapper = getWrapper({
				...simpleFab,
				ariaLabel: "dummy aria label",
			});

			const attributes = wrapper.element.attributes;

			expect(wrapper.element.getAttribute("aria-label")).toContain(
				"dummy aria label"
			);
		});
	});

	describe("when fab is extended", () => {
		const simpleExtendedFab = {
			actions: [],
			icon: mdiPlus,
			title: "User",
			href: "/",
		};

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
			Object.defineProperty(window, "innerWidth", {
				writable: true,
				configurable: true,
				value: 1264,
			});
			window.dispatchEvent(new Event("resize"));

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

		// apparantly testing scroll behaviour is not possible with jest

		// it("extended fab should collapse on scroll down", () => {});
		// it("extended fab should extend on scroll up", () => {});
	});

	describe("when fab is extended with speed dial menu", () => {
		const multipleActionsExtendedFab = {
			actions: [
				{
					label: "Add User",
					icon: mdiAccountPlus,
					to: "/",
					ariaLabel: "Custom Aria Label",
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

		it("should become speed dial component when multiple actions are given", () => {
			const wrapper = getWrapper({ ...multipleActionsExtendedFab });

			expect(wrapper.classes()).toContain("v-speed-dial");
		});

		it("should set speed dial menu direction to bottom on desktop", () => {
			Object.defineProperty(window, "innerWidth", {
				writable: true,
				configurable: true,
				value: 1264,
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

		it("should have aria-labels", async () => {
			const wrapper = getWrapper({ ...multipleActionsExtendedFab });
			wrapper.setData({ isSpeedDialExpanded: true });
			await wrapper.vm.$nextTick();
			const actionButtons = wrapper.findAll(".fab-action").wrappers;

			expect(actionButtons[0].element.getAttribute("aria-label")).toContain(
				"Custom Aria Label"
			);
			expect(actionButtons[1].element.getAttribute("aria-label")).toContain(
				"Delete User"
			);
		});

		it.todo("should open speed dial menu on click");

		it.todo("should collapse when speed dial menu is opened");

		it.todo("should show overlay when speed dial menu is opened");
	});
});
