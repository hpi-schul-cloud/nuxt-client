import QRCode from "./QRCode.vue";
import { mount } from "@vue/test-utils";

describe("@ui-qr-code", () => {
	it("Generates a qrCode image", () => {
		const wrapper = mount(QRCode, {
			props: {
				url: "url",
			},
		});
		expect(wrapper.find("div").exists()).toBe(true);
		expect(wrapper.find("img").exists()).toBe(true);
	});

	it("Sets its url as alt text", () => {
		const wrapper = mount(QRCode, {
			props: {
				url: "url",
			},
		});
		expect(wrapper.find("img").attributes("alt")).toBe("url");
	});
});
