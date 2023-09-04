import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useSubmissionContentElementState } from "./SubmissionContentElementState.composable";
import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@/utils/mock-store-module";
import { SubmissionItemResponse } from "@/serverApi/v3";
import { submissionItemResponseFactory } from "@@/tests/test-utils";

const notifierModule = createModuleMocks(NotifierModule);

const mockedSubmissionItems: Array<SubmissionItemResponse> = [
	submissionItemResponseFactory.build(),
];
jest.mock("./SubmissionItemApi.composable");
const mockedCreateSubmissionItemCall = jest.fn();
const mockedUpdateSubmissionItemCall = jest.fn();
const mockedFetchSubmissionItemsCall = jest.fn();

describe("SubmissionContentElementState.composable", () => {
	const setup = (contentElementId = "123123") => {
		const mockedUseSubmissionItemApi = jest.mocked(useSubmissionItemApi);

		mockedUseSubmissionItemApi.mockReturnValue({
			createSubmissionItemCall: mockedCreateSubmissionItemCall,
			updateSubmissionItemCall: mockedUpdateSubmissionItemCall,
			fetchSubmissionItemsCall: mockedFetchSubmissionItemsCall,
		});

		return mountComposable(
			() => useSubmissionContentElementState(contentElementId),
			{
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			}
		);
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should fetch submission items on mount", async () => {
		const contentElementId = "123124";

		setup(contentElementId);

		expect(mockedFetchSubmissionItemsCall).toHaveBeenCalledWith(
			contentElementId
		);
	});

	it("should return fetch function that updates submission items and loading state", async () => {
		const contentElementId = "123124";
		mockedFetchSubmissionItemsCall.mockReturnValue(mockedSubmissionItems);

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

	describe("if the student created a submission item before", () => {
		it("should return update function that updates the completed state", async () => {
			const contentElementId = "123124";
			mockedFetchSubmissionItemsCall.mockReturnValue(mockedSubmissionItems);

			const { fetchSubmissionItems, updateSubmissionItem } =
				setup(contentElementId);

			await fetchSubmissionItems(contentElementId);

			const completed = true;
			await updateSubmissionItem(completed);
			expect(mockedUpdateSubmissionItemCall).toHaveBeenLastCalledWith(
				mockedSubmissionItems[0].id,
				completed
			);
		});
	});

	describe("if the student did not create a submission item so far", () => {
		it("should return update function that creates initial completed state", async () => {
			const contentElementId = "123124";
			mockedFetchSubmissionItemsCall.mockReturnValue([]);

			const { fetchSubmissionItems, updateSubmissionItem } =
				setup(contentElementId);

			await fetchSubmissionItems(contentElementId);

			const completed = true;
			await updateSubmissionItem(completed);
			expect(mockedCreateSubmissionItemCall).toHaveBeenLastCalledWith(
				contentElementId,
				completed
			);
		});
	});
});
