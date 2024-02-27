import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useConfirmationDialog } from "./Confirmation.composable";
import { createTestingI18n } from "@@/tests/test-utils/setup";

describe("Confirmation composable", () => {
	describe("askConfirmation", () => {
		const setup = () => {
			const { askConfirmation, isDialogOpen } = mountComposable(
				() => useConfirmationDialog(),
				{
					global: { plugins: [createTestingI18n()] },
				}
			);

			return {
				askConfirmation,
				isDialogOpen,
			};
		};

		beforeEach(() => {
			jest.clearAllMocks();
		});

		describe("when askConfirmation is called", () => {
			it("should open the confirmation dialog", async () => {
				const { askConfirmation, isDialogOpen } = setup();

				expect(isDialogOpen.value).toBe(false);

				askConfirmation({ message: "super?" });

				expect(isDialogOpen.value).toBe(true);
			});
		});
	});
});
