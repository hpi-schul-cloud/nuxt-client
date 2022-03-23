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
		const confirmDialogSpy = jest.spyOn(customDialog.methods, "confirmDialog");
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

		expect(confirmDialogSpy).toHaveBeenCalled();
		expect(emitted["dialog-confirmed"]).toHaveLength(1);
		expect(emitted["dialog-closed"]).toHaveLength(1);
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
	it("should have default buttons", () => {
		const wrapper = mount(customDialog, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				isOpen: true,
				size: 480,
				hasButtons: true,
			},
		});
		const closeButton = wrapper.findAll(".dialog-closed");
		const confirmButton = wrapper.findAll(".dialog-confirmed");
		expect(closeButton).toHaveLength(1);
		expect(confirmButton).toHaveLength(1);
	});
	it("should have buttons which passed as a prop", () => {
		const wrapper = mount(customDialog, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				isOpen: true,
				size: 480,
				hasButtons: true,
				buttons: ["back", "cancel", "confirm", "close", "next"],
			},
		});
		const backButton = wrapper.findAll(`[data-testid="dialog-back"]`);
		const cancelButton = wrapper.findAll(`[data-testid="dialog-cancel"]`);
		const confirmButton = wrapper.findAll(`[data-testid="dialog-confirm"]`);
		const closeButton = wrapper.findAll(`[data-testid="dialog-cancel"]`);
		const nextButton = wrapper.findAll(`[data-testid="dialog-next"]`);

		expect(backButton).toHaveLength(1);
		expect(cancelButton).toHaveLength(1);
		expect(confirmButton).toHaveLength(1);
		expect(closeButton).toHaveLength(1);
		expect(nextButton).toHaveLength(1);
	});
	it("should disable the confirm button when 'confirmBtnDisabled' passed as a prop", () => {
		const wrapper = mount(customDialog, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				isOpen: true,
				size: 480,
				hasButtons: true,
				confirmBtnDisabled: true,
			},
		});
		const confirmButton = wrapper.find(`[data-testid="dialog-confirm"]`);
		expect(confirmButton.element.disabled).toBe(true);
	});
	it("should change the confirm button text via passing the prop", () => {
		const wrapper = mount(customDialog, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				isOpen: true,
				size: 480,
				hasButtons: true,
				confirmBtnTitleKey: "test text",
			},
		});
		const confirmButton = wrapper.find(`[data-testid="dialog-confirm"]`);
		expect(confirmButton.element.innerHTML).toContain("test text");
	});
});
