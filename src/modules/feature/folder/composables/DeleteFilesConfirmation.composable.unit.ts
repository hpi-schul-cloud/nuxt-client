import { fileRecordFactory } from "@@/tests/test-utils";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDeleteFilesConfirmationDialog } from "./DeleteFilesConfirmation.composable";

jest.mock("@ui-confirmation-dialog");

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn(),
	};
});
const useI18nMock = <jest.Mock>useI18n;

describe("useDeleteFilesConfirmationDialog composable", () => {
	describe("askDeleteConfirmation", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		describe("when multiple filerecords should be confirmed", () => {
			const setup = (isConfirmed: boolean) => {
				const fileRecord1 = fileRecordFactory.build();
				const fileRecord2 = fileRecordFactory.build();
				const fileRecords = [fileRecord1, fileRecord2];

				const confirmationMock = jest.mocked(useConfirmationDialog);

				const askConfirmation = jest.fn().mockResolvedValueOnce(isConfirmed);
				const isDialogOpen = ref(false);

				const mocks = {
					askConfirmation,
					isDialogOpen,
				};

				confirmationMock.mockReturnValue(mocks);

				const translateMock = jest
					.fn()
					.mockImplementation(
						(key: string, dynamic?: object): string =>
							key + (dynamic ? ` ${JSON.stringify(dynamic)}` : "")
					);
				useI18nMock.mockReturnValue({
					t: translateMock,
				});

				const { askDeleteFilesConfirmation } = mountComposable(
					() => useDeleteFilesConfirmationDialog(),
					{
						global: { plugins: [createTestingI18n()] },
					}
				);

				return {
					askDeleteFilesConfirmation,
					translateMock,
					fileRecords,
					askConfirmation,
				};
			};

			describe("when confirmation is true", () => {
				it("should call translate functions", async () => {
					const { askDeleteFilesConfirmation, translateMock, fileRecords } =
						setup(true);

					await askDeleteFilesConfirmation(fileRecords);

					expect(translateMock).toHaveBeenNthCalledWith(
						1,
						"pages.folder.delete-multiple-confirmation",
						{
							total: fileRecords.length,
						}
					);
				});

				it("should call askConfirmation", async () => {
					const { askDeleteFilesConfirmation, fileRecords, askConfirmation } =
						setup(true);

					await askDeleteFilesConfirmation(fileRecords);

					expect(askConfirmation).toHaveBeenCalledWith({
						confirmActionLangKey: "common.actions.delete",
						message: expect.stringContaining(
							"pages.folder.delete-multiple-confirmation"
						),
					});
				});

				it("should return result", async () => {
					const { askDeleteFilesConfirmation, fileRecords } = setup(true);

					const result = await askDeleteFilesConfirmation(fileRecords);

					expect(result).toBe(true);
				});
			});

			describe("when confirmation is false", () => {
				it("should return result", async () => {
					const { askDeleteFilesConfirmation, fileRecords } = setup(false);

					const result = await askDeleteFilesConfirmation(fileRecords);

					expect(result).toBe(false);
				});
			});
		});

		describe("when single filerecord should be confirmed and confirmation is true", () => {
			const setup = (isConfirmed: boolean) => {
				const fileRecord = fileRecordFactory.build();

				const confirmationMock = jest.mocked(useConfirmationDialog);

				const askConfirmation = jest.fn().mockResolvedValueOnce(isConfirmed);
				const isDialogOpen = ref(false);

				const mocks = {
					askConfirmation,
					isDialogOpen,
				};

				confirmationMock.mockReturnValue(mocks);

				const translateMock = jest
					.fn()
					.mockImplementation(
						(key: string, dynamic?: object): string =>
							key + (dynamic ? ` ${JSON.stringify(dynamic)}` : "")
					);
				useI18nMock.mockReturnValue({
					t: translateMock,
				});

				const { askDeleteFilesConfirmation } = mountComposable(
					() => useDeleteFilesConfirmationDialog(),
					{
						global: { plugins: [createTestingI18n()] },
					}
				);

				return {
					askDeleteFilesConfirmation,
					translateMock,
					fileRecord,
					askConfirmation,
				};
			};
			describe("when confirmation is true", () => {
				it("should call translate functions", async () => {
					const { askDeleteFilesConfirmation, translateMock, fileRecord } =
						setup(true);

					await askDeleteFilesConfirmation([fileRecord]);

					expect(translateMock).toHaveBeenNthCalledWith(
						1,
						"pages.folder.delete-confirmation",
						{
							name: fileRecord.name,
						}
					);
				});

				it("should call askConfirmation", async () => {
					const { askDeleteFilesConfirmation, fileRecord, askConfirmation } =
						setup(true);

					await askDeleteFilesConfirmation([fileRecord]);

					expect(askConfirmation).toHaveBeenCalledWith({
						confirmActionLangKey: "common.actions.delete",
						message: expect.stringContaining(
							"pages.folder.delete-confirmation"
						),
					});
				});

				it("should return result", async () => {
					const { askDeleteFilesConfirmation, fileRecord } = setup(true);

					const result = await askDeleteFilesConfirmation([fileRecord]);

					expect(result).toBe(true);
				});
			});

			describe("when confirmation is false", () => {
				it("should return result", async () => {
					const { askDeleteFilesConfirmation, fileRecord } = setup(false);

					const result = await askDeleteFilesConfirmation([fileRecord]);

					expect(result).toBe(false);
				});
			});
		});
	});
});
