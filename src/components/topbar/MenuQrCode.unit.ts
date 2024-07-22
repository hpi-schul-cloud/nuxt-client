import { mount } from "@vue/test-utils";
import MenuQrCode from "./MenuQrCode.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";

describe("@/components/topbar/MenuQrCode", () => {
	it("generates an qrCode with print icon button", () => {
		const wrapper = mount(MenuQrCode, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { url: "testUrl" },
		});

		const qrCode = wrapper.findComponent({ name: "QRCode" });
		expect(qrCode.exists()).toBe(true);
		expect(qrCode.props("url")).toBe("testUrl");

		const button = wrapper.findComponent({ name: "v-btn" });
		const icon = wrapper.findComponent({ name: "v-icon" });
		expect(button.exists()).toBe(true);
		expect(icon.exists()).toBe(true);

		expect(button.text()).toBe("global.topbar.MenuQrCode.print");
	});

	it("opens a print window when print button is clicked", async () => {
		const wrapper = mount(MenuQrCode, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		const windowMock = createMock<Window>({
			document: {
				write: () => jest.fn(),
			},
			print: () => undefined,
			close: () => undefined,
		});

		jest.spyOn(window, "open").mockImplementation(() => windowMock);

		await wrapper.findComponent({ name: "v-btn" }).trigger("click");

		expect(window.open).toHaveBeenCalledTimes(1);
		expect(windowMock.print).toHaveBeenCalledTimes(1);
		expect(windowMock.close).toHaveBeenCalledTimes(1);
	});
});
