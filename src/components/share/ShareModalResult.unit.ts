import { mount } from "@vue/test-utils";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";
import { VTextField } from "vuetify/lib/components/index.mjs";
import { nextTick } from "vue";

describe("@/components/share/ShareModalResult", () => {
	const setup = (options?: { windowWidth?: number }) => {
		const { windowWidth } = {
			windowWidth: 1280,
			...options,
		};
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: windowWidth,
		});
		const shareUrl = "http://example.com";

		const wrapper = mount(ShareModalResult, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: ["QRCode"],
			},
			props: {
				type: "courses",
				shareUrl,
			},
		});

		return { wrapper, shareUrl };
	};

	it("should render with required props", () => {
		const { wrapper, shareUrl } = setup();

		expect(wrapper.props()).toEqual({ shareUrl: shareUrl, type: "courses" });
	});

	it("should render QR-Code if onShowQrCode is called", async () => {
		const { wrapper, shareUrl } = setup();

		expect(wrapper.findAllComponents({ name: "QRCode" })).toHaveLength(0);

		const actionButton = wrapper.find("[data-testid=qrCodeAction]");
		await actionButton.trigger("click");

		const qrCodeComponent = wrapper.findAllComponents({ name: "QRCode" });
		expect(qrCodeComponent).toHaveLength(1);
		expect(qrCodeComponent[0].props("url")).toStrictEqual(shareUrl);
	});

	it("should focus input when QR code is shown", async () => {
		const { wrapper } = setup();

		const actionButton = wrapper.find("[data-testid=qrCodeAction]");
		await actionButton.trigger("click");
		await nextTick();

		const input = wrapper.findComponent(VTextField).find("input").element;

		expect(document.activeElement).toBe(input);
	});

	it.each`
		displaySize               | windowWidth
		${"small and up (>=600)"} | ${600}
		${"xsmall (<600)"}        | ${599}
	`(
		"should hide all action buttons when QR code is visible for display size $displaySize",
		async ({ windowWidth }) => {
			const { wrapper, shareUrl } = setup({ windowWidth });

			expect(wrapper.findAll("[data-testid*=Action]")).not.toHaveLength(0);

			const actionButton = wrapper.find("[data-testid=qrCodeAction]");
			await actionButton.trigger("click");

			const qrCodeComponents = wrapper.findAllComponents({ name: "QRCode" });

			expect(qrCodeComponents).toHaveLength(1);
			expect(qrCodeComponents[0].props("url")).toStrictEqual(shareUrl);
			expect(wrapper.findAll("[data-testid*=Action]")).toHaveLength(0);
		}
	);

	describe("display sizes greater than or equal to 600", () => {
		const largeDisplaySize = 600;

		it("should not show mobilePlatformAction button", async () => {
			const { wrapper } = setup({ windowWidth: largeDisplaySize });

			const actionButton = wrapper.find("[data-testid=mobilePlatformAction]");
			expect(actionButton.exists()).toBe(false);
		});

		it("should render shareMailAction, copyAction and qrAction buttons", async () => {
			const { wrapper } = setup({ windowWidth: largeDisplaySize });

			const mailActionButton = wrapper.find("[data-testid=shareMailAction]");
			const copyActionButton = wrapper.find("[data-testid=copyAction]");
			const qrCodeActionButton = wrapper.find("[data-testid=qrCodeAction]");

			expect(mailActionButton.exists()).toBe(true);
			expect(copyActionButton.exists()).toBe(true);
			expect(qrCodeActionButton.exists()).toBe(true);
		});

		it("should write to clipboard and emit done when copyAction button is clicked", async () => {
			const mockClipboard = {
				writeText: jest.fn(),
			};
			Object.assign(navigator, { clipboard: mockClipboard });

			const { wrapper, shareUrl } = setup();

			const actionButton = wrapper.find("[data-testid=copyAction]");
			await actionButton.trigger("click");

			expect(mockClipboard.writeText).toHaveBeenCalledWith(shareUrl);
			expect(wrapper.emitted("done")).toHaveLength(1);
			expect(wrapper.emitted("copied")).toHaveLength(1);
		});

		it("should follow href and emit done when shareMailAction button is clicked", async () => {
			const assignSpy = jest.fn();
			Object.defineProperty(window, "location", {
				set: () => createMock<Location>(),
				get: () =>
					createMock<Location>({
						assign: assignSpy,
					}),
			});

			const { wrapper, shareUrl } = setup();

			const actionButton = wrapper.find("[data-testid=shareMailAction]");
			await actionButton.trigger("click");

			const result = assignSpy.mock.calls[0][0];

			expect(result).toContain(encodeURIComponent(shareUrl));
			expect(assignSpy).toHaveBeenCalled();
			expect(wrapper.emitted("done")).toHaveLength(1);
		});
	});

	describe("extra small display sizes", () => {
		const extraSmallDisplaySize = 599;
		it("should show mobilePlatformAction button when display size is less than 600", async () => {
			const { wrapper } = setup({ windowWidth: extraSmallDisplaySize });

			const actionButton = wrapper.find("[data-testid=mobilePlatformAction]");
			expect(actionButton.exists()).toBe(true);
		});

		it("should use native platform share onShareMobilePlatflorm()", async () => {
			const mockSharePromise = jest.fn().mockReturnValue(Promise.resolve());
			Object.assign(navigator, { share: mockSharePromise });

			const { wrapper, shareUrl } = setup({
				windowWidth: extraSmallDisplaySize,
			});

			const actionButton = wrapper.find("[data-testid=mobilePlatformAction]");
			await actionButton.trigger("click");

			expect(mockSharePromise).toHaveBeenCalledWith({ url: shareUrl });
			expect(wrapper.emitted("done")).toHaveLength(1);
		});

		it("should not render shareMailAction and copyAction buttons", async () => {
			const { wrapper } = setup({ windowWidth: extraSmallDisplaySize });

			const mailActionButton = wrapper.find("[data-testid=shareMailAction]");
			const copyActionButton = wrapper.find("[data-testid=copyAction]");

			expect(mailActionButton.exists()).toBe(false);
			expect(copyActionButton.exists()).toBe(false);
		});

		it("should render qrCodeAction button", async () => {
			const { wrapper } = setup({ windowWidth: extraSmallDisplaySize });

			const qrCodeActionButton = wrapper.find("[data-testid=qrCodeAction]");
			expect(qrCodeActionButton.exists()).toBe(true);
		});
	});
});
