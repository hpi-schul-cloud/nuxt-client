import ContentElementBar from "./ContentElementBar.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

type Props = { icon?: string; hasGreyBackground?: boolean };

type Slots = {
	description?: string;
	display?: string;
	title?: string;
	element?: string;
	menu?: string;
	subtitle?: string;
	logo?: string;
	statusInfo?: string;
};

describe("ContentElementBar", () => {
	const setup = (props: Props, slots?: Slots) => {
		const { icon, hasGreyBackground } = props;

		const wrapper = mount(ContentElementBar, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
			slots,
		});

		return {
			wrapper,
			icon,
			hasGreyBackground,
		};
	};

	describe("when icon prop is defined", () => {
		it("should render icon next to the title", () => {
			const { wrapper } = setup(
				{
					icon: "mdi-test-icon",
				},
				{
					title: "my title",
				}
			);

			const iconElement = wrapper.find(".content-element-title .v-icon");

			expect(iconElement.exists()).toBe(true);
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
			const title = "test title slot";
			const { wrapper } = setup(
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
			const { wrapper } = setup({});

			const toolbar = wrapper.find("v-toolbar-title-stub");

			expect(toolbar.exists()).toBe(false);
		});
	});

	describe("when element slot is defined", () => {
		it("should render element slot", () => {
			const elementSlot = "test element slot";
			const { wrapper } = setup(
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
			const { wrapper } = setup(
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
			const { wrapper } = setup(
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
			const { wrapper } = setup({});

			const subtitle = wrapper.find("div.pt-0.pb-4.px-4");

			expect(subtitle.exists()).toBe(false);
		});
	});

	describe("when hasGreyBackground prop is true", () => {
		it("should render surface-light background", () => {
			const { wrapper } = setup(
				{
					hasGreyBackground: true,
				},
				{
					title: "i have a dream",
				}
			);

			const divWithBackgroundClass = wrapper.find("div.bg-surface-light");

			expect(divWithBackgroundClass.exists()).toBe(true);
		});
	});

	describe("when hasGreyBackground prop is false", () => {
		it("should not render surface-light background", () => {
			const { wrapper } = setup({});

			const divWithBackgroundClass = wrapper.find("div.bg-surface-light");

			expect(divWithBackgroundClass.exists()).toBe(false);
		});
	});

	describe("when logo slot is defined", () => {
		it("should render logo slot next to the title", () => {
			const logo = "test logo slot";
			const { wrapper } = setup(
				{},
				{
					logo,
					title: "my title",
				}
			);

			const titleElement = wrapper.find(".content-element-title");

			expect(titleElement.text()).toContain(logo);
		});
	});

	describe("when statusInfo slot is defined", () => {
		it("should render statusInfo slot", () => {
			const statusInfo = "test statusInfo slot";
			const { wrapper } = setup(
				{},
				{
					title: "title slot",
					statusInfo,
				}
			);

			const statusInfoElement = wrapper.find("[data-testid='status-info-slot']");

			expect(statusInfoElement.text()).toBe(statusInfo);
		});
	});

	describe("when statusInfo slot is defined", () => {
		it("should render statusInfo slot", () => {
			const { wrapper } = setup(
				{},
				{
					title: "title slot",
				}
			);

			const statusInfoElement = wrapper.find("[data-testid='status-info-slot']");

			expect(statusInfoElement.exists()).toBe(false);
		});
	});
});
