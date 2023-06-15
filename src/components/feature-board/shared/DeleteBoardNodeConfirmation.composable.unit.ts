import { I18N_KEY } from "@/utils/inject";
import { setupDeleteConfirmationMock } from "@@/tests/test-utils/composable-mocks/deleteConfirmationMock";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useDeleteBoardNodeConfirmation } from "./DeleteBoardNodeConfirmation.composable";
jest.mock(
	"@/components/feature-confirmation-dialog/delete-confirmation.composable"
);

describe("DeleteBoardNodeConfirmation composable", () => {
	const setup = (isConfirmed: boolean) => {
		const deleteElement = jest.fn();
		const data = {
			elementId: "elementId",
			name: "name",
		};

		const { onDeleteElement, askDeleteBoardNodeConfirmation } = mountComposable(
			() => useDeleteBoardNodeConfirmation(deleteElement),
			{
				[I18N_KEY as symbol]: { t: (key: string) => key },
			}
		);

		const askConfirmationMock = jest.fn().mockResolvedValueOnce(isConfirmed);
		const { askConfirmation } = setupDeleteConfirmationMock({
			askConfirmationMock,
		});

		return {
			deleteElement,
			askDeleteBoardNodeConfirmation,
			askConfirmation,
			onDeleteElement,
			data,
		};
	};

	describe("onDeleteElement", () => {
		describe("when askDeleteBoardNodeConfirmation returns true", () => {
			it("should call deleteElement", async () => {
				const { onDeleteElement, deleteElement, data } = setup(true);

				await onDeleteElement(data);

				expect(deleteElement).toHaveBeenCalledWith(data.elementId);
			});
		});

		describe("when askDeleteBoardNodeConfirmation returns false", () => {
			it("should not call deleteElement", async () => {
				const { onDeleteElement, deleteElement, data } = setup(false);

				await onDeleteElement(data);

				expect(deleteElement).not.toHaveBeenCalled();
			});
		});
	});

	describe("askDeleteBoardNodeConfirmation", () => {
		it("should call askConfirmation", async () => {
			const { askDeleteBoardNodeConfirmation, askConfirmation } = setup(true);

			await askDeleteBoardNodeConfirmation("name", "boardElement");

			expect(askConfirmation).toHaveBeenCalledWith({
				message: "components.cardHost.deletionModal.confirmation",
			});
		});

		it("should return result", async () => {
			const { askDeleteBoardNodeConfirmation } = setup(true);

			const result = await askDeleteBoardNodeConfirmation(
				"name",
				"boardElement"
			);

			expect(result).toBe(true);
		});
	});
});
