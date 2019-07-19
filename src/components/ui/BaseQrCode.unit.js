import BaseQrCode from "./BaseQrCode";

const qrCode = {
	components: { BaseQrCode },
	template: `<base-qr-code/>`,
};

describe("@components/BaseQrCode", () => {
	it(...isValidComponent(BaseQrCode));
	it("Generates a qrCode image", () => {
		const wrapper = mount(qrCode);
		expect(wrapper.contains("div")).toBe(true);
		expect(wrapper.contains("img")).toBe(true);
	});
});
