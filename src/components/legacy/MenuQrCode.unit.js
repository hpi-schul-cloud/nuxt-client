import MenuQrCode from "./MenuQrCode";

const menuQrCode = {
	components: { MenuQrCode },
	template: `<menu-qr-code/>`,
};

describe("@components/legacy/MenuQrCode", () => {
	it(...isValidComponent(MenuQrCode));
	it("generates an qrCode with print icon button", () => {
		const wrapper = shallowMount(MenuQrCode, {
			...createComponentMocks({ i18n: true }),
			propsData: { url: "testUrl" },
		});

		expect(wrapper.find("base-qr-code-stub").exists()).toBe(true);
		expect(wrapper.find("base-qr-code-stub").props("url")).toBe("testUrl");

		expect(wrapper.find("v-btn-stub").exists()).toBe(true);
		expect(wrapper.find("v-icon-stub").exists()).toBe(true);

		expect(wrapper.find("v-btn-stub").text()).toContain("Drucken");
	});
	it("opens a print window when print button is clicked", () => {
		const wrapper = mount(menuQrCode, {
			...createComponentMocks({ i18n: true }),
		});

		jest.spyOn(window, "open").mockImplementation(() => window);
		jest.spyOn(window, "print").mockImplementation();
		jest.spyOn(window, "close").mockImplementation();
		wrapper.find("button").trigger("click");
		expect(window.open).toHaveBeenCalledTimes(1);
		expect(window.print).toHaveBeenCalledTimes(1);
		expect(window.close).toHaveBeenCalledTimes(1);
	});
});
