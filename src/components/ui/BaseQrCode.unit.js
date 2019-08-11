import BaseQrCode from "./BaseQrCode";

const qrCode = {
	components: { BaseQrCode },
	template: `<base-qr-code url="testUrl"/>`,
};

describe("@components/BaseQrCode", () => {
	it(...isValidComponent(BaseQrCode));
	it("Generates a qrCode image", () => {
		const wrapper = mount(qrCode);
		expect(wrapper.contains("div")).toBe(true);
		expect(wrapper.contains("img")).toBe(true);
	});
	it("Sets its url as alt text", () => {
		const wrapper = mount(qrCode);
		expect(wrapper.find("img").attributes("alt")).toBe("testUrl");
	});
});
