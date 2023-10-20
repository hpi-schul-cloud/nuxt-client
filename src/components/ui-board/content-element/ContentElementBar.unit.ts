import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import ContentElementBar from "./ContentElementBar.vue";

describe("ContentElementBar", () => {
	const setup = (props: {
		icon?: string;
		hasGreyBackground?: boolean;
		title?: string;
		element?: string;
		menu?: string;
		subtitle?: string;
	}) => {
		document.body.setAttribute("data-app", "true");

		const { icon, hasGreyBackground, title, menu, subtitle, element } = props;
		const propsData = {
			icon,
			hasGreyBackground,
		};
		const slots = {
			title: title ?? "",
			element: element ?? "",
			menu: menu ?? "",
			subtitle: subtitle ?? "",
		};
		const wrapper = shallowMount(ContentElementBar, {
			propsData,
			slots,
			...createComponentMocks({}),
		});

		return {
			wrapper,
			icon,
			hasGreyBackground,
			title,
			element,
			menu,
			subtitle,
		};
	};

	describe("when icon prop is defined", () => {
		it("should render icon", () => {
			const { wrapper, icon } = setup({
				icon: "mdi-test-icon",
			});

			const iconProp = wrapper
				.find("contentelementtitleicon-stub")
				.attributes("icon");

			expect(iconProp).toBe(icon);
		});
	});

	describe("when icon prop is undefined", () => {
		it("should not render icon", () => {
			const { wrapper } = setup({});

			const iconElement = wrapper.find("contentelementtitleicon-stub").exists();

			expect(iconElement).toBe(false);
		});
	});

	describe("when title slot is defined", () => {
		it("should render title slot", () => {
			const { wrapper, title } = setup({
				title: "test title slot",
			});

			const titleElement = wrapper.text();

			expect(titleElement).toBe(title);
		});
	});

	describe("when title slot is undefined", () => {
		it("should not render toolbar-title", () => {
			const { wrapper } = setup({});

			const toolbar = wrapper.find("v-toolbar-title-stub");

			expect(toolbar.exists()).toBe(false);
		});
	});

	describe("when element slot is defined", () => {
		it("should render element slot", () => {
			const { wrapper, element: elementSlot } = setup({
				element: "test element slot",
			});

			const element = wrapper.text();

			expect(element).toBe(elementSlot);
		});
	});

	describe("when menu slot is defined", () => {
		it("should render menu slot", () => {
			const { wrapper, menu } = setup({
				menu: "test menu slot",
			});

			const menuElement = wrapper.text();

			expect(menuElement).toBe(menu);
		});
	});

	describe("when subtitle slot is defined", () => {
		it("should render subtitle slot", () => {
			const { wrapper, subtitle } = setup({
				subtitle: "test subtitle slot",
			});

			const subtitleElement = wrapper.text();

			expect(subtitleElement).toBe(subtitle);
		});
	});

	describe("when subtitle slot is undefined", () => {
		it("should not render subtitle div", () => {
			const { wrapper } = setup({});

			const subtitle = wrapper.find("div.pt-0.pb-4.px-4");

			expect(subtitle.exists()).toBe(false);
		});
	});

	describe("when hasGreyBackground prop is true", () => {
		it("should render grey background", () => {
			const { wrapper } = setup({
				hasGreyBackground: true,
			});

			const divWithBackgroundClass = wrapper.find("div.grey.lighten-4");

			expect(divWithBackgroundClass.exists()).toBe(true);
		});
	});

	describe("when hasGreyBackground prop is false", () => {
		it("should not render grey background", () => {
			const { wrapper } = setup({});

			const divWithBackgroundClass = wrapper.find("div.grey.lighten-4");

			expect(divWithBackgroundClass.exists()).toBe(false);
		});
	});
});
