import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import * as serverApi from "@/serverApi/v3/api";
import { mockApi } from "@@/tests/test-utils/mockApiFactory";
import { Mocked } from "vitest";

let elementApi: Mocked<serverApi.BoardElementApiInterface>;
let submissionItemApi: Mocked<serverApi.BoardSubmissionApiInterface>;

describe("SubmissionItemApi.composable", () => {
	beforeEach(() => {
		elementApi = mockApi<serverApi.BoardElementApiInterface>();
		submissionItemApi = mockApi<serverApi.BoardSubmissionApiInterface>();

		vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValue(elementApi);
		vi.spyOn(serverApi, "BoardSubmissionApiFactory").mockReturnValue(submissionItemApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("create submissionItem", () => {
		it("should call elementControllerCreateSubmissionItem api", async () => {
			const { createSubmissionItemCall } = useSubmissionItemApi();
			const elementId = "123124";
			const completed = true;

			await createSubmissionItemCall(elementId, completed);
			expect(elementApi.elementControllerCreateSubmissionItem).toHaveBeenCalledWith(elementId, {
				completed: completed,
			});
		});
	});

	describe("update submissionItem", () => {
		it("should call boardSubmissionControllerUpdateSubmissionItem api", async () => {
			const { updateSubmissionItemCall } = useSubmissionItemApi();
			const submissionItemId = "124125";
			const completed = true;

			await updateSubmissionItemCall(submissionItemId, completed);
			expect(submissionItemApi.boardSubmissionControllerUpdateSubmissionItem).toHaveBeenCalledWith(submissionItemId, {
				completed: completed,
			});
		});
	});

	describe("fetch submissionItems", () => {
		it("should call boardSubmissionControllerGetSubmissionItems api", async () => {
			const { fetchSubmissionItemsCall } = useSubmissionItemApi();
			const elementId = "123124";

			await fetchSubmissionItemsCall(elementId);
			expect(submissionItemApi.boardSubmissionControllerGetSubmissionItems).toHaveBeenCalledWith(elementId);
		});
	});
});
