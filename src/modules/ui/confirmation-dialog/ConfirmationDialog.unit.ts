import { shallowMount } from "@vue/test-utils";
import { ref } from "vue";
import { useInternalConfirmationDialog } from "./Confirmation.composable";
import DeleteConfirmation from "./ConfirmationDialog.vue";
import { createTestingI18n } from "@@/tests/test-utils/setup";
vi.mock("./Confirmation.composable");

const mockedUseInternalConfirmationDialog = vi.mocked(
	useInternalConfirmationDialog
);

describe("DeleteConfirmation", () => {
	const confirmSpy = vi.fn();
	const cancelSpy = vi.fn();
	const setup = (options: {
		isDeleteModalOpen?: boolean;
		title?: string;
		typeName?: string;
	}) => {
		mockedUseInternalConfirmationDialog.mockReturnValue({
			confirm: confirmSpy,
			cancel: cancelSpy,
			askInternal: vi.fn(),
			dialogOptions: ref({ message: "TestMessage" }),
			isDialogOpen: ref(true),
		});

		const wrapper = shallowMount(DeleteConfirmation, {
			global: { plugins: [createTestingI18n()] },
			props: {
				isDeleteModalOpen: options?.isDeleteModalOpen ?? true,
				title: options.title ?? "title",
				typeName: options.typeName ?? "card",
			},
		});
		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const wrapper = setup({});
			expect(wrapper.findComponent(DeleteConfirmation).exists()).toBe(true);
		});
	});

	describe("when a dialog button clicked", () => {
		it("should broadcast 'confirm' if 'remove' button clicked", () => {
			const wrapper = setup({});
			const dialog = wrapper.findComponent({ name: "vCustomDialog" });
			dialog.vm.$emit("dialog-confirmed");
			expect(confirmSpy).toHaveBeenCalled();
		});

		it("should emit 'dialog-cancel' if 'cancel' button clicked", () => {
			const wrapper = setup({});
			const dialog = wrapper.findComponent({ name: "vCustomDialog" });
			dialog.vm.$emit("dialog-closed");
			expect(cancelSpy).toHaveBeenCalled();
		});
	});
});
