import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions } from "@vue/test-utils";
import ShareModalResult from "@/components/share-course/ShareModalResult.vue";
import BaseQrCode from "@/components/base/BaseQrCode.vue";
import Vue from "vue";

describe("@components/share/ShareModalResult", () => {
	const getWrapper = (attrs = {}) => {
		const wrapper = mount(ShareModalResult as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				i18n: { t: (key: string) => key },
			},
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
	});

	it("should not render without required props", () => {
		console.error = jest.fn();

		getWrapper();

		expect(console.error).toBeCalledWith(
			expect.stringContaining('Missing required prop: "shareUrl"')
		);
	});

	it("should render with required props", () => {
		const shareUrl = "http://example.com";
		const type = "course";
		const wrapper = getWrapper({ propsData: { shareUrl, type } });
		expect(wrapper.props("shareUrl")).toStrictEqual(shareUrl);
	});

	it("should render QR-Code if onShowQrCode is called", async () => {
		const shareUrl = "http://example.com";
		const type = "course";
		const wrapper = getWrapper({ propsData: { shareUrl, type } });

		expect(wrapper.findAllComponents(BaseQrCode)).toHaveLength(0);

		const actionButton = wrapper.find("[data-testid=qrCodeAction]");
		await actionButton.trigger("click");

		const qrCodeComponent = wrapper.findAllComponents(BaseQrCode);
		expect(qrCodeComponent).toHaveLength(1);
		expect(qrCodeComponent.at(0).props("url")).toStrictEqual(shareUrl);
	});

	it("should hide buttons if qrCode is visible", async () => {
		const shareUrl = "http://example.com";
		const type = "course";
		const wrapper = getWrapper({ propsData: { shareUrl, type } });

		expect(wrapper.findAll("[data-testid*=Action]")).not.toHaveLength(0);

		const actionButton = wrapper.find("[data-testid=qrCodeAction]");
		await actionButton.trigger("click");

		const qrCodeComponents = wrapper.findAllComponents(BaseQrCode);

		expect(qrCodeComponents).toHaveLength(1);
		expect(qrCodeComponents.at(0).props("url")).toStrictEqual(shareUrl);
		expect(wrapper.findAll("[data-testid*=Action]")).toHaveLength(0);
	});

	it("should write to clipboard and emit done onCopy()", async () => {
		const mockClipboard = {
			writeText: jest.fn(),
		};
		Object.assign(navigator, { clipboard: mockClipboard });

		const shareUrl = "http://example.com";
		const type = "course";
		const wrapper = getWrapper({ propsData: { shareUrl, type } });

		const actionButton = wrapper.find("[data-testid=copyAction]");
		await actionButton.trigger("click");

		expect(mockClipboard.writeText).toHaveBeenCalledWith(shareUrl);
		expect(wrapper.emitted("done")).toHaveLength(1);
		expect(wrapper.emitted("copied")).toHaveLength(1);
	});

	it("should follow href and emit done onMailShareUrl()", async () => {
		const mockLocation = {
			assign: jest.fn(),
		};
		Object.assign(window.location, mockLocation);

		const shareUrl = "http://example.com";
		const type = "course";
		const wrapper = getWrapper({ propsData: { shareUrl, type } });

		const actionButton = wrapper.find("[data-testid=shareMailAction]");
		await actionButton.trigger("click");

		const result: string = mockLocation.assign.mock.calls[0][0];

		expect(result).toContain(encodeURIComponent(shareUrl));
		expect(mockLocation.assign).toHaveBeenCalled();
		expect(wrapper.emitted("done")).toHaveLength(1);
	});

	it("should use native platform share onShareMobilePlatflorm()", async () => {
		const mockSharePromise = jest.fn().mockReturnValue(Promise.resolve());
		Object.assign(navigator, { share: mockSharePromise });

		const shareUrl = "http://example.com";
		const type = "course";
		const wrapper = getWrapper({ propsData: { shareUrl, type } });

		const actionButton = wrapper.find("[data-testid=mobilePlatformAction]");
		await actionButton.trigger("click");

		expect(mockSharePromise).toHaveBeenCalledWith({ url: shareUrl });
		expect(wrapper.emitted("done")).toHaveLength(1);
	});
});
