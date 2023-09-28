import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useSubmissionContentElementState } from "./SubmissionContentElementState.composable";
import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@/utils/mock-store-module";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { SubmissionsResponse } from "@/serverApi/v3";
import { submissionsResponseFactory } from "@@/tests/test-utils";

const notifierModule = createModuleMocks(NotifierModule);

const mockedSubmissionsResponse = submissionsResponseFactory.build();

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

	const setup = (
		contentElementId = "123123",
		submissionItems = [],
		users: [],
		dueDate = "2100-12-31T00:00:00.000Z"
	) => {
		return mountComposable(
			() =>
				useSubmissionContentElementState(
					contentElementId,
					submissionItems,
					users,
					dueDate
				),
			{
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			}
		);
	};

	describe("if the student created a submission item before", () => {
		it.skip("should return update function that updates the completed state", async () => {
			// const contentElementId = "123124";
			// mockedUseSubmissionItemApiCalls.fetchSubmissionItemsCall.mockReturnValue(
			// 	mockedSubmissionsResponse as unknown as Promise<SubmissionsResponse>
			// );
			// const { fetchSubmissionItems, updateSubmissionItem } =
			// 	setup(contentElementId);
			// await fetchSubmissionItems(contentElementId);
			// const completed = true;
			// await updateSubmissionItem(completed);
			// expect(
			// 	mockedUseSubmissionItemApiCalls.updateSubmissionItemCall
			// ).toHaveBeenLastCalledWith(
			// 	mockedSubmissionsResponse.submissionItemsResponse[0].id,
			// 	completed
			// );
		});
	});

	describe("if the student did not create a submission item so far", () => {
		it.skip("should return update function that creates initial completed state", async () => {
			// const contentElementId = "123124";
			// const submissions = submissionsResponseFactory.build();
			// submissions.submissionItemsResponse = [];
			// mockedUseSubmissionItemApiCalls.fetchSubmissionItemsCall.mockReturnValue(
			// 	submissions as unknown as Promise<SubmissionsResponse>
			// );
			// const { fetchSubmissionItems, updateSubmissionItem } =
			// 	setup(contentElementId);
			// await fetchSubmissionItems(contentElementId);
			// const completed = true;
			// await updateSubmissionItem(completed);
			// expect(
			// 	mockedUseSubmissionItemApiCalls.createSubmissionItemCall
			// ).toHaveBeenLastCalledWith(contentElementId, completed);
		});
	});
});
