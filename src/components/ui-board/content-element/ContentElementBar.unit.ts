import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, mount } from "@vue/test-utils";
import Vue from "vue";
import ContentElementBar from "./ContentElementBar.vue";

describe("ContentElementBar", () => {
	const setup = (props: {
		icon?: string;
		hasGreyBackground?: boolean;
		description?: string;
		display?: string;
		title?: string;
		element?: string;
		menu?: string;
		subtitle?: string;
	}) => {
		document.body.setAttribute("data-app", "true");

		const {
			icon,
			hasGreyBackground,
			description,
			display,
			title,
			menu,
			subtitle,
			element,
		} = props;
		const propsData = {
			icon,
			hasGreyBackground,
		};
		const slots = {
			title: title ?? "",
			element: element ?? "",
			menu: menu ?? "",
			subtitle: subtitle ?? "",
			description: description ?? "",
			display: display ?? "",
		};
		const wrapper = mount(ContentElementBar as MountOptions<Vue>, {
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

			const iconComponent = wrapper.find({ name: "v-icon" });

			expect(iconComponent.classes()).toContain(icon);
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
				title: "i have a dream",
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

	describe("when menu slot and display slot are defined", () => {
		it("should render menu slot in display", () => {
			const menu = "test menu slot content";
			const { wrapper } = setup({
				display: "display content",
				menu,
			});

			const contentElementDisplay = wrapper.find(".content-element-display");

			expect(contentElementDisplay.exists()).toBe(true);
			expect(contentElementDisplay.text()).toEqual(
				expect.stringContaining(menu)
			);
		});
	});

	describe("when menu slot is defined but not display slot", () => {
		it("should render menu slot in title", () => {
			const menu = "test menu slot content";
			const { wrapper } = setup({
				title: "title content",
				menu,
			});

			const title = wrapper.find({ name: "v-card-title" });

			expect(title.exists()).toBe(true);
			expect(title.text()).toEqual(expect.stringContaining(menu));
		});
	});
});
