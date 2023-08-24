import { handleWithNotifier } from "@/components/error-handling/handlers/handleWithNotifier";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { nextTick } from "vue";

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe(handleWithNotifier.name, () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	const setup = () => {
		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);
	};

	it("should call", async () => {
		setup();

		handleWithNotifier("notLoaded", "boardCard")();
		await nextTick();

		expect(mockedBoardNotifierCalls.generateErrorText).toHaveBeenCalledWith(
			"notLoaded",
			"boardCard"
		);
		expect(mockedBoardNotifierCalls.showCustomNotifier).toHaveBeenCalled();
	});
});
