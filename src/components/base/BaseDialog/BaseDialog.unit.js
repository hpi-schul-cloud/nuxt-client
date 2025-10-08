import BaseDialog from "./BaseDialog";
import { createTestingVuetify } from "@@/tests/test-utils/setup";

const mountDialog = (options = {}) => {
	const wrapper = mount(BaseDialog, {
		global: {
			plugins: [createTestingVuetify()],
		},
		...options,
	});
	return wrapper;
};

describe("@/components/base/BaseDialog", () => {
	describe("appearance", () => {
		it("should display message", () => {
			const testMessage = "Hallo Welt";
			const wrapper = mountDialog({
				props: {
					active: true,
					message: testMessage,
				},
			});
			const dialogCard = wrapper.findComponent({ name: "v-card" });
			expect(dialogCard.text()).toContain(testMessage);
		});

		it("iconColor Prop should override default color", () => {
			const testColor = "lime";
			const wrapper = mountDialog({
				props: {
					active: true,
					iconColor: testColor,
					icon: "warning",
				},
			});
			expect(wrapper.vm.currentIconColor).toBe(testColor);
		});

		it("icon should have by default the primary color", () => {
			const designs = ["success", "danger", "primary"];
			// Make sure all expects get executed
			expect.assertions(designs.length);
			const testWithDesign = async () => {
				const wrapper = mountDialog({
					props: {
						icon: "warning",
					},
				});
				// We can not test if the style gets applied because
				// the BaseIcon is not rendered (solvable)
				// and css custom properties get ignored by vue-test-utils
				expect(wrapper.vm.currentIconColor).toBe("rgba(var(--v-theme-primary))");
			};
			designs.map(testWithDesign);
		});
	});

	describe("behaviour", () => {
		it("should auto open on mount", () => {
			const wrapper = mountDialog({ props: { active: true } });
			const dialogCard = wrapper.findComponent({ name: "v-card" });
			expect(dialogCard.find(".modal-body").exists()).toBe(true);
		});

		it("should close on confirm", () => {
			const wrapper = mountDialog({ props: { active: true } });
			wrapper.vm.confirm();
			expect(wrapper.emitted("update:active")[0]).toEqual([false]);
		});

		it("should close on cancel", () => {
			const wrapper = mountDialog({});
			wrapper.vm.cancel();
			expect(wrapper.emitted("update:active")[0]).toEqual([false]);
		});

		it("should close on click outside", () => {
			const wrapper = mountDialog({});
			wrapper.vm.clickOutside();
			expect(wrapper.emitted("update:active")[0]).toEqual([false]);
		});

		it("should call onConfirm prop on primary action click", async () => {
			const callbackStub = vi.fn();
			const wrapper = mountDialog({
				props: {
					active: true,
					onConfirm: callbackStub,
				},
			});
			const confirmBtn = wrapper.findComponent(`[data-testid="btn-dialog-confirm"]`);
			await confirmBtn.trigger("click");
			expect(callbackStub.mock.calls).toHaveLength(1);
		});

		it("should call onCancel prop on secondary action click", async () => {
			const callbackStub = vi.fn();
			const wrapper = mountDialog({
				props: {
					active: true,
					onCancel: callbackStub,
				},
			});
			const confirmBtn = wrapper.findComponent(`[data-testid="btn-dialog-cancel"]`);
			await confirmBtn.trigger("click");
			expect(callbackStub.mock.calls).toHaveLength(1);
		});
	});
});
