import { I18N_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useConfirmationDialog } from "./Confirmation.composable";

describe("Confirmation composable", () => {
	describe("askConfirmation", () => {
		const setup = () => {
			const { askConfirmation, isDialogOpen } = mountComposable(
				() => useConfirmationDialog(),
				{
					global: {
						mocks: { t: (k: string) => k },
					},
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
