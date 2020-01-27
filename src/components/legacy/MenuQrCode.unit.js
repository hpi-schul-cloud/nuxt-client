import MenuQrCode from "./MenuQrCode";

const menuQrCode = {
	components: { MenuQrCode },
	template: `<menu-qr-code/>`,
};

describe("@components/legacy/MenuQrCode", () => {
	it(...isValidComponent(MenuQrCode));
	it("generates an qrCode with print icon button", () => {
		const wrapper = shallowMount(MenuQrCode, {
			propsData: { url: "testUrl" },
		});

		expect(wrapper.contains("base-qr-code-stub")).toBe(true);
		expect(wrapper.find("base-qr-code-stub").props("url")).toBe("testUrl");

		expect(wrapper.contains("base-button-stub")).toBe(true);
		expect(wrapper.contains("base-icon-stub")).toBe(true);

		expect(wrapper.text()).toBe("Drucken");
	});
	it("opens a print window when print button is clicked", () => {
		const wrapper = mount(menuQrCode);

		jest.spyOn(window, "open").mockImplementation(() => window);
		jest.spyOn(window, "print").mockImplementation();
		jest.spyOn(window, "close").mockImplementation();
		wrapper.find("button").trigger("click");
		expect(window.open).toHaveBeenCalledTimes(1);
		expect(window.print).toHaveBeenCalledTimes(1);
		expect(window.close).toHaveBeenCalledTimes(1);
	});
});
