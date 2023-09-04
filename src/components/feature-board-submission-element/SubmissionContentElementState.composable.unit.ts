import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useSubmissionContentElementState } from "./SubmissionContentElementState.composable";
import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@/utils/mock-store-module";
import { SubmissionItemResponse } from "@/serverApi/v3";

const notifierModule = createModuleMocks(NotifierModule);

const mockedSubmissionItems: Array<SubmissionItemResponse> = [
	{
		id: "1",
		timestamps: {
			lastUpdatedAt: "",
			createdAt: "",
		},
		completed: true,
		userId: "456",
	},
];
jest.mock("./SubmissionItemApi.composable");

const mockedUseSubmissionItemApi = jest.mocked(useSubmissionItemApi);
const mockedCreateSubmissionItemCall = jest.fn();
const mockedUpdateSubmissionItemCall = jest.fn();
const mockedFetchSubmissionItemsCall = jest.fn();
mockedFetchSubmissionItemsCall.mockReturnValue(mockedSubmissionItems);

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

	it("should return fetch function that updates submission items and loading state", async () => {
		const contentElementId = "123124";

		const { fetchSubmissionItems, loading, submissionItems } =
			setup(contentElementId);

		expect(loading.value).toBe(true);
		expect(submissionItems.value.length).toBe(0);
		await fetchSubmissionItems(contentElementId);
		expect(mockedFetchSubmissionItemsCall).toHaveBeenCalledWith(
			contentElementId
		);
		expect(loading.value).toBe(false);
		expect(submissionItems.value.length).toEqual(mockedSubmissionItems.length);
	});

	it("should return update function that updates completed state", async () => {
		const contentElementId = "123124";
		const { updateSubmissionItem } = setup(contentElementId);

		const completed = true;
		await updateSubmissionItem(completed);
		expect(mockedCreateSubmissionItemCall).toHaveBeenLastCalledWith(
			contentElementId,
			completed
		);
	});
});
