import { I18N_KEY } from "@/utils/inject";
import { setupDeleteConfirmationMock } from "@@/tests/test-utils/composable-mocks/deleteConfirmationMock";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useDeleteBoardNodeConfirmation } from "./DeleteBoardNodeConfirmation.composable";
jest.mock(
	"@/components/feature-confirmation-dialog/delete-confirmation.composable"
);

describe("DeleteBoardNodeConfirmation composable", () => {
	describe("askDeleteBoardNodeConfirmation", () => {
		const setup = (isConfirmed: boolean) => {
			const title = "title";
			const titleString = `"${title}"`;
			const type: "boardCard" | "boardElement" = "boardElement";
			const typeString = `components.${type}`;
			const titleTranslationKey =
				"components.cardHost.deletionModal.confirmation";
			const data = {
				elementId: "elementId",
				name: "name",
			};
			const askConfirmationMock = jest.fn().mockResolvedValueOnce(isConfirmed);
			const { askConfirmation } = setupDeleteConfirmationMock({
				askConfirmationMock,
			});

			const translateMock = jest.fn().mockImplementation((key: string) => key);

			const { askDeleteBoardNodeConfirmation } = mountComposable(
				() => useDeleteBoardNodeConfirmation(),
				{
					[I18N_KEY.valueOf()]: { t: translateMock },
				}
			);

			return {
				askDeleteBoardNodeConfirmation,
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
					askDeleteBoardNodeConfirmation,
					translateMock,
					type,
					typeString,
					title,
					titleString,
					titleTranslationKey,
				} = setup(true);

				await askDeleteBoardNodeConfirmation(title, type);

				expect(translateMock).toHaveBeenNthCalledWith(1, typeString);
				expect(translateMock).toHaveBeenNthCalledWith(2, titleTranslationKey, {
					title: titleString,
					type: typeString,
				});
			});

			it("should call askConfirmation", async () => {
				const {
					askDeleteBoardNodeConfirmation,
					askConfirmation,
					title,
					type,
					titleTranslationKey,
				} = setup(true);

				await askDeleteBoardNodeConfirmation(title, type);

				expect(askConfirmation).toHaveBeenCalledWith({
					message: titleTranslationKey,
				});
			});

			it("should return result", async () => {
				const { askDeleteBoardNodeConfirmation, title, type } = setup(true);

				const result = await askDeleteBoardNodeConfirmation(title, type);

				expect(result).toBe(true);
			});
		});

		describe("when title is undefined", () => {
			it("should call translate functions", async () => {
				const {
					askDeleteBoardNodeConfirmation,
					translateMock,
					type,
					typeString,
					titleTranslationKey,
				} = setup(true);

				await askDeleteBoardNodeConfirmation("", type);

				expect(translateMock).toHaveBeenNthCalledWith(1, typeString);
				expect(translateMock).toHaveBeenNthCalledWith(2, titleTranslationKey, {
					title: "",
					type: typeString,
				});
			});

			it("should call askConfirmation", async () => {
				const {
					askDeleteBoardNodeConfirmation,
					askConfirmation,
					type,
					titleTranslationKey,
				} = setup(true);

				await askDeleteBoardNodeConfirmation("", type);

				expect(askConfirmation).toHaveBeenCalledWith({
					message: titleTranslationKey,
				});
			});

			it("should return result", async () => {
				const { askDeleteBoardNodeConfirmation, type } = setup(true);

				const result = await askDeleteBoardNodeConfirmation("", type);

				expect(result).toBe(true);
			});
		});
	});
});
