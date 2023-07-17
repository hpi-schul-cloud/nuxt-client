import BaseDialog from "./BaseDialog";

const mountDialog = async (options = {}) => {
	const wrapper = mount(BaseDialog, {
		...createComponentMocks({ stubs: { transition: true }, vuetify: true }),
		...options,
	});
	await wrapper.vm.$nextTick();
	return wrapper;
};

describe("@/components/base/BaseDialog", () => {
	describe("appearance", () => {
		it("should display message", async () => {
			const testMessage = "Hallo Welt";
			const wrapper = await mountDialog({
				propsData: {
					active: true,
					message: testMessage,
				},
			});
			expect(wrapper.text()).toContain(testMessage);
		});

		it("iconColor Prop should override actionDesign", async () => {
			const testColor = "lime";
			const wrapper = await mountDialog({
				propsData: {
					active: true,
					iconColor: testColor,
					actionDesign: "danger",
					icon: "warning",
				},
			});
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.currentIconColor).toBe(testColor);
		});

		it("icon should have by default the actionDesign prop color", async () => {
			const designs = ["success", "danger", "primary"];
			// Make sure all expects get executed
			expect.assertions(designs.length);
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
				expect(wrapper.vm.currentIconColor).toBe(`var(--v-${design}-base)`);
			};
			await Promise.all(designs.map(testWithDesign));
		});

		it("passes correct button designs", async () => {
			const wrapper = await mountDialog({
				propsData: {
					active: true,
					actionDesign: "success",
				},
			});
			const confirmBtn = wrapper.find(`[data-testid="btn-dialog-confirm"]`);
			const cancelBtn = wrapper.find(`[data-testid="btn-dialog-cancel"]`);
			expect(confirmBtn.classes("success")).toBe(true);
			expect(cancelBtn.classes("v-btn--text")).toBe(true);
		});

		it("invertedDesign: true switches the confirm and cancel button design", async () => {
			const wrapper = await mountDialog({
				propsData: {
					active: true,
					actionDesign: "success",
					invertedDesign: true,
				},
			});
			const confirmBtn = wrapper.find(`[data-testid="btn-dialog-confirm"]`);
			const cancelBtn = wrapper.find(`[data-testid="btn-dialog-cancel"]`);
			expect(confirmBtn.classes("v-btn--text")).toBe(true);
			expect(cancelBtn.classes("success")).toBe(true);
		});
	});

	describe("behaviour", () => {
		it("should auto open on mount", async () => {
			const wrapper = await mountDialog({ propsData: { active: true } });
			expect(wrapper.find(".modal-body").exists()).toBe(true);
		});

		it("should close on confirm", async () => {
			const wrapper = await mountDialog({ propsData: { active: true } });
			wrapper.vm.confirm();
			await wrapper.vm.$nextTick();
			expect(wrapper.emitted("update:active")[0]).toEqual([false]);
		});

		it("should close on cancel", async () => {
			const wrapper = await mountDialog({});
			wrapper.vm.cancel();
			await wrapper.vm.$nextTick();
			expect(wrapper.emitted("update:active")[0]).toEqual([false]);
		});

		it("should close on click outside", async () => {
			const wrapper = await mountDialog({});
			wrapper.vm.clickOutside();
			await wrapper.vm.$nextTick();
			expect(wrapper.emitted("update:active")[0]).toEqual([false]);
		});

		it("should call onConfirm prop on primary action click", async () => {
			const callbackStub = jest.fn();
			const wrapper = await mountDialog({
				propsData: {
					active: true,
					onConfirm: callbackStub,
				},
			});
			const confirmBtn = wrapper.find(`[data-testid="btn-dialog-confirm"]`);
			await confirmBtn.trigger("click");
			expect(callbackStub.mock.calls).toHaveLength(1);
		});

		it("should call onCancel prop on secondary action click", async () => {
			const callbackStub = jest.fn();
			const wrapper = await mountDialog({
				propsData: {
					active: true,
					onCancel: callbackStub,
				},
			});
			const confirmBtn = wrapper.find(`[data-testid="btn-dialog-cancel"]`);
			await confirmBtn.trigger("click");
			expect(callbackStub.mock.calls).toHaveLength(1);
		});

		it("should call onClickOutside prop on click outside", async () => {
			const callbackStub = jest.fn();
			const wrapper = await mountDialog({
				propsData: {
					active: true,
					onClickOutside: callbackStub,
				},
			});
			const confirmBtn = wrapper.find(`.base-modal-wrapper`);
			await confirmBtn.trigger("click");
			expect(callbackStub.mock.calls).toHaveLength(1);
		});
	});
});
