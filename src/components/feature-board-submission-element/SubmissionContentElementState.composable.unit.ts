import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useSubmissionContentElementState } from "./SubmissionContentElementState.composable";
import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@/utils/mock-store-module";

const notifierModule = createModuleMocks(NotifierModule);

jest.mock("./SubmissionItemApi.composable");
const mockedUseSubmissionItemApi = jest.mocked(useSubmissionItemApi);
const mockedCreateSubmissionItemCall = jest.fn();
const mockedUpdateSubmissionItemCall = jest.fn();
const mockedFetchSubmissionItemsCall = jest.fn();
const mocks = {
	createSubmissionItemCall: mockedCreateSubmissionItemCall,
	updateSubmissionItemCall: mockedUpdateSubmissionItemCall,
	fetchSubmissionItemsCall: mockedFetchSubmissionItemsCall,
};
mockedUseSubmissionItemApi.mockReturnValue(mocks);

const setup = (contentElementId = "123123") => {
	return mountComposable(
		() => useSubmissionContentElementState(contentElementId),
		{
			[I18N_KEY.valueOf()]: { t: (key: string) => key },
			[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
		}
	);
};

describe("SubmissionContentElementState composable", () => {
	it("should fetch submission items on mount", async () => {
		const contentElementId = "123124";

		setup(contentElementId);

		expect(mockedFetchSubmissionItemsCall).toHaveBeenCalledWith(
			contentElementId
		);
	});

	it("should return update function that creates or updates completed state", async () => {
		const contentElementId = "123124";
		const { updateSubmissionItem } = setup(contentElementId);

		const completed = true;
		await updateSubmissionItem(completed);
		expect(mockedCreateSubmissionItemCall).toHaveBeenLastCalledWith(
			contentElementId,
			completed
		);

		// completed = false;
		// await updateSubmissionItem(completed);
		// expect(mockedCreateSubmissionItemCall).toHaveBeenLastCalledWith(
		// 	contentElementId,
		// 	completed
		// );
	});
});
