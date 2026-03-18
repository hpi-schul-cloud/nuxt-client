import { useInternalConfirmationDialog } from "./confirm-dialog.composable";
import * as i18nModule from "@/plugins/i18n";

vi.mock("@/plugins/i18n");

describe("useInternalConfirmationDialog", () => {
	const setup = ({
		i18nKeyExists = false,
		translation = "",
	}: {
		i18nKeyExists?: boolean;
		translation?: string;
	} = {}) => {
		vi.mocked(i18nModule.i18nKeyExists).mockReturnValue(i18nKeyExists);
		vi.mocked(i18nModule.useI18nGlobal).mockReturnValue({
			t: vi.fn().mockReturnValue(translation),
		} as unknown as ReturnType<typeof i18nModule.useI18nGlobal>);
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("askInternal", () => {
		it("should open the dialog and set options", () => {
			const { askInternal, isDialogOpen, dialogOptions } = useInternalConfirmationDialog();

			askInternal({ title: "Test Title", message: "Test Message" });

			expect(isDialogOpen.value).toBe(true);
			expect(dialogOptions.value).toEqual({
				title: "Test Title",
				message: "Test Message",
			});
		});
	});

	describe("confirm", () => {
		it("should resolve the promise with true and close the dialog", async () => {
			const { askInternal, confirm, isDialogOpen } = useInternalConfirmationDialog();

			const askPromise = askInternal({ title: "Test" });
			expect(isDialogOpen.value).toBe(true);

			confirm();
			const result = await askPromise;

			expect(isDialogOpen.value).toBe(false);
			expect(result).toBe(true);
		});
	});

	describe("cancel", () => {
		it("should resolve the promise with false and close the dialog", async () => {
			const { askInternal, cancel, isDialogOpen } = useInternalConfirmationDialog();

			const askPromise = askInternal({ title: "Test" });
			expect(isDialogOpen.value).toBe(true);

			cancel();
			const result = await askPromise;

			expect(isDialogOpen.value).toBe(false);
			expect(result).toBe(false);
		});
	});

	describe("resetDialogOptions", () => {
		it("should clear the dialog options", () => {
			const { askInternal, resetDialogOptions, dialogOptions } = useInternalConfirmationDialog();

			askInternal({ title: "Test", message: "Message" });
			expect(dialogOptions.value).toBeDefined();

			resetDialogOptions();

			expect(dialogOptions.value).toBeUndefined();
		});
	});

	describe("confirmTitle", () => {
		it("should return translated title when i18n key exists", () => {
			setup({ i18nKeyExists: true, translation: "Translated Title" });

			const { askInternal, confirmationTitle } = useInternalConfirmationDialog();
			askInternal({ title: "common.title.key" });

			expect(confirmationTitle.value).toBe("Translated Title");
		});

		it("should return raw title when i18n key does not exist", () => {
			setup({ i18nKeyExists: false });
			const { askInternal, confirmationTitle } = useInternalConfirmationDialog();
			askInternal({ title: "Raw Title" });

			expect(confirmationTitle.value).toBe("Raw Title");
		});

		it("should return empty string when no dialog options are set", () => {
			const { confirmationTitle, resetDialogOptions } = useInternalConfirmationDialog();
			resetDialogOptions();

			expect(confirmationTitle.value).toBe("");
		});
	});

	describe("confirmMessage", () => {
		it("should return translated message when i18n key exists", () => {
			setup({ i18nKeyExists: true, translation: "Translated Message" });

			const { askInternal, confirmationMessage } = useInternalConfirmationDialog();
			askInternal({ title: "Title", message: "common.message.key" });

			expect(confirmationMessage.value).toBe("Translated Message");
		});

		it("should return raw message when i18n key does not exist", () => {
			setup({ i18nKeyExists: false });
			const { askInternal, confirmationMessage } = useInternalConfirmationDialog();
			askInternal({ title: "Title", message: "Raw Message" });

			expect(confirmationMessage.value).toBe("Raw Message");
		});

		it("should return undefined when no message is provided", () => {
			const { askInternal, confirmationMessage } = useInternalConfirmationDialog();
			askInternal({ title: "Title" });

			expect(confirmationMessage.value).toBeUndefined();
		});
	});
});
