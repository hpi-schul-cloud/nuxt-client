import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useDeleteConfirmationDialog } from "./DeleteConfirmation.composable";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { useI18n } from "vue-i18n";
import { Mock } from "vitest";
vi.mock("./Confirmation.composable");

vi.mock("vue-i18n", () => {
	return {
		...vi.importActual("vue-i18n"),
		useI18n: vi.fn(),
	};
});
const useI18nMock = <Mock>useI18n;

describe("DeleteConfirmation composable", () => {
	describe("askDeleteConfirmation", () => {
		const setup = (isConfirmed: boolean) => {
			const title = "title";
			const titleString = ` "${title}"`;
			const typeLanguageKey:
				| "components.boardCard"
				| "components.boardElement" = "components.boardElement";
			const titleTranslationKey = "ui-confirmation-dialog.ask-delete";
			const confirmActionLangKey = "common.actions.delete";
			const data = {
				elementId: "elementId",
				name: "name",
			};
			const askConfirmationMock = vi.fn().mockResolvedValueOnce(isConfirmed);
			const { askConfirmation } = setupConfirmationComposableMock({
				askConfirmationMock,
			});

			const translateMock = vi
				.fn()
				.mockImplementation(
					(key: string, dynamic?: object): string =>
						key + (dynamic ? ` ${JSON.stringify(dynamic)}` : "")
				);
			useI18nMock.mockReturnValue({
				t: translateMock,
			});

			const { askDeleteConfirmation } = mountComposable(
				() => useDeleteConfirmationDialog(),
				{
					global: { plugins: [createTestingI18n()] },
				}
			);

			return {
				askDeleteConfirmation,
				askConfirmation,
				confirmActionLangKey,
				data,
				translateMock,
				typeLanguageKey,
				title,
				titleString,
				titleTranslationKey,
			};
		};

		beforeEach(() => {
			vi.clearAllMocks();
		});

		describe("when title is defined", () => {
			it("should call translate functions", async () => {
				const {
					askDeleteConfirmation,
					translateMock,
					typeLanguageKey,
					title,
					titleString,
					titleTranslationKey,
				} = setup(true);

				await askDeleteConfirmation(title, typeLanguageKey);

				expect(translateMock).toHaveBeenNthCalledWith(1, typeLanguageKey);
				expect(translateMock).toHaveBeenNthCalledWith(2, titleTranslationKey, {
					title: titleString,
					type: typeLanguageKey,
				});
			});

			it("should call askConfirmation", async () => {
				const {
					askDeleteConfirmation,
					askConfirmation,
					confirmActionLangKey,
					title,
					typeLanguageKey,
					titleTranslationKey,
				} = setup(true);

				await askDeleteConfirmation(title, typeLanguageKey);

				expect(askConfirmation).toHaveBeenCalledWith({
					confirmActionLangKey: expect.stringContaining(confirmActionLangKey),
					message: expect.stringContaining(titleTranslationKey),
				});
			});

			it("should return result", async () => {
				const { askDeleteConfirmation, title, typeLanguageKey } = setup(true);

				const result = await askDeleteConfirmation(title, typeLanguageKey);

				expect(result).toBe(true);
			});
		});

		describe("when title is undefined", () => {
			it("should call translate functions", async () => {
				const {
					askDeleteConfirmation,
					translateMock,
					typeLanguageKey,
					titleTranslationKey,
				} = setup(true);

				await askDeleteConfirmation("", typeLanguageKey);

				expect(translateMock).toHaveBeenNthCalledWith(1, typeLanguageKey);
				expect(translateMock).toHaveBeenNthCalledWith(2, titleTranslationKey, {
					title: "",
					type: typeLanguageKey,
				});
			});

			it("should call askConfirmation", async () => {
				const {
					askDeleteConfirmation,
					askConfirmation,
					confirmActionLangKey,
					typeLanguageKey,
					titleTranslationKey,
				} = setup(true);

				await askDeleteConfirmation("", typeLanguageKey);

				expect(askConfirmation).toHaveBeenCalledWith({
					confirmActionLangKey: expect.stringContaining(confirmActionLangKey),
					message: expect.stringContaining(titleTranslationKey),
				});
			});

			it("should return result", async () => {
				const { askDeleteConfirmation, typeLanguageKey } = setup(true);

				const result = await askDeleteConfirmation("", typeLanguageKey);

				expect(result).toBe(true);
			});
		});
	});
});
