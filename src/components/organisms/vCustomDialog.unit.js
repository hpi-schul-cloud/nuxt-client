import customDialog from "./vCustomDialog.vue";

const mockProps = {
	isOpen: true,
	size: 480,
	hasButtons: true,
};
const negativeTestmockProps = {
	isOpen: false,
	size: 480,
	hasButtons: true,
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
	it("should have dialog buttons", () => {
		const wrapper = mount(customDialog, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: mockProps,
		});
		const closeButton = wrapper.findAll(".dialog-closed");
		const confirmButton = wrapper.findAll(".dialog-confirmed");
		expect(closeButton).toHaveLength(1);
		expect(confirmButton).toHaveLength(1);
	});
	it("should not have dialog buttons if has-button prop set false", () => {
		const wrapper = mount(customDialog, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				isOpen: true,
				size: 480,
				hasButtons: false,
			},
		});
		const closeButton = wrapper.findAll(".dialog-closed");
		const confirmButton = wrapper.findAll(".dialog-confirmed");
		expect(closeButton).toHaveLength(0);
		expect(confirmButton).toHaveLength(0);
	});
});
