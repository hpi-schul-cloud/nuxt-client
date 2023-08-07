import { I18N_KEY } from "@/utils/inject";
import setupConfirmationComposableMock from "./test-utils/setupConfirmationComposableMock";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useDeleteConfirmationDialog } from "./DeleteConfirmation.composable";
jest.mock("./Confirmation.composable");

describe("DeleteConfirmation composable", () => {
	describe("askDeleteConfirmation", () => {
		const setup = (isConfirmed: boolean) => {
			const title = "title";
			const titleString = `"${title}"`;
			const type: "boardCard" | "boardElement" = "boardElement";
			const typeString = `components.${type}`;
			const titleTranslationKey = "ui-confirmation-dialog.ask-delete.card";
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
				{
					[I18N_KEY.valueOf()]: { t: translateMock },
				}
			);

			return {
				askDeleteConfirmation,
				askConfirmation,
				data,
				translateMock,
				type,
				typeString,
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
					type,
					typeString,
					title,
					titleString,
					titleTranslationKey,
				} = setup(true);

				await askDeleteConfirmation(title, type);

				expect(translateMock).toHaveBeenNthCalledWith(1, typeString);
				expect(translateMock).toHaveBeenNthCalledWith(2, titleTranslationKey, {
					title: titleString,
					type: typeString,
				});
			});

			it("should call askConfirmation", async () => {
				const {
					askDeleteConfirmation,
					askConfirmation,
					title,
					type,
					titleTranslationKey,
				} = setup(true);

				await askDeleteConfirmation(title, type);

				expect(askConfirmation).toHaveBeenCalledWith({
					message: titleTranslationKey,
				});
			});

			it("should return result", async () => {
				const { askDeleteConfirmation, title, type } = setup(true);

				const result = await askDeleteConfirmation(title, type);

				expect(result).toBe(true);
			});
		});

		describe("when title is undefined", () => {
			it("should call translate functions", async () => {
				const {
					askDeleteConfirmation,
					translateMock,
					type,
					typeString,
					titleTranslationKey,
				} = setup(true);

				await askDeleteConfirmation("", type);

				expect(translateMock).toHaveBeenNthCalledWith(1, typeString);
				expect(translateMock).toHaveBeenNthCalledWith(2, titleTranslationKey, {
					title: "",
					type: typeString,
				});
			});

			it("should call askConfirmation", async () => {
				const {
					askDeleteConfirmation,
					askConfirmation,
					type,
					titleTranslationKey,
				} = setup(true);

				await askDeleteConfirmation("", type);

				expect(askConfirmation).toHaveBeenCalledWith({
					message: titleTranslationKey,
				});
			});

			it("should return result", async () => {
				const { askDeleteConfirmation, type } = setup(true);

				const result = await askDeleteConfirmation("", type);

				expect(result).toBe(true);
			});
		});
	});
});
