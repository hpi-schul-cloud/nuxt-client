import QRCode from "./QRCode.vue";
import { mount } from "@vue/test-utils";

describe("@ui-qr-code", () => {
	it("Generates a qr-code", () => {
		const wrapper = mount(QRCode, {
			props: { url: "https://example.com" },
		});

		expect(wrapper).toBeTruthy();
	});
});
