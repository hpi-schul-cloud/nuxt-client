import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import PageShare from "./PageShare.vue";
import { createMock } from "@golevelup/ts-vitest";

describe("@ui-layout/PageShare", () => {
	const setup = (attrs = {}) => {
		const windowMock = createMock<Window>({
			document: {
				write: vi.fn().mockImplementation(() => "<img></img>"),
			},
			print: vi.fn(),
			close: vi.fn(),
		});

		Object.defineProperty(window, "open", {
			configurable: true,
			value: vi.fn().mockReturnValue(windowMock),
		});

		const wrapper = mount(PageShare, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				url: "url",
			},
			...attrs,
		});

		return { wrapper, windowMock };
	};

	describe("with available languages", () => {
		it("should render qr code ", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent({ name: "QRCode" }).exists()).toBe(true);
		});

		it("should open print menu with QR-Code", async () => {
			const { wrapper, windowMock } = setup();
			const printButton = wrapper.findComponent("[data-testid=qr-code-print]");
			await printButton.trigger("click");

			expect(window.open).toHaveBeenCalled();
			expect(windowMock.document.write).toHaveBeenCalled();
			expect(windowMock.print).toHaveBeenCalled();
			expect(windowMock.close).toHaveBeenCalled();
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
