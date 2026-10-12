import { truncateFileNames, useFailedFilesNotifier } from "./FailedFilesNotifier.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { useNotificationStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";

vi.mock("@/plugins/i18n");
(useI18nGlobal as Mock).mockReturnValue({
	t: (key: string, params?: Record<string, unknown>) => (params ? `${key} ${JSON.stringify(params)}` : key),
});

describe("FailedFilesNotifier", () => {
	describe("truncateFileNames", () => {
		describe("when all names fit into the limit", () => {
			it("should return all names without remaining count", () => {
				const result = truncateFileNames(["a.pdf", "b.mp4"], 100);

				expect(result).toEqual({ list: "a.pdf, b.mp4", remainingCount: 0 });
			});
		});

		describe("when the names exceed the limit", () => {
			it("should return the names that fit and the remaining count", () => {
				const result = truncateFileNames(["12345.pdf", "67890.pdf", "abcde.pdf"], 20);

				expect(result).toEqual({ list: "12345.pdf, 67890.pdf", remainingCount: 1 });
			});
		});

		describe("when the first name alone exceeds the limit", () => {
			it("should still return the first name", () => {
				const longName = `${"x".repeat(150)}.mp4`;

				const result = truncateFileNames([longName, "b.mp4"], 100);

				expect(result).toEqual({ list: longName, remainingCount: 1 });
			});
		});

		describe("when no limit is given", () => {
			it("should limit the list to about 100 characters", () => {
				const names = Array.from({ length: 20 }, (_, index) => `file-${index}.pdf`);

				const { list, remainingCount } = truncateFileNames(names);

				expect(list.length).toBeLessThanOrEqual(100);
				expect(remainingCount).toBeGreaterThan(0);
			});
		});
	});

	describe("notifyFailedFiles", () => {
		beforeEach(() => {
			setActivePinia(createTestingPinia());
		});

		describe("when all names fit into the limit", () => {
			it("should show a persistent warning listing the files", () => {
				const { notifyFailedFiles } = useFailedFilesNotifier();

				notifyFailedFiles("components.boardColumn", ["a.pdf", "b.mp4"]);

				expect(useNotificationStore().notify).toHaveBeenCalledWith({
					status: "warning",
					autoClose: false,
					text: `common.notifications.warning.filesNotCopied ${JSON.stringify({
						type: "components.boardColumn",
						files: "a.pdf, b.mp4",
					})}`,
				});
			});
		});

		describe("when the names exceed the limit", () => {
			it("should add the number of remaining files", () => {
				const { notifyFailedFiles } = useFailedFilesNotifier();
				const longName = `${"x".repeat(150)}.mp4`;

				notifyFailedFiles("components.boardCard", [longName, "b.mp4", "c.mp4"]);

				const listWithMore = `common.notifications.listWithMore ${JSON.stringify({ list: longName, count: 2 })}`;
				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({
						text: `common.notifications.warning.filesNotCopied ${JSON.stringify({
							type: "components.boardCard",
							files: listWithMore,
						})}`,
					})
				);
			});
		});
	});
});
