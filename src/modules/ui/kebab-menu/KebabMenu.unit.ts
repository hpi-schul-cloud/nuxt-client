import KebabMenu from "./KebabMenu.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("@ui-kebab-menu", () => {
	const setup = (options = {}) => {
		const wrapper = mount(KebabMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should render", () => {
			const wrapper = setup();

			expect(wrapper.exists()).toBe(true);
		});
	});

	describe("when component contains menu items", () => {
		describe("when menu contains nothing", () => {
			it("should be hidden", () => {
				const wrapper = setup();

				expect(wrapper.isVisible()).toBe(false);
			});
		});

		describe("when menu contains comment", () => {
			it("should be visible", () => {
				const commentNode = document.createComment("My comments");
				const wrapper = setup({ slots: { default: commentNode } });

				expect(wrapper.isVisible()).toBe(true);
			});
		});

		describe("when menu contains html fragment", () => {
			describe("when fragment is empty", () => {
				it("should be visible", () => {
					const fragmentNode = document.createDocumentFragment();
					const wrapper = setup({ slots: { default: fragmentNode } });

					expect(wrapper.isVisible()).toBe(true);
				});
			});

			describe("when fragment contains text node", () => {
				it("should be visible", () => {
					const fragmentNode = document.createDocumentFragment();
					const divNode = document.createElement("div");
					divNode.textContent = "Hello World";
					fragmentNode.appendChild(divNode);
					const wrapper = setup({ slots: { default: fragmentNode } });

					expect(wrapper.isVisible()).toBe(true);
				});
			});
		});
	});
});
