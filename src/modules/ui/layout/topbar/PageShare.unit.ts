import PageShare from "./PageShare.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { beforeAll, vi } from "vitest";

describe("@ui-layout/PageShare", () => {
	beforeAll(() => {
		Object.defineProperty(window, "location", {
			value: { href: "url" },
			writable: true,
		});
	});

	const setup = () => {
		const wrapper = mount(PageShare, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	describe("with available languages", () => {
		it("should render qr code ", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent({ name: "QRCode" }).exists()).toBe(true);
		});

		it("should copy link to clipboard", async () => {
			Object.defineProperty(navigator, "clipboard", {
				value: {
					writeText: vi.fn(),
				},
			});

			const { wrapper } = setup();
			const copyButton = wrapper.findComponent("[data-testid=qr-code-copy]");
			await copyButton.trigger("click");

			expect(navigator.clipboard.writeText).toHaveBeenCalledWith("url");
		});
	});
});
