import { useInternalConfirmationDialog } from "./confirm-dialog.composable";
import * as i18nModule from "@/plugins/i18n";

vi.mock("@/plugins/i18n");

describe("useInternalConfirmationDialog", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(i18nModule.i18nKeyExists).mockReturnValue(false);
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
		it("should resolve the promise with trueshould close the dialog", async () => {
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
			vi.mocked(i18nModule.i18nKeyExists).mockReturnValue(true);
			vi.mocked(i18nModule.useI18nGlobal).mockReturnValue({
				t: vi.fn().mockReturnValue("Translated Title"),
			} as unknown as ReturnType<typeof i18nModule.useI18nGlobal>);

			const { askInternal, confirmTitle } = useInternalConfirmationDialog();
			askInternal({ title: "common.title.key" });

			expect(confirmTitle.value).toBe("Translated Title");
		});

		it("should return raw title when i18n key does not exist", () => {
			vi.mocked(i18nModule.i18nKeyExists).mockReturnValue(false);

			const { askInternal, confirmTitle } = useInternalConfirmationDialog();
			askInternal({ title: "Raw Title" });

			expect(confirmTitle.value).toBe("Raw Title");
		});

		it("should return empty string when no dialog options are set", () => {
			const { confirmTitle, resetDialogOptions } = useInternalConfirmationDialog();
			resetDialogOptions();

			expect(confirmTitle.value).toBe("");
		});
	});

	describe("confirmMessage", () => {
		it("should return translated message when i18n key exists", () => {
			vi.mocked(i18nModule.i18nKeyExists).mockReturnValue(true);
			vi.mocked(i18nModule.useI18nGlobal).mockReturnValue({
				t: vi.fn().mockReturnValue("Translated Message"),
			} as unknown as ReturnType<typeof i18nModule.useI18nGlobal>);

			const { askInternal, confirmMessage } = useInternalConfirmationDialog();
			askInternal({ title: "Title", message: "common.message.key" });

			expect(confirmMessage.value).toBe("Translated Message");
		});

		it("should return raw message when i18n key does not exist", () => {
			vi.mocked(i18nModule.i18nKeyExists).mockReturnValue(false);

			const { askInternal, confirmMessage } = useInternalConfirmationDialog();
			askInternal({ title: "Title", message: "Raw Message" });

			expect(confirmMessage.value).toBe("Raw Message");
		});

		it("should return undefined when no message is provided", () => {
			const { askInternal, confirmMessage } = useInternalConfirmationDialog();
			askInternal({ title: "Title" });

			expect(confirmMessage.value).toBeUndefined();
		});
	});
});
