import { BoardFeature } from "@/serverApi/v3";
import { mountComposable } from "@@/tests/test-utils";
import { useBoardFeatures } from "./BoardFeatures.composable";
import { useBoardStore } from "./Board.store";
import { createMock } from "@golevelup/ts-jest";

jest.mock("./Board.store");
const mockedUseBoardStore = jest.mocked(useBoardStore);

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

	it("should determine if a feature is enabled", () => {
		const { isFeatureEnabled } = setup([BoardFeature.Videoconference]);

		const result = isFeatureEnabled(BoardFeature.Videoconference);
		expect(result).toBe(true);
	});

	it("should return false when no features are present", () => {
		const { isFeatureEnabled } = setup([]);

		const result = isFeatureEnabled(BoardFeature.Videoconference);
		expect(result).toBe(false);
	});
});
