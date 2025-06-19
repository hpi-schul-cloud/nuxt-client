import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useSubmissionContentElementState } from "./SubmissionContentElementState.composable";
import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { ref } from "vue";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { SubmissionsResponse } from "@/serverApi/v3";
import { submissionsResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";

const notifierModule = createModuleMocks(NotifierModule);

const mockedSubmissionsResponse = submissionsResponseFactory.build();

vi.mock("./SubmissionItemApi.composable");
const mockedUseSubmissionItemApi = vi.mocked(useSubmissionItemApi);

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
		vi.resetAllMocks();
	});

	const setup = (
		contentElementId = "123123",
		dueDate = ref({ dueDate: "2100-12-31T00:00:00.000Z" })
	) => {
		return mountComposable(
			() => useSubmissionContentElementState(contentElementId, dueDate),
			{
				global: {
					plugins: [createTestingI18n()],
					provide: {
						[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					},
				},
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

	describe("isOverdue state", () => {
		it("should be true if dueDate is in past", async () => {
			const contentElementId = "123124";
			const dueDateInPast = ref({ dueDate: "2000-12-31T00:00:00.000Z" });

			const { isOverdue } = setup(contentElementId, dueDateInPast);

			expect(isOverdue.value).toBe(true);
		});

		it("should be false if dueDate is in future", async () => {
			const contentElementId = "123124";
			const dueDateInFuture = ref({ dueDate: "2100-12-31T00:00:00.000Z" });

			const { isOverdue } = setup(contentElementId, dueDateInFuture);

			expect(isOverdue.value).toBe(false);
		});
	});

	it("should return fetch function that updates submission items and loading state", async () => {
		const contentElementId = "123124";
		mockedUseSubmissionItemApiCalls.fetchSubmissionItemsCall.mockReturnValue(
			mockedSubmissionsResponse as unknown as Promise<SubmissionsResponse>
		);

		const { fetchSubmissionItems, loading, submissions } =
			setup(contentElementId);

		expect(loading.value).toBe(true);
		expect(submissions.value.length).toBe(0);

		await fetchSubmissionItems(contentElementId);

		expect(
			mockedUseSubmissionItemApiCalls.fetchSubmissionItemsCall
		).toHaveBeenCalledWith(contentElementId);
		expect(loading.value).toBe(false);
		expect(submissions.value.length).toEqual(
			mockedSubmissionsResponse.submissionItemsResponse.length
		);
	});

	describe("if the student created a submission item before", () => {
		it("should return update function that updates the completed state", async () => {
			const contentElementId = "123124";
			mockedUseSubmissionItemApiCalls.fetchSubmissionItemsCall.mockReturnValue(
				mockedSubmissionsResponse as unknown as Promise<SubmissionsResponse>
			);

			const { fetchSubmissionItems, updateSubmissionItem } =
				setup(contentElementId);

			await fetchSubmissionItems(contentElementId);

			const completed = true;
			await updateSubmissionItem(completed);
			expect(
				mockedUseSubmissionItemApiCalls.updateSubmissionItemCall
			).toHaveBeenLastCalledWith(
				mockedSubmissionsResponse.submissionItemsResponse[0].id,
				completed
			);
		});
	});

	describe("if the student did not create a submission item so far", () => {
		it("should return update function that creates initial completed state", async () => {
			const contentElementId = "123124";
			const submissions = submissionsResponseFactory.build();
			submissions.submissionItemsResponse = [];
			mockedUseSubmissionItemApiCalls.fetchSubmissionItemsCall.mockReturnValue(
				submissions as unknown as Promise<SubmissionsResponse>
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
