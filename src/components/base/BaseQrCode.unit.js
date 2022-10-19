import BaseQrCode from "./BaseQrCode";

const qrCode = {
	components: { BaseQrCode },
	template: `<base-qr-code url="testUrl"/>`,
};

describe("@/components/base/BaseQrCode", () => {
	it(...isValidComponent(BaseQrCode));
	it("Generates a qrCode image", () => {
		const wrapper = mount(qrCode);
		expect(wrapper.find("div").exists()).toBe(true);
		expect(wrapper.find("img").exists()).toBe(true);
	});
	it("Sets its url as alt text", () => {
		const wrapper = mount(qrCode);
		expect(wrapper.find("img").attributes("alt")).toBe("testUrl");
	});
});
