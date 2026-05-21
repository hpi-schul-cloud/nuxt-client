import ConfirmationDialog from "./ConfirmationDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ConfirmationDialogProps } from "@feature-dialog";
import { createTestingPinia } from "@pinia/testing";
import { InfoAlert, WarningAlert } from "@ui-alert";

const SvsDialogStub = {
	name: "SvsDialog",
	props: {
		modelValue: Boolean,
		title: String,
		confirmBtnLangKey: String,
		isOpenStateManagedExternally: Boolean,
	},
	emits: ["update:modelValue", "cancel", "confirm", "after-leave"],
	template: `<div v-if="modelValue"><slot name="content" /></div>`,
};

describe("ConfirmationDialog", () => {
	const setup = (props: Partial<{ modelValue: boolean } & ConfirmationDialogProps> = {}) => {
		const wrapper = mount(ConfirmationDialog, {
			props: {
				modelValue: true,
				title: "Test Title",
				...props,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n(), createTestingPinia()],
				stubs: { SvsDialog: SvsDialogStub },
			},
		});

		return { wrapper };
	};

	describe("when modelValue is true", () => {
		it("should render the dialog", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(SvsDialogStub).exists()).toBe(true);
		});
	});

	describe("when modelValue is false", () => {
		it("should not render the dialog content", () => {
			const { wrapper } = setup({ modelValue: false });

			expect(wrapper.findComponent(SvsDialogStub).find("div").exists()).toBe(false);
		});
	});

	describe("title", () => {
		it("should pass a plain-text title to SvsDialog", () => {
			const { wrapper } = setup({ title: "My Title" });

			expect(wrapper.findComponent(SvsDialogStub).props("title")).toBe("My Title");
		});
	});

	describe("confirmBtnKey", () => {
		it("should pass confirmBtnKey to SvsDialog as confirmBtnLangKey", () => {
			const { wrapper } = setup({ confirmBtnKey: "common.actions.delete" });

			expect(wrapper.findComponent(SvsDialogStub).props("confirmBtnLangKey")).toBe("common.actions.delete");
		});
	});

	describe("message content", () => {
		it("should not render an alert when no message is provided", () => {
			const { wrapper } = setup();

			expect(wrapper.find('[data-testid="confirm-dialog-alert"]').exists()).toBe(false);
		});

		it("should render WarningAlert when messageType is 'warning'", () => {
			const { wrapper } = setup({ message: "Are you sure?", messageType: "warning" });

			expect(wrapper.findComponent(WarningAlert).exists()).toBe(true);
		});

		it("should not render InfoAlert when messageType is 'warning'", () => {
			const { wrapper } = setup({ message: "Are you sure?", messageType: "warning" });

			expect(wrapper.findComponent(InfoAlert).exists()).toBe(false);
		});

		it("should render InfoAlert when messageType is 'info'", () => {
			const { wrapper } = setup({ message: "FYI something", messageType: "info" });

			expect(wrapper.findComponent(InfoAlert).exists()).toBe(true);
		});

		it("should not render WarningAlert when messageType is 'info'", () => {
			const { wrapper } = setup({ message: "FYI something", messageType: "info" });

			expect(wrapper.findComponent(WarningAlert).exists()).toBe(false);
		});

		it("should display the message text", () => {
			const { wrapper } = setup({ message: "Are you sure?", messageType: "warning" });

			expect(wrapper.findComponent(WarningAlert).text()).toContain("Are you sure?");
		});
	});

	describe("emits", () => {
		it("should emit 'cancel' when SvsDialog emits cancel", async () => {
			const { wrapper } = setup();

			await wrapper.findComponent(SvsDialogStub).vm.$emit("cancel");

			expect(wrapper.emitted("cancel")).toBeDefined();
		});

		it("should emit 'complete' with true when SvsDialog emits confirm", async () => {
			const { wrapper } = setup();

			await wrapper.findComponent(SvsDialogStub).vm.$emit("confirm");

			expect(wrapper.emitted("complete")).toEqual([[true]]);
		});

		it("should emit 'after-leave' when SvsDialog emits after-leave", async () => {
			const { wrapper } = setup();

			await wrapper.findComponent(SvsDialogStub).vm.$emit("after-leave");

			expect(wrapper.emitted("after-leave")).toBeDefined();
		});
	});
});
