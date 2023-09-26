import createComponentMocks from "@@/tests/test-utils/componentMocks";
import Card from "@ui-card";
import { shallowMount } from "@vue/test-utils";

describe("Card", () => {
	const setup = (props: {
		title?: string;
		subtitle?: string;
		icon?: string;
		shortenTitle?: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(Card, {
			propsData: props,
			...createComponentMocks({}),
		});

		return {
			...props,
			wrapper,
		};
	};

	describe("when title is passed", () => {
		it("should render title", () => {
			const { title, wrapper } = setup({ title: "title" });

			expect(wrapper.html()).toContain(title);
		});
	});

	describe("when subtitle is passed", () => {
		it("should render subtitle", () => {
			const { subtitle, wrapper } = setup({ subtitle: "subtitle" });

			expect(wrapper.html()).toContain(subtitle);
		});
	});

	describe("when icon is passed", () => {
		it("should render icon", () => {
			const { icon, wrapper } = setup({ icon: "icon" });

			expect(wrapper.html()).toContain(icon);
		});
	});

	describe("when no title or icon is passed", () => {
		it("should not render v-card-title", () => {
			const { wrapper } = setup({});

			expect(wrapper.html()).not.toContain("v-card-title");
		});
	});

	describe("when no subtitle is passed", () => {
		it("should not render v-card-subtitle", () => {
			const { wrapper } = setup({});

			expect(wrapper.html()).not.toContain("v-card-subtitle");
		});
	});

	describe("when shortenTitle is true", () => {
		it("should render span with margin right class", () => {
			const { wrapper } = setup({
				title: "title",
				shortenTitle: true,
			});
			console.log(wrapper.html());

			expect(wrapper.find("span").classes().includes("mr-10")).toBe(true);
		});
	});

	describe("when shortenTitle is false", () => {
		it("should not render span with margin right class", () => {
			const { wrapper } = setup({
				title: "title",
				shortenTitle: false,
			});

			expect(wrapper.find("span").classes().includes("mr-10")).toBe(false);
		});
	});
});
