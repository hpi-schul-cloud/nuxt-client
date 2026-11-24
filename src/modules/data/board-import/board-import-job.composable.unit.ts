import { useBoardImportJob } from "./board-import-job.composable";
import { initializeAxios } from "@/utils/api";
import { mockApi, mockApiResponse, mockAxiosInstance, mountComposable } from "@@/tests/test-utils";
import * as boardImportApiModule from "@api-board-import";
import { BoardImportJobStatus, BoardImportTargetType } from "@api-board-import";
import { Mocked } from "vitest";

describe("useBoardImportJob", () => {
	let boardImportApi: Mocked<boardImportApiModule.BoardImportApiInterface>;

	const link = "https://example.com/board";
	const targetType = BoardImportTargetType.ROOM;
	const targetId = "room-id";
	const jobId = "job-id";

	const mockJobResponse = (status: BoardImportJobStatus) => mockApiResponse({ data: { id: jobId, status } });

	beforeEach(() => {
		vi.useFakeTimers();
		initializeAxios(mockAxiosInstance());

		boardImportApi = mockApi<boardImportApiModule.BoardImportApiInterface>();
		vi.spyOn(boardImportApiModule, "BoardImportApiFactory").mockReturnValue(boardImportApi);
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	const setup = () => {
		boardImportApi.boardImportControllerStartImport.mockResolvedValue(mockJobResponse(BoardImportJobStatus.WAITING));
		boardImportApi.boardImportControllerGetJob.mockResolvedValue(mockJobResponse(BoardImportJobStatus.RUNNING));

		return mountComposable(() => useBoardImportJob());
	};

	describe("startImport", () => {
		it("should send the link and the target", async () => {
			const { startImport } = setup();

			await startImport(link, targetType, targetId);

			expect(boardImportApi.boardImportControllerStartImport).toHaveBeenCalledWith({ link, targetType, targetId });
		});

		it("should set the job", async () => {
			const { startImport, job } = setup();

			await startImport(link, targetType, targetId);

			expect(job.value).toEqual({ id: jobId, status: BoardImportJobStatus.WAITING });
		});

		it("should set the error and not poll when the request fails", async () => {
			const { startImport, job, hasError } = setup();
			boardImportApi.boardImportControllerStartImport.mockRejectedValue(new Error("failed"));

			await startImport(link, targetType, targetId);
			await vi.advanceTimersByTimeAsync(10000);

			expect(hasError.value).toBe(true);
			expect(job.value).toBeUndefined();
			expect(boardImportApi.boardImportControllerGetJob).not.toHaveBeenCalled();
		});
	});

	describe("polling", () => {
		it("should update the job every few seconds", async () => {
			const { startImport, job } = setup();
			await startImport(link, targetType, targetId);

			await vi.advanceTimersByTimeAsync(3000);

			expect(boardImportApi.boardImportControllerGetJob).toHaveBeenCalledWith(jobId);
			expect(job.value?.status).toBe(BoardImportJobStatus.RUNNING);
		});

		it.each([BoardImportJobStatus.FINISHED, BoardImportJobStatus.FAILED])(
			"should stop when the job has the status %s",
			async (status) => {
				const { startImport, job } = setup();
				boardImportApi.boardImportControllerGetJob.mockResolvedValue(mockJobResponse(status));
				await startImport(link, targetType, targetId);

				await vi.advanceTimersByTimeAsync(10000);

				expect(boardImportApi.boardImportControllerGetJob).toHaveBeenCalledTimes(1);
				expect(job.value?.status).toBe(status);
			}
		);

		it("should set the error and stop when the request fails", async () => {
			const { startImport, hasError } = setup();
			boardImportApi.boardImportControllerGetJob.mockRejectedValue(new Error("failed"));
			await startImport(link, targetType, targetId);

			await vi.advanceTimersByTimeAsync(10000);

			expect(hasError.value).toBe(true);
			expect(boardImportApi.boardImportControllerGetJob).toHaveBeenCalledTimes(1);
		});
	});

	describe("reset", () => {
		it("should clear the job and stop the polling", async () => {
			const { startImport, reset, job } = setup();
			await startImport(link, targetType, targetId);

			reset();
			await vi.advanceTimersByTimeAsync(10000);

			expect(job.value).toBeUndefined();
			expect(boardImportApi.boardImportControllerGetJob).not.toHaveBeenCalled();
		});
	});
});
