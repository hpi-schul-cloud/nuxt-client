import { mount } from "@vue/test-utils";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";

describe("@/components/share/ShareModalResult", () => {
	const setup = () => {
		const shareUrl = "http://example.com";

		const wrapper = mount(ShareModalResult, {
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

	it("should hide buttons if qrCode is visible", async () => {
		const { wrapper, shareUrl } = setup();

		expect(wrapper.findAll("[data-testid*=Action]")).not.toHaveLength(0);

		const actionButton = wrapper.find("[data-testid=qrCodeAction]");
		await actionButton.trigger("click");

		const qrCodeComponents = wrapper.findAllComponents({ name: "QRCode" });

		expect(qrCodeComponents).toHaveLength(1);
		expect(qrCodeComponents[0].props("url")).toStrictEqual(shareUrl);
		expect(wrapper.findAll("[data-testid*=Action]")).toHaveLength(0);
	});

	it("should write to clipboard and emit done onCopy()", async () => {
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

	it("should follow href and emit done onMailShareUrl()", async () => {
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

	it("should use native platform share onShareMobilePlatflorm()", async () => {
		const mockSharePromise = jest.fn().mockReturnValue(Promise.resolve());
		Object.assign(navigator, { share: mockSharePromise });

		const { wrapper, shareUrl } = setup();

		const actionButton = wrapper.find("[data-testid=mobilePlatformAction]");
		await actionButton.trigger("click");

		expect(mockSharePromise).toHaveBeenCalledWith({ url: shareUrl });
		expect(wrapper.emitted("done")).toHaveLength(1);
	});
});
