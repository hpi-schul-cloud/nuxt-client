import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import ShareModalResult from "@components/share-modal/ShareModalResult.vue";
import BaseQrCode from "@basecomponents/BaseQrCode.vue";

describe("@components/share-modal/ShareModalResult", () => {
	const getWrapper = (attrs = {}) => {
		const wrapper = mount(ShareModalResult, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("i18n", { t: (key: string) => key });
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
		try {
			getWrapper();
		} catch (e) {
			expect(e.message).toContain('Missing required prop: "shareUrl"');
			return;
		}
		fail("No error on required props");
	});

	it("should render with required props", () => {
		const shareUrl = "http://example.com";
		try {
			const wrapper = getWrapper({ propsData: { shareUrl } });
			expect(wrapper.props("shareUrl")).toStrictEqual(shareUrl);
		} catch (e) {
			fail(e.message);
			return;
		}
	});

	it("should render QR-Code if onShowQrCode is called", async () => {
		const shareUrl = "http://example.com";
		const wrapper = getWrapper({ propsData: { shareUrl } });

		expect(wrapper.findAllComponents(BaseQrCode)).toHaveLength(0);

		const qrCodeActionButton = wrapper.find("[data-testid=qrCodeAction]");
		qrCodeActionButton.vm.$emit("click");
		await wrapper.vm.$nextTick();

		const qrCodeComponents = wrapper.findAllComponents(BaseQrCode);

		expect(qrCodeComponents).toHaveLength(1);
		expect(qrCodeComponents.at(0).props("url")).toStrictEqual(shareUrl);
	});

	it("should hide buttons if qrCode is visible", async () => {
		const shareUrl = "http://example.com";
		const wrapper = getWrapper({ propsData: { shareUrl } });

		await wrapper.vm.$nextTick();

		expect(wrapper.findAll("[data-testid*=Action]")).not.toHaveLength(0);

		const qrCodeActionButton = wrapper.find("[data-testid=qrCodeAction]");
		qrCodeActionButton.vm.$emit("click");
		await wrapper.vm.$nextTick();

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
		const wrapper = getWrapper({ propsData: { shareUrl } });

		const copyActionButton = wrapper.find("[data-testid=copyAction]");
		copyActionButton.vm.$emit("click");
		await wrapper.vm.$nextTick();

		expect(mockClipboard.writeText).toHaveBeenCalledWith(shareUrl);
		expect(wrapper.emitted("done")).toHaveLength(1);
	});

	it("should follow href and emit done onMailShareUrl()", async () => {
		const mockLocation = {
			assign: jest.fn(),
		};
		Object.assign(window.location, mockLocation);

		const shareUrl = "http://example.com";
		const wrapper = getWrapper({ propsData: { shareUrl } });

		const copyActionButton = wrapper.find("[data-testid=shareMailAction]");
		copyActionButton.vm.$emit("click");
		await wrapper.vm.$nextTick();

		const result: string = mockLocation.assign.mock.calls[0][0];

		expect(result).toContain(encodeURIComponent(shareUrl));
		expect(mockLocation.assign).toHaveBeenCalled();
		expect(wrapper.emitted("done")).toHaveLength(1);
	});

	it("should use native platform share onShareMobilePlatflorm()", async () => {
		const mockSharePromise = jest.fn().mockReturnValue(Promise.resolve());
		Object.assign(navigator, { share: mockSharePromise });

		const shareUrl = "http://example.com";
		const wrapper = getWrapper({ propsData: { shareUrl } });

		const copyActionButton = wrapper.find("[data-testid=mobilePlatformAction]");
		copyActionButton.vm.$emit("click");
		await wrapper.vm.$nextTick();

		expect(mockSharePromise).toHaveBeenCalledWith({ url: shareUrl });
		expect(wrapper.emitted("done")).toHaveLength(1);
	});
});
