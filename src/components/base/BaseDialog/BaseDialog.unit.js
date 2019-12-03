import BaseDialog from "./BaseDialog";

const mountDialog = async (options) => {
	const wrapper = mount(BaseDialog, {
		...options,
		beforeMount() {},
	});
	await wrapper.vm.$nextTick();
	return wrapper;
};

describe("@components/BaseDialog", () => {
	it(...isValidComponent(BaseDialog));

	describe("appearance", () => {
		it("should display message", async () => {
			const testMessage = "Hallo Welt";
			const wrapper = await mountDialog({
				propsData: {
					message: testMessage,
				},
			});
			expect(wrapper.text().includes(testMessage)).toBe(true);
		});
		it("iconColor Prop should override actionDesign", async () => {
			const testColor = "lime";
			const wrapper = await mountDialog({
				stubs: {
					BaseIcon: { template: "<div class='mock-icon'></div>" },
				},
				propsData: {
					iconColor: testColor,
					actionDesign: "danger",
					icon: "warning",
				},
			});
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.currentIconColor).toBe(testColor);
			expect(wrapper.find(".mock-icon").element.style.color).toBe(testColor);
		});
		it("icon should have by default the actionDesign prop color", async () => {
			const testWithDesign = async (design) => {
				const wrapper = await mountDialog({
					propsData: {
						actionDesign: design,
						icon: "warning",
					},
				});
				await wrapper.vm.$nextTick();
				// We can not test if the style gets applied because
				// the BaseIcon is not rendered (solvable)
				// and css custom properties get ignored by vue-test-utils
				expect(wrapper.vm.currentIconColor).toBe(`var(--color-${design})`);
			};
			return Promise.all(["success", "danger", "primary"].map(testWithDesign));
		});
		it("passes correct button designs", async () => {
			const wrapper = await mountDialog({
				propsData: {
					actionDesign: "success",
				},
			});
			const confirmBtn = wrapper.find(`[data-testid="btn-dialog-confirm"]`);
			const cancelBtn = wrapper.find(`[data-testid="btn-dialog-cancel"]`);
			expect(confirmBtn.classes("is-success")).toBe(true);
			expect(cancelBtn.classes("is-text")).toBe(true);
		});
		it("invertedDesign: true switches the confirm and cancel button design", async () => {
			const wrapper = await mountDialog({
				propsData: {
					actionDesign: "success",
					invertedDesign: true,
				},
			});
			const confirmBtn = wrapper.find(`[data-testid="btn-dialog-confirm"]`);
			const cancelBtn = wrapper.find(`[data-testid="btn-dialog-cancel"]`);
			expect(confirmBtn.classes("is-text")).toBe(true);
			expect(cancelBtn.classes("is-success")).toBe(true);
		});
	});
	describe("behaviour", () => {
		it("should auto open on mount", async () => {
			const wrapper = await mountDialog({});
			expect(wrapper.vm.isActive).toBe(true);
			expect(wrapper.find(".modal-body").exists()).toBe(true);
		});
		it("should close on confirm", async () => {
			const wrapper = await mountDialog({});
			wrapper.vm.confirm();
			expect(wrapper.vm.isActive).toBe(false);
			expect(wrapper.find(".modal-body").exists()).toBe(false);
		});
		it("should close on cancel", async () => {
			const wrapper = await mountDialog({});
			wrapper.vm.cancel();
			expect(wrapper.vm.isActive).toBe(false);
			expect(wrapper.find(".modal-body").exists()).toBe(false);
		});
		it("should close on click outside", async () => {
			const wrapper = await mountDialog({});
			wrapper.vm.clickOutside();
			expect(wrapper.vm.isActive).toBe(false);
			expect(wrapper.find(".modal-body").exists()).toBe(false);
		});
		it("should call onConfirm prop on primary action click", async () => {
			const callbackStub = sinon.stub();
			const wrapper = await mountDialog({
				propsData: {
					onConfirm: callbackStub,
				},
			});
			const confirmBtn = wrapper.find(`[data-testid="btn-dialog-confirm"]`);
			confirmBtn.trigger("click");
			expect(callbackStub.called).toBe(true);
		});
		it("should call onCancel prop on secondary action click", async () => {
			const callbackStub = sinon.stub();
			const wrapper = await mountDialog({
				propsData: {
					onCancel: callbackStub,
				},
			});
			const confirmBtn = wrapper.find(`[data-testid="btn-dialog-cancel"]`);
			confirmBtn.trigger("click");
			expect(callbackStub.called).toBe(true);
		});
		it("should call onClickOutside prop on click outside", async () => {
			const callbackStub = sinon.stub();
			const wrapper = await mountDialog({
				propsData: {
					onClickOutside: callbackStub,
				},
			});
			const confirmBtn = wrapper.find(`.base-modal-wrapper`);
			confirmBtn.trigger("click");
			expect(callbackStub.called).toBe(true);
		});
	});
});
