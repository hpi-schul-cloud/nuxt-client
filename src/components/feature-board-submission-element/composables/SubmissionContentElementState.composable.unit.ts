import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useSubmissionContentElementState } from "./SubmissionContentElementState.composable";
import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@/utils/mock-store-module";
import { createMock } from "@golevelup/ts-jest";
import { submissionsResponseFactory } from "@@/tests/test-utils";
import { SubmissionItemResponse, UserDataResponse } from "@/serverApi/v3";

const notifierModule = createModuleMocks(NotifierModule);

jest.mock("./SubmissionItemApi.composable");
const mockedUseSubmissionItemApi = jest.mocked(useSubmissionItemApi);

const mockedUseSubmissionItemApiCalls =
	createMock<ReturnType<typeof useSubmissionItemApi>>();
mockedUseSubmissionItemApi.mockReturnValue(mockedUseSubmissionItemApiCalls);

const mockedsubmissions = submissionsResponseFactory.build(
	{},
	{
		transient: {
			numberOfSubmissionItems: 1,
			numberOfUsers: 1,
			completed: false,
		},
	}
);
const mockedContentElementId = "123124";
const mockedDueDate = "2100-12-31T00:00:00.000Z";

describe("SubmissionContentElementState.composable", () => {
	const setup = (
		submissionItems: Array<SubmissionItemResponse> = [],
		users: Array<UserDataResponse> = []
	) => {
		return mountComposable(
			() =>
				useSubmissionContentElementState(
					mockedContentElementId,
					submissionItems,
					users,
					mockedDueDate
				),
			{
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			}
		);
	};

	describe("if the student created a submission item before", () => {
		it("should return update function that updates the completed state", async () => {
			const { updateSubmissionItem } = setup(
				mockedsubmissions.submissionItemsResponse,
				mockedsubmissions.users
			);

			const completed = true;
			await updateSubmissionItem(completed);

			expect(
				mockedUseSubmissionItemApiCalls.updateSubmissionItemCall
			).toHaveBeenLastCalledWith(
				mockedsubmissions.submissionItemsResponse[0].id,
				completed
			);
		});
	});

	describe("if the student did not create a submission item so far", () => {
		it("should return update function that creates initial completed state", async () => {
			const { updateSubmissionItem } = setup([], mockedsubmissions.users);

			const completed = true;
			await updateSubmissionItem(completed);

			expect(
				mockedUseSubmissionItemApiCalls.createSubmissionItemCall
			).toHaveBeenLastCalledWith(mockedContentElementId, completed);
		});
	});
});
