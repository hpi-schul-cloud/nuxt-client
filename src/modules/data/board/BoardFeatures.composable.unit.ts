import { BoardFeature } from "@/serverApi/v3";
import { mountComposable } from "@@/tests/test-utils";
import { useBoardFeatures } from "./BoardFeatures.composable";
import { useBoardStore } from "./Board.store";
import { createMock } from "@golevelup/ts-jest";

vi.mock("./Board.store");
const mockedUseBoardStore = vi.mocked(useBoardStore);

describe("useBoardFeatures", () => {
	const setup = (props: BoardFeature[] | []) => {
		const mockedUseBoardStoreFeatures = createMock<
			ReturnType<typeof useBoardStore>
		>({
			getFeatures: props,
		});
		mockedUseBoardStore.mockReturnValue(mockedUseBoardStoreFeatures);
		return mountComposable(() => useBoardFeatures(), {});
	};

	describe("when feature is enabled", () => {
		it("should return true", () => {
			const { isFeatureEnabled } = setup([BoardFeature.Videoconference]);

			const result = isFeatureEnabled(BoardFeature.Videoconference);
			expect(result).toBe(true);
		});
	});

	describe("when no feature is present", () => {
		it("should return false", () => {
			const { isFeatureEnabled } = setup([]);

			const result = isFeatureEnabled(BoardFeature.Videoconference);
			expect(result).toBe(false);
		});
	});
});
