import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import * as serverApi from "@/serverApi/v3/api";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";

let elementApi: DeepMocked<serverApi.BoardElementApiInterface>;
let submissionItemApi: DeepMocked<serverApi.BoardSubmissionApiInterface>;

describe("SubmissionItemApi.composable", () => {
	beforeEach(() => {
		elementApi = createMock<serverApi.BoardElementApiInterface>();
		submissionItemApi = createMock<serverApi.BoardSubmissionApiInterface>();

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
