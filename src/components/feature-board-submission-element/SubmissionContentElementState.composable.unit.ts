import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useSubmissionContentElementState } from "./SubmissionContentElementState.composable";
import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@/utils/mock-store-module";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { SubmissionItemResponse } from "@/serverApi/v3";
import { submissionItemResponseFactory } from "@@/tests/test-utils";

const notifierModule = createModuleMocks(NotifierModule);

const mockedSubmissionItems: Array<SubmissionItemResponse> = [
	submissionItemResponseFactory.build(),
];

jest.mock("./SubmissionItemApi.composable");
const mockedUseSubmissionItemApi = jest.mocked(useSubmissionItemApi);

describe("SubmissionContentElementState.composable", () => {
	let mockedUseSubmissionItemApiCalls: DeepMocked<
		ReturnType<typeof useSubmissionItemApi>
	>;

	beforeEach(() => {
		mockedUseSubmissionItemApiCalls =
			createMock<ReturnType<typeof useSubmissionItemApi>>();
		mockedUseSubmissionItemApi.mockReturnValue(mockedUseSubmissionItemApiCalls);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	const setup = (contentElementId = "123123") => {
		return mountComposable(
			() => useSubmissionContentElementState(contentElementId),
			{
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			}
		);
	};

	it("should fetch submission items on mount", async () => {
		const contentElementId = "123124";

		setup(contentElementId);

		expect(
			mockedUseSubmissionItemApiCalls.fetchSubmissionItemsCall
		).toHaveBeenCalledWith(contentElementId);
	});

	it("should return fetch function that updates submission items and loading state", async () => {
		const contentElementId = "123124";
		mockedUseSubmissionItemApiCalls.fetchSubmissionItemsCall.mockReturnValue(
			mockedSubmissionItems as unknown as Promise<Array<SubmissionItemResponse>>
		);

		const { fetchSubmissionItems, loading, submissionItems } =
			setup(contentElementId);

		expect(loading.value).toBe(true);
		expect(submissionItems.value.length).toBe(0);

		await fetchSubmissionItems(contentElementId);

		expect(
			mockedUseSubmissionItemApiCalls.fetchSubmissionItemsCall
		).toHaveBeenCalledWith(contentElementId);
		expect(loading.value).toBe(false);
		expect(submissionItems.value.length).toEqual(mockedSubmissionItems.length);
	});

	describe("if the student created a submission item before", () => {
		it("should return update function that updates the completed state", async () => {
			const contentElementId = "123124";
			mockedUseSubmissionItemApiCalls.fetchSubmissionItemsCall.mockReturnValue(
				mockedSubmissionItems as unknown as Promise<
					Array<SubmissionItemResponse>
				>
			);

			const { fetchSubmissionItems, updateSubmissionItem } =
				setup(contentElementId);

			await fetchSubmissionItems(contentElementId);

			const completed = true;
			await updateSubmissionItem(completed);
			expect(
				mockedUseSubmissionItemApiCalls.updateSubmissionItemCall
			).toHaveBeenLastCalledWith(mockedSubmissionItems[0].id, completed);
		});
	});

	describe("if the student did not create a submission item so far", () => {
		it("should return update function that creates initial completed state", async () => {
			const contentElementId = "123124";
			mockedUseSubmissionItemApiCalls.fetchSubmissionItemsCall.mockReturnValue(
				[] as unknown as Promise<Array<SubmissionItemResponse>>
			);

			const { fetchSubmissionItems, updateSubmissionItem } =
				setup(contentElementId);

			await fetchSubmissionItems(contentElementId);

			const completed = true;
			await updateSubmissionItem(completed);
			expect(
				mockedUseSubmissionItemApiCalls.createSubmissionItemCall
			).toHaveBeenLastCalledWith(contentElementId, completed);
		});
	});
});
