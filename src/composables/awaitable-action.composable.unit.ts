import { useAwaitableAction } from "./awaitable-action.composable";

describe("useAwaitableAction", () => {
	it("should complete with data", async () => {
		const { start, complete } = useAwaitableAction<{ message: string }>();
		const promise = start();
		complete({ message: "Hello, World!" });
		const result = await promise;
		expect(result).toEqual({ completed: true, data: { message: "Hello, World!" } });
	});

	it("should cancel without data", async () => {
		const { start, cancel } = useAwaitableAction();
		const promise = start();
		cancel();
		const result = await promise;
		expect(result).toEqual({ completed: false, data: undefined });
	});

	it("should handle multiple starts and completes", async () => {
		const { start, complete } = useAwaitableAction<number>();
		const promise1 = start();
		const promise2 = start();
		complete(42);
		const result1 = await promise1;
		const result2 = await promise2;
		expect(result1).toEqual({ completed: true, data: 42 });
		expect(result2).toEqual({ completed: true, data: 42 });
	});

	it("should handle multiple starts and cancels", async () => {
		const { start, cancel } = useAwaitableAction<string>();
		const promise1 = start();
		const promise2 = start();
		cancel();
		const result1 = await promise1;
		const result2 = await promise2;
		expect(result1).toEqual({ completed: false, data: undefined });
		expect(result2).toEqual({ completed: false, data: undefined });
	});

	it("should return the same promise if start is called multiple times while active", async () => {
		const { start, complete } = useAwaitableAction();
		const promise1 = start();
		const promise2 = start();
		expect(promise1).toBe(promise2);
		complete(true);
		const result1 = await promise1;
		const result2 = await promise2;
		expect(result1).toEqual({ completed: true, data: true });
		expect(result2).toEqual({ completed: true, data: true });
	});

	it("should report active state correctly", async () => {
		const { start, complete, cancel, isActive } = useAwaitableAction();
		expect(isActive.value).toBe(false);
		start();
		expect(isActive.value).toBe(true);
		complete(true);
		expect(isActive.value).toBe(false);
		start();
		expect(isActive.value).toBe(true);
		cancel();
		expect(isActive.value).toBe(false);
	});
});
