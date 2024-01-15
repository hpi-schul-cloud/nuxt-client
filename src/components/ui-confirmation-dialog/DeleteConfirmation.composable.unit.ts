import { I18N_KEY } from "@/utils/inject";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useDeleteConfirmationDialog } from "./DeleteConfirmation.composable";
jest.mock("./Confirmation.composable");

describe("DeleteConfirmation composable", () => {
	describe("askDeleteConfirmation", () => {
		const setup = (isConfirmed: boolean) => {
			const title = "title";
			const titleString = `"${title}"`;
			const typeLanguageKey:
				| "components.boardCard"
				| "components.boardElement" = "components.boardElement";
			const titleTranslationKey = "ui-confirmation-dialog.ask-delete";
			const data = {
				elementId: "elementId",
				name: "name",
			};
			const askConfirmationMock = jest.fn().mockResolvedValueOnce(isConfirmed);
			const { askConfirmation } = setupConfirmationComposableMock({
				askConfirmationMock,
			});

			const translateMock = jest.fn().mockImplementation((key: string) => key);

			const { askDeleteConfirmation } = mountComposable(
				() => useDeleteConfirmationDialog(),
				{ global: { mocks: { t: translateMock } } }
			);

			return {
				askDeleteConfirmation,
				askConfirmation,
				data,
				translateMock,
				typeLanguageKey,
				title,
				titleString,
				titleTranslationKey,
			};
		};

		beforeEach(() => {
			jest.clearAllMocks();
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
					title,
					typeLanguageKey,
					titleTranslationKey,
				} = setup(true);

				await askDeleteConfirmation(title, typeLanguageKey);

				expect(askConfirmation).toHaveBeenCalledWith({
					message: titleTranslationKey,
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
					typeLanguageKey,
					titleTranslationKey,
				} = setup(true);

				await askDeleteConfirmation("", typeLanguageKey);

				expect(askConfirmation).toHaveBeenCalledWith({
					message: titleTranslationKey,
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
