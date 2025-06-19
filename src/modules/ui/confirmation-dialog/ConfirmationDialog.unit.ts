import { ref } from "vue";
import { useInternalConfirmationDialog } from "./Confirmation.composable";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import ConfirmationDialog from "./ConfirmationDialog.vue";
import { VCard, VDialog } from "vuetify/lib/components/index";
import { VueWrapper } from "@vue/test-utils";

vi.mock("./Confirmation.composable");
const useInternalConfirmationDialogMock = vi.mocked(
	useInternalConfirmationDialog
);

describe("ConfirmationDialog", () => {
	let cancelMock: vi.Mock;
	let confirmMock: vi.Mock;
	let wrapper: VueWrapper<InstanceType<typeof ConfirmationDialog>>;

	beforeEach(() => {
		cancelMock = vi.fn();
		confirmMock = vi.fn();
	});

	const setup = (options?: {
		message?: string;
		confirmActionLangKey?: string;
	}) => {
		const { message, confirmActionLangKey } = {
			message: "titleMessage",
			confirmActionLangKey: "ActionKey",
			...options,
		};

		useInternalConfirmationDialogMock.mockReturnValue({
			dialogOptions: ref({
				message,
				confirmActionLangKey,
			}),
			isDialogOpen: ref(true),
			confirm: confirmMock,
			cancel: cancelMock,
			askInternal: vi.fn(),
		});

		wrapper = mount(ConfirmationDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		return { wrapper, message, confirmActionLangKey };
	};

	afterEach(() => {
		wrapper.unmount(); // otherwise tests break when running all tests, necessary due focus trap
	});

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
		});

		it("should render dialog title", async () => {
			const { wrapper, message } = setup();

			const dialogTitle = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.find(".dialog-title");

			expect(dialogTitle.text()).toContain(message);
		});

		it("should render empty dialog title if no message is provided", async () => {
			const { wrapper } = setup({ message: undefined });

			const dialogTitle = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.find(".dialog-title");

			expect(dialogTitle.text()).toBe("");
		});
	});

	describe("when a dialog button is clicked", () => {
		it("should call 'confirm' if 'confirm' button clicked", async () => {
			const { wrapper } = setup();

			const confirmButton = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.findComponent("[data-testid='dialog-confirm']");

			await confirmButton.trigger("click");
			expect(confirmMock).toHaveBeenCalled();
		});

		it("should call 'cancel' if 'cancel' button clicked", async () => {
			const { wrapper } = setup();

			const cancelButton = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.findComponent("[data-testid='dialog-cancel']");

			await cancelButton.trigger("click");
			expect(cancelMock).toHaveBeenCalled();
		});
	});

	describe("confirm button", () => {
		it("should call 'confirm' if button is clicked", async () => {
			const { wrapper } = setup();

			const confirmButton = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.findComponent("[data-testid='dialog-confirm']");

			await confirmButton.trigger("click");
			expect(confirmMock).toHaveBeenCalled();
		});

		it("should have correct text when own language key is provided", async () => {
			const { wrapper, confirmActionLangKey } = setup({
				confirmActionLangKey: "providedLanguageKey",
			});

			const confirmButton = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.findComponent("[data-testid='dialog-confirm']");

			expect(confirmButton.text()).toContain(confirmActionLangKey);
		});

		it("should have default text when no language key is provided", async () => {
			const { wrapper } = setup({ confirmActionLangKey: undefined });

			const confirmButton = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.findComponent("[data-testid='dialog-confirm']");

			expect(confirmButton.text()).toContain("common.actions.confirm");
		});
	});

	describe("cancel button", () => {
		it("should call 'cancel' if dialog is cancelled", async () => {
			const { wrapper } = setup();

			const cancelButton = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.findComponent("[data-testid='dialog-cancel']");

			await cancelButton.trigger("click");
			expect(cancelMock).toHaveBeenCalled();
		});
	});
});
