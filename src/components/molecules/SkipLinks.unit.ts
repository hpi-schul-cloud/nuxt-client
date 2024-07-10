import { createTestingI18n } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import SkipLinks from "./SkipLinks.vue";

jest.mock("vue-router", () => ({
	useRoute: () => ({ hash: "#" }),
}));

describe("@/components/molecules/SkipLinks", () => {
	describe(" element skip-link", () => {
		const setup = () => {
			const wrapper = mount(SkipLinks, {
				global: {
					plugins: [createTestingI18n()],
				},
			});

			return { wrapper };
		};

		it("Should render its skip link", async () => {
			const { wrapper } = setup();

			expect(wrapper.find("#skip-link").exists()).toBe(true);
		});

		it("Should have tabindex 0", async () => {
			const { wrapper } = setup();

			expect(wrapper.attributes("tabindex")).toBe("0");
		});
	});
	describe("skipToContent", () => {
		const setup = () => {
			const wrapper = mount(SkipLinks, {
				global: {
					plugins: [createTestingI18n()],
				},
			});

			const mainContent = window.document.createElement("div");
			mainContent.id = "main-content";
			const linkElement = window.document.createElement("a");
			linkElement.setAttribute("tabindex", "0");
			mainContent.appendChild(linkElement);
			window.document.body.appendChild(mainContent);

			return { wrapper, linkElement };
		};
		it("should skip to the link element in main content", async () => {
			const { wrapper, linkElement } = setup();

			await wrapper.find("#skip-link").trigger("click");

			await wrapper.vm.$nextTick();

			expect(window.document.activeElement).toBe(linkElement);
		});
	});
});
