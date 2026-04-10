import { useBoardStore } from "./Board.store";
import { useBoardFeatures } from "./BoardFeatures.composable";
import { mockComposable, mountComposable } from "@@/tests/test-utils";
import { BoardFeature } from "@api-server";

vi.mock("./Board.store");
const mockedUseBoardStore = vi.mocked(useBoardStore);

describe("useBoardFeatures", () => {
	const setup = (props: BoardFeature[] | []) => {
		const mockedUseBoardStoreFeatures = mockComposable(useBoardStore, {
			getFeatures: props,
		});
		mockedUseBoardStore.mockReturnValue(mockedUseBoardStoreFeatures);
		return mountComposable(() => useBoardFeatures(), {});
	};

	describe("when feature is enabled", () => {
		it("should return true", () => {
			const { isFeatureEnabled } = setup([BoardFeature.VIDEOCONFERENCE]);

			const result = isFeatureEnabled(BoardFeature.VIDEOCONFERENCE);
			expect(result).toBe(true);
		});
	});

	describe("when no feature is present", () => {
		it("should return false", () => {
			const { isFeatureEnabled } = setup([]);

			const result = isFeatureEnabled(BoardFeature.VIDEOCONFERENCE);
			expect(result).toBe(false);
		});
	});
});
