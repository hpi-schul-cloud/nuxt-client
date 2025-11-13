import { useSafeAxiosTask, useSafeTask, useSafeTaskRunner } from "./async-tasks.composable";
import { useNotificationStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { createAxiosError } from "@util-axios-error";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

describe("useSafeTask", () => {
	let task: ReturnType<typeof useSafeTask>;

	beforeEach(() => {
		task = useSafeTask();
	});

	describe("Pattern 1: Async function with internal await", () => {
		it("should execute code after successful await", async () => {
			let executedAfter = false;

			await task.execute(async () => {
				await Promise.resolve("success");
				executedAfter = true;
			});

			expect(executedAfter).toBe(true);
			expect(task.status.value).toBe("completed");
		});

		it("should NOT execute code after failed await", async () => {
			let executedAfter = false;

			await task.execute(async () => {
				await Promise.reject(new Error("Failed"));
				executedAfter = true;
			});

			expect(executedAfter).toBe(false);
			expect(task.error.value?.message).toBe("Failed");
		});
	});

	describe("Pattern 2: Await with TaskResult", () => {
		it("should return success=true with result on success", async () => {
			const result = await task.execute(() => Promise.resolve("data"));

			expect(result.success).toBe(true);
			expect(result.result).toBe("data");
		});

		it("should return success=false on error", async () => {
			const result = await task.execute(() => Promise.reject(new Error("Failed")));

			expect(result.success).toBe(false);
			expect(result.result).toBeUndefined();
		});
	});

	describe("State management", () => {
		it("should set status to pending while running", async () => {
			await task.execute(() => {
				expect(task.status.value).toBe("pending");
				expect(task.isRunning.value).toBe(true);
				return Promise.resolve(true);
			});

			expect(task.status.value).toBe("completed");
			expect(task.isRunning.value).toBe(false);
		});

		it("should set status to error on failure", async () => {
			await task.execute(() => Promise.reject(new Error("Test")));

			expect(task.status.value).toBe("error");
			expect(task.error.value?.message).toBe("Test");
		});

		it("should clear error on new execution", async () => {
			await task.execute(() => Promise.reject(new Error("First")));
			expect(task.error.value).toBeDefined();

			await task.execute(() => Promise.resolve("success"));
			expect(task.error.value).toBeUndefined();
		});
	});

	describe("reset()", () => {
		it("should reset all state", async () => {
			await task.execute(() => Promise.reject(new Error("Test")));

			task.reset();

			expect(task.error.value).toBeUndefined();
			expect(task.status.value).toBe("");
			expect(task.isRunning.value).toBe(false);
		});
	});
});

describe("useSafeSingleTask", () => {
	it("should execute the same function multiple times", async () => {
		let counter = 0;
		const { data, run } = useSafeTaskRunner(() => Promise.resolve(++counter));

		const result1 = await run();
		const result2 = await run();
		const result3 = await run();

		expect(result1.success).toBe(true);
		expect(result1.result).toBe(1);
		expect(result2.result).toBe(2);
		expect(result3.result).toBe(3);
		expect(data.value).toBe(3);
	});

	it("should maintain error state across runs", async () => {
		let shouldFail = true;
		const task = useSafeTaskRunner(() =>
			shouldFail ? Promise.reject(new Error("Failed")) : Promise.resolve("success")
		);

		await task.run();
		expect(task.error.value?.message).toBe("Failed");
		expect(task.status.value).toBe("error");

		shouldFail = false;
		await task.run();
		expect(task.error.value).toBeUndefined();
		expect(task.status.value).toBe("completed");
	});
});

describe("useSafeAxiosTask", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	it("should not notify when task succeeds", async () => {
		const mockFn = vi.fn().mockResolvedValue("success");

		const { execute } = useSafeAxiosTask();
		await execute(mockFn, "Error message");

		expect(useNotificationStore().notify).not.toHaveBeenCalled();
	});

	it("should not notify when task fails but no error message provided", async () => {
		const mockFn = vi.fn().mockRejectedValue(new Error("Test error"));

		const { execute } = useSafeAxiosTask();
		await execute(mockFn);

		expect(useNotificationStore().notify).not.toHaveBeenCalled();
	});

	it("should notify with custom message when error occurs and message provided", async () => {
		const mockFn = vi.fn().mockRejectedValue(new Error("Test error"));

		const { execute } = useSafeAxiosTask();
		await execute(mockFn, "Something went wrong");

		expect(useNotificationStore().notify).toHaveBeenCalledWith(
			expect.objectContaining({ status: "error", text: "Something went wrong" })
		);
	});

	it("should notify with translated error code when axios error has matching translation", async () => {
		const axiosError = createAxiosError({
			data: { message: "Validation failed", code: 400, title: "", type: "" },
		});

		const mockFn = vi.fn().mockRejectedValue(axiosError);

		const { execute } = useSafeAxiosTask();
		await execute(mockFn, "Request failed");

		expect(useNotificationStore().notify).toHaveBeenCalledWith(
			expect.objectContaining({ status: "error", text: "Request failed 400 – Fehlerhafte Anfrage" })
		);
	});
});
