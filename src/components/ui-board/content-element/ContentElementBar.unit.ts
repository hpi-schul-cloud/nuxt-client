import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { VCardTitle, VIcon } from "vuetify/lib/components/index.mjs";
import ContentElementBar from "./ContentElementBar.vue";

type Slots = {
	description?: string;
	display?: string;
	title?: string;
	element?: string;
	menu?: string;
	subtitle?: string;
};

describe("ContentElementBar", () => {
	const setup = (
		props: {
			icon?: string;
			hasGreyBackground?: boolean;
		},
		slots?: Slots
	) => {
		document.body.setAttribute("data-app", "true");

		const wrapper = mount(ContentElementBar, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
			slots,
		});

		return wrapper;
	};

	describe("when icon prop is defined", () => {
		it("should render icon", () => {
			const icon = "mdi-test-icon";
			const wrapper = setup({
				icon: "mdi-test-icon",
			});

			const iconComponent = wrapper.findComponent(VIcon);

			expect(iconComponent.html()).toContain(icon);
		});
	});

	describe("when icon prop is undefined", () => {
		it("should not render icon", () => {
			const wrapper = setup({});

			const iconElement = wrapper.find("contentelementtitleicon-stub").exists();

			expect(iconElement).toBe(false);
		});
	});

	describe("when title slot is defined", () => {
		it("should render title slot", () => {
			const title = "test title slot";
			const wrapper = setup(
				{},
				{
					title,
				}
			);

			const titleElement = wrapper.text();

			expect(titleElement).toBe(title);
		});
	});

	describe("when title slot is undefined", () => {
		it("should not render toolbar-title", () => {
			const wrapper = setup({});

			const toolbar = wrapper.find("v-toolbar-title-stub");

			expect(toolbar.exists()).toBe(false);
		});
	});

	describe("when element slot is defined", () => {
		it("should render element slot", () => {
			const elementSlot = "test element slot";
			const wrapper = setup(
				{},
				{
					element: elementSlot,
				}
			);

			const element = wrapper.text();

			expect(element).toBe(elementSlot);
		});
	});

	describe("when menu slot is defined", () => {
		it("should render menu slot", () => {
			const menu = "test menu slot";
			const wrapper = setup(
				{},
				{
					menu,
				}
			);

			const menuElement = wrapper.text();

			expect(menuElement).toBe(menu);
		});
	});

	describe("when subtitle slot is defined", () => {
		it("should render subtitle slot", () => {
			const subtitle = "test subtitle slot";
			const wrapper = setup(
				{},
				{
					subtitle,
				}
			);

			const subtitleElement = wrapper.text();

			expect(subtitleElement).toBe(subtitle);
		});
	});

	describe("when subtitle slot is undefined", () => {
		it("should not render subtitle div", () => {
			const wrapper = setup({});

			const subtitle = wrapper.find("div.pt-0.pb-4.px-4");

			expect(subtitle.exists()).toBe(false);
		});
	});

	describe("when hasGreyBackground prop is true", () => {
		it("should render grey background", () => {
			const wrapper = setup(
				{ hasGreyBackground: true },
				{
					title: "i have a dream",
				}
			);

			const divWithBackgroundClass = wrapper.find("div.bg-grey-lighten-4");

			expect(divWithBackgroundClass.exists()).toBe(true);
		});
	});

	describe("when hasGreyBackground prop is false", () => {
		it("should not render grey background", () => {
			const wrapper = setup({});

			const divWithBackgroundClass = wrapper.find("div.bg-grey-lighten-4");

			expect(divWithBackgroundClass.exists()).toBe(false);
		});
	});

	describe("when menu slot and display slot are defined", () => {
		it("should render menu slot in display", () => {
			const menu = "test menu slot content";
			const wrapper = setup(
				{},
				{
					display: "display content",
					menu,
				}
			);

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
			const wrapper = setup(
				{},
				{
					title: "title content",
					menu,
				}
			);

			const title = wrapper.findComponent(VCardTitle);

			expect(title.exists()).toBe(true);
			expect(title.text()).toEqual(expect.stringContaining(menu));
		});
	});
});
