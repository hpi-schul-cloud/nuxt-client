import customDialog from "./vCustomDialog.vue";

const mockProps = {
	isOpen: true,
	size: 480,
};
const negativeTestmockProps = {
	isOpen: false,
	size: 480,
};
describe("component/customDialog", () => {
	it(...isValidComponent(customDialog));
	it("should click dialog-close btn", () => {
		const wrapper = mount(customDialog, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: mockProps,
		});
		const emitted = wrapper.emitted();
		const button = wrapper.find(".dialog-closed");
		button.trigger("click");
		expect(emitted["dialog-closed"]).toHaveLength(1);
	});
	it("should click dialog-close btn if dialog closed", () => {
		const wrapper = mount(customDialog, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: negativeTestmockProps,
		});
		const button = wrapper.findAll(".dialog-closed");
		expect(button).toHaveLength(0);
	});
	it("should click dialog-confirmed btn", () => {
		const wrapper = mount(customDialog, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: mockProps,
		});
		const emitted = wrapper.emitted();
		const button = wrapper.find(".dialog-confirmed");
		button.trigger("click");
		expect(emitted["dialog-confirmed"]).toHaveLength(1);
	});
});
