import { useBoardImportJob } from "./board-import-job.composable";
import { initializeAxios } from "@/utils/api";
import { axiosErrorFactory, mockApi, mockApiResponse, mockAxiosInstance, mountComposable } from "@@/tests/test-utils";
import * as boardImportApiModule from "@api-board-import";
import { BoardImportJobStatus, BoardImportTargetType } from "@api-board-import";
import { Mocked } from "vitest";

describe("useBoardImportJob", () => {
	let boardImportApi: Mocked<boardImportApiModule.BoardImportApiInterface>;

	const link = "https://example.com/board";
	const targetType = BoardImportTargetType.ROOM;
	const targetId = "room-id";
	const jobId = "job-id";

	const mockJobResponse = (status: BoardImportJobStatus) => mockApiResponse({ data: { id: jobId, status, notes: [] } });

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

			expect(job.value).toEqual({ id: jobId, status: BoardImportJobStatus.WAITING, notes: [] });
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

	describe("error messages", () => {
		const rejectWithPayload = (data: unknown) => {
			const error = axiosErrorFactory.build();
			if (error.response) error.response.data = data;
			boardImportApi.boardImportControllerStartImport.mockRejectedValue(error);
		};

		it("should give the title and the message of the backend error", async () => {
			const { startImport, errorMessages } = setup();
			rejectWithPayload({ code: 403, type: "FORBIDDEN", title: "Forbidden", message: "Feature disabled" });

			await startImport(link, targetType, targetId);

			expect(errorMessages.value).toEqual(["Forbidden: Feature disabled"]);
		});

		it("should give the validation errors of the backend", async () => {
			const { startImport, errorMessages } = setup();
			rejectWithPayload({
				title: "API Validation Error",
				message: "API validation failed, see validationErrors for details",
				validationErrors: [{ field: ["link"], errors: ["link must be a URL address"] }],
			});

			await startImport(link, targetType, targetId);

			expect(errorMessages.value).toEqual([
				"API Validation Error: API validation failed, see validationErrors for details",
				"link: link must be a URL address",
			]);
		});

		it.each([
			["a string", "Bad Gateway"],
			["an object without message", { foo: "bar" }],
			["nothing", undefined],
		])("should give no messages when the payload is %s", async (_name, payload) => {
			const { startImport, errorMessages, hasError } = setup();
			rejectWithPayload(payload);

			await startImport(link, targetType, targetId);

			expect(hasError.value).toBe(true);
			expect(errorMessages.value).toEqual([]);
		});

		it("should give no messages when the error is not a response error", async () => {
			const { startImport, errorMessages } = setup();
			boardImportApi.boardImportControllerStartImport.mockRejectedValue(new Error("failed"));

			await startImport(link, targetType, targetId);

			expect(errorMessages.value).toEqual([]);
		});

		it("should clear the messages on the next start", async () => {
			const { startImport, errorMessages } = setup();
			rejectWithPayload({ title: "Forbidden", message: "Feature disabled" });
			await startImport(link, targetType, targetId);
			boardImportApi.boardImportControllerStartImport.mockResolvedValue(mockJobResponse(BoardImportJobStatus.WAITING));

			await startImport(link, targetType, targetId);

			expect(errorMessages.value).toEqual([]);
		});
	});

	describe("polling", () => {
		it("should update the job every second", async () => {
			const { startImport, job } = setup();
			await startImport(link, targetType, targetId);

			await vi.advanceTimersByTimeAsync(1000);

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

		it("should set the error and continue when the request fails", async () => {
			const { startImport, hasError } = setup();
			boardImportApi.boardImportControllerGetJob.mockRejectedValue(new Error("failed"));
			await startImport(link, targetType, targetId);

			await vi.advanceTimersByTimeAsync(2000);

			expect(hasError.value).toBe(true);
			expect(boardImportApi.boardImportControllerGetJob).toHaveBeenCalledTimes(2);
		});

		it("should clear the error when a later request succeeds", async () => {
			const { startImport, hasError, job } = setup();
			boardImportApi.boardImportControllerGetJob.mockRejectedValueOnce(new Error("failed"));
			await startImport(link, targetType, targetId);
			await vi.advanceTimersByTimeAsync(1000);

			await vi.advanceTimersByTimeAsync(1000);

			expect(hasError.value).toBe(false);
			expect(job.value?.status).toBe(BoardImportJobStatus.RUNNING);
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
			expect(vi.getTimerCount()).toBe(0);
		});

		it("should ignore a start response that arrives after the reset", async () => {
			const { startImport, reset, job, isStarting } = setup();
			const startResponse = Promise.withResolvers<ReturnType<typeof mockJobResponse>>();
			boardImportApi.boardImportControllerStartImport.mockReturnValueOnce(startResponse.promise);

			const importPromise = startImport(link, targetType, targetId);
			reset();
			startResponse.resolve(mockJobResponse(BoardImportJobStatus.WAITING));
			await importPromise;
			await vi.advanceTimersByTimeAsync(10000);

			expect(job.value).toBeUndefined();
			expect(isStarting.value).toBe(false);
			expect(boardImportApi.boardImportControllerGetJob).not.toHaveBeenCalled();
		});

		it("should ignore a status response that arrives after the reset", async () => {
			const { startImport, reset, job } = setup();
			const statusResponse = Promise.withResolvers<ReturnType<typeof mockJobResponse>>();
			boardImportApi.boardImportControllerGetJob.mockReturnValueOnce(statusResponse.promise);
			await startImport(link, targetType, targetId);
			await vi.advanceTimersByTimeAsync(1000);

			reset();
			statusResponse.resolve(mockJobResponse(BoardImportJobStatus.RUNNING));
			await vi.advanceTimersByTimeAsync(10000);

			expect(job.value).toBeUndefined();
			expect(boardImportApi.boardImportControllerGetJob).toHaveBeenCalledTimes(1);
		});
	});

	describe("when the component is unmounted during the start", () => {
		it("should not start the polling", async () => {
			const { startImport, wrapper } = setup();
			const startResponse = Promise.withResolvers<ReturnType<typeof mockJobResponse>>();
			boardImportApi.boardImportControllerStartImport.mockReturnValueOnce(startResponse.promise);

			const importPromise = startImport(link, targetType, targetId);
			wrapper.unmount();
			startResponse.resolve(mockJobResponse(BoardImportJobStatus.WAITING));
			await importPromise;
			await vi.advanceTimersByTimeAsync(10000);

			expect(boardImportApi.boardImportControllerGetJob).not.toHaveBeenCalled();
		});
	});
});
