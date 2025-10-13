import SkipLink from "./SkipLink.vue";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

vi.mock("vue-router", () => ({
	useRoute: () => ({ hash: "#" }),
}));

describe("@ui-skip-link", () => {
	const setup = () => {
		const wrapper = mount(SkipLink, {
			global: {
				plugins: [createTestingI18n()],
			},
		});

		return { wrapper };
	};

	it("should render its skip link", async () => {
		const { wrapper } = setup();

		expect(wrapper.find("[data-testid=skip-link]").exists()).toBe(true);
	});

	it("should skip to main content area", async () => {
		const { wrapper } = setup();

		const mainContentElement = window.document.createElement("div");
		mainContentElement.id = "main-content";
		window.document.body.appendChild(mainContentElement);

		await wrapper.findComponent({ name: "SkipLink" }).trigger("keydown.enter");

		expect(window.document.activeElement).toBe(mainContentElement);
	});
});
