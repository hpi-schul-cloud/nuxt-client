import { createTestingI18n } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import SkipLinks from "./SkipLinks.vue";

jest.mock("vue-router", () => ({
	useRoute: () => ({ hash: "#" }),
}));

describe("@/components/molecules/SkipLinks", () => {
	const setup = () => {
		const wrapper = mount(SkipLinks, {
			global: {
				plugins: [createTestingI18n()],
			},
		});
		const mainContent = window.document.createElement("div");
		mainContent.id = "main-content";
		const tabIndexElement = window.document.createElement("div");
		tabIndexElement.tabIndex = 0;
		mainContent.appendChild(tabIndexElement);
		window.document.body.appendChild(mainContent);

		return { wrapper, tabIndexElement };
	};

	it("Should render its skip link", async () => {
		const { wrapper } = setup();

		expect(wrapper.find("#skip-link").exists()).toBe(true);
	});

	it("Should have tabindex 0", async () => {
		const { wrapper } = setup();

		expect(wrapper.attributes("tabindex")).toBe("0");
	});
	it("should skip to the main content", async () => {
		const { wrapper, tabIndexElement } = setup();

		await wrapper.find("#skip-link").trigger("click");

		await wrapper.vm.$nextTick();

		expect(window.document.activeElement).toBe(tabIndexElement);
	});
});
