import { askCancel, askConfirmation, askDeletion, askDeletionForItem, askDeletionForType } from "./confirmation-dialog.utils";
import { useInternalConfirmationDialog } from "@/composables/confirmation-dialog.composable";
import * as i18nModule from "@/plugins/i18n";
import { mockComposable } from "@@/tests/test-utils";
import { beforeEach, describe, expect, it, type Mocked, vi } from "vitest";

vi.mock("@/composables/confirm-dialog.composable");
vi.mock("@/plugins/i18n");

describe("confirm-dialog.utils", () => {
	let useInternalConfirmationDialogMock: Mocked<ReturnType<typeof useInternalConfirmationDialog>>;

	beforeEach(() => {
		vi.clearAllMocks();

		useInternalConfirmationDialogMock = mockComposable(useInternalConfirmationDialog, {
			askInternal: vi.fn().mockResolvedValue(true),
		});
		vi.mocked(useInternalConfirmationDialog).mockReturnValue(useInternalConfirmationDialogMock);

		vi.mocked(i18nModule.useI18nGlobal).mockReturnValue({
			t: vi.fn((key: string) => key),
		} as unknown as ReturnType<typeof i18nModule.useI18nGlobal>);
		vi.mocked(i18nModule.i18nKeyExists).mockReturnValue(false);
	});

	describe("askConfirmation", () => {
		it("should call askInternal with the given options", async () => {
			const options = {
				title: "Test Title",
				message: "Test Message",
				messageType: "warning" as const,
				confirmBtnKey: "confirm.button",
			};

			const result = await askConfirmation(options);

			expect(useInternalConfirmationDialogMock.askInternal).toHaveBeenCalledWith(options);
			expect(result).toBe(true);
		});

		it("should return false when user cancels", async () => {
			useInternalConfirmationDialogMock.askInternal.mockResolvedValue(false);

			const result = await askConfirmation({ title: "Test" });

			expect(result).toBe(false);
		});
	});

	describe("askDeletion", () => {
		it("should call askConfirmation with correct defaults", async () => {
			await askDeletion("Delete Title");

			expect(useInternalConfirmationDialogMock.askInternal).toHaveBeenCalledWith({
				title: "Delete Title",
				message: undefined,
				messageType: "warning",
				confirmBtnKey: "common.actions.delete",
			});
		});

		it("should include message when provided", async () => {
			await askDeletion("Delete Title", "Are you sure?");

			expect(useInternalConfirmationDialogMock.askInternal).toHaveBeenCalledWith({
				title: "Delete Title",
				message: "Are you sure?",
				messageType: "warning",
				confirmBtnKey: "common.actions.delete",
			});
		});

		it("should use provided messageType", async () => {
			await askDeletion("Delete Title", "Message", "info");

			expect(useInternalConfirmationDialogMock.askInternal).toHaveBeenCalledWith({
				title: "Delete Title",
				message: "Message",
				messageType: "info",
				confirmBtnKey: "common.actions.delete",
			});
		});

		it("should use provided confirmBtnKey", async () => {
			await askDeletion("Delete Title", "Message", "info", "common.actions.remove");

			expect(useInternalConfirmationDialogMock.askInternal).toHaveBeenCalledWith({
				title: "Delete Title",
				message: "Message",
				messageType: "info",
				confirmBtnKey: "common.actions.remove",
			});
		});
	});

	describe("askDeletionByTitle", () => {
		it("should translate title with itemName and itemType when itemType key exists", async () => {
			const mockT = vi.fn((key: string, params?: Record<string, string>) => {
				if (key === "ui-confirmation-dialog.ask-delete") {
					return `Delete ${params?.itemTitle} (${params?.itemType})?`;
				}
				if (key === "common.types.document") {
					return "Document";
				}
				return key;
			});
			vi.mocked(i18nModule.useI18nGlobal).mockReturnValue({
				t: mockT,
			} as unknown as ReturnType<typeof i18nModule.useI18nGlobal>);
			vi.mocked(i18nModule.i18nKeyExists).mockReturnValue(true);

			await askDeletionForItem("My Document", "common.types.document");

			expect(i18nModule.i18nKeyExists).toHaveBeenCalledWith("common.types.document");
			expect(mockT).toHaveBeenCalledWith("common.types.document");
			expect(mockT).toHaveBeenCalledWith("ui-confirmation-dialog.ask-delete", {
				itemTitle: "My Document",
				itemType: "Document",
			});
		});

		it("should use raw itemType when key does not exist", async () => {
			const mockT = vi.fn((key: string, params?: Record<string, string>) => {
				if (key === "ui-confirmation-dialog.ask-delete") {
					return `Delete ${params?.itemTitle} (${params?.itemType})?`;
				}
				return key;
			});
			vi.mocked(i18nModule.useI18nGlobal).mockReturnValue({
				t: mockT,
			} as unknown as ReturnType<typeof i18nModule.useI18nGlobal>);
			vi.mocked(i18nModule.i18nKeyExists).mockReturnValue(false);

			await askDeletionForItem("My Document", "Document");

			expect(mockT).toHaveBeenCalledWith("ui-confirmation-dialog.ask-delete", {
				itemTitle: "My Document",
				itemType: "Document",
			});
		});
	});

	describe("askDeletionByType", () => {
		it("should translate with itemType when key exists", async () => {
			const mockT = vi.fn((key: string, params?: Record<string, string>) => {
				if (key === "ui-confirmation-dialog.ask-delete-type") {
					return `Delete all ${params?.itemType}?`;
				}
				if (key === "common.types.document") {
					return "Document";
				}
				return key;
			});
			vi.mocked(i18nModule.useI18nGlobal).mockReturnValue({
				t: mockT,
			} as unknown as ReturnType<typeof i18nModule.useI18nGlobal>);
			vi.mocked(i18nModule.i18nKeyExists).mockReturnValue(true);

			await askDeletionForType("common.types.document");

			expect(i18nModule.i18nKeyExists).toHaveBeenCalledWith("common.types.document");
			expect(mockT).toHaveBeenCalledWith("common.types.document");
			expect(mockT).toHaveBeenCalledWith("ui-confirmation-dialog.ask-delete-type", {
				itemType: "Document",
			});
		});

		it("should use raw itemType when key does not exist", async () => {
			const mockT = vi.fn((key: string) => key);
			vi.mocked(i18nModule.useI18nGlobal).mockReturnValue({
				t: mockT,
			} as unknown as ReturnType<typeof i18nModule.useI18nGlobal>);
			vi.mocked(i18nModule.i18nKeyExists).mockReturnValue(false);

			await askDeletionForType("Raw Type");

			expect(mockT).toHaveBeenCalledWith("ui-confirmation-dialog.ask-delete-type", {
				itemType: "Raw Type",
			});
		});
	});

	describe("askCancel", () => {
		it("should call askConfirmation with default values", async () => {
			await askCancel();

			expect(useInternalConfirmationDialogMock.askInternal).toHaveBeenCalledWith({
				title: "ui-confirmation-dialog.ask-cancel-form",
				message: "ui-confirmation-dialog.ask-cancel-warning-message",
				messageType: "warning",
				confirmBtnKey: "common.actions.discard",
			});
		});

		it("should use custom title when provided", async () => {
			await askCancel("Custom Title");

			expect(useInternalConfirmationDialogMock.askInternal).toHaveBeenCalledWith({
				title: "Custom Title",
				message: "ui-confirmation-dialog.ask-cancel-warning-message",
				messageType: "warning",
				confirmBtnKey: "common.actions.discard",
			});
		});

		it("should use custom message when provided", async () => {
			await askCancel("Custom Title", "Custom Message");

			expect(useInternalConfirmationDialogMock.askInternal).toHaveBeenCalledWith({
				title: "Custom Title",
				message: "Custom Message",
				messageType: "warning",
				confirmBtnKey: "common.actions.discard",
			});
		});
	});
});
