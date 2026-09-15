import { usePendingRequestTracker } from "./PendingRequestMap.composable";

const isPending = async (promise: Promise<unknown>): Promise<boolean> => {
	let settled = false;
	promise.then(
		() => (settled = true),
		() => (settled = true)
	);

	const pendingState = new Promise<boolean>((resolve) => setTimeout(() => resolve(!settled), 0));
	// fake timers are enabled globally (tests/setup.js), so the timer has to be advanced explicitly
	await vi.advanceTimersByTimeAsync(0);

	return pendingState;
};

describe("usePendingRequestTracker", () => {
	describe("register", () => {
		it("keeps the request pending until it is settled", async () => {
			const { register } = usePendingRequestTracker();

			const pendingRequest = register("some-id", "Request was replaced");

			await expect(isPending(pendingRequest)).resolves.toBe(true);
		});

		describe("when a request with the same id is still pending", () => {
			it("rejects the replaced request and keeps the newer request", async () => {
				const { register, resolveById } = usePendingRequestTracker();
				const initialRequest = register("some-id", "Request was replaced");

				const newerRequest = register("some-id", "Request was replaced");
				resolveById("some-id");

				await expect(initialRequest).rejects.toThrow("Request was replaced");
				await expect(newerRequest).resolves.toBeUndefined();
			});
		});

		describe("when rejectActiveRequest is false", () => {
			it("keeps the replaced request pending", async () => {
				const { register, resolveById } = usePendingRequestTracker();
				const initialRequest = register("some-id", "Request was replaced");

				const newerRequest = register("some-id", "Request was replaced", false);
				resolveById("some-id");

				await expect(newerRequest).resolves.toBeUndefined();
				await expect(isPending(initialRequest)).resolves.toBe(true);
			});
		});

		describe("when a request with the same id has already been settled", () => {
			it("does not settle the previous request again", async () => {
				const { register, resolveById } = usePendingRequestTracker();
				const settledRequest = register("some-id", "Request was replaced");
				resolveById("some-id");

				const newerRequest = register("some-id", "Request was replaced");
				resolveById("some-id");

				await expect(settledRequest).resolves.toBeUndefined();
				await expect(newerRequest).resolves.toBeUndefined();
			});
		});
	});

	describe("resolveById", () => {
		it("resolves the pending request with the given id", async () => {
			const { register, resolveById } = usePendingRequestTracker();
			const pendingRequest = register("some-id", "Request was replaced");

			resolveById("some-id");

			await expect(pendingRequest).resolves.toBeUndefined();
		});

		it("settles the request", async () => {
			const { register, resolveById } = usePendingRequestTracker();
			const pendingRequest = register("some-id", "Request was replaced");

			resolveById("some-id");

			await expect(isPending(pendingRequest)).resolves.toBe(false);
		});

		it("leaves requests with other ids pending", async () => {
			const { register, resolveById } = usePendingRequestTracker();
			const firstRequest = register("first", "Request was replaced");
			const secondRequest = register("second", "Request was replaced");

			resolveById("first");

			await expect(firstRequest).resolves.toBeUndefined();
			await expect(isPending(secondRequest)).resolves.toBe(true);
		});

		describe("when no request with the given id is pending", () => {
			it("does nothing", () => {
				const { resolveById } = usePendingRequestTracker();

				expect(() => resolveById("unknown")).not.toThrow();
			});
		});
	});

	describe("rejectById", () => {
		it("rejects the pending request with the given id", async () => {
			const { register, rejectById } = usePendingRequestTracker();
			const pendingRequest = register("some-id", "Request was replaced");

			rejectById("some-id", "Request failed");

			await expect(pendingRequest).rejects.toThrow("Request failed");
		});

		it("leaves requests with other ids pending", async () => {
			const { register, rejectById } = usePendingRequestTracker();
			const firstRequest = register("first", "Request was replaced");
			const secondRequest = register("second", "Request was replaced");

			rejectById("first", "Request failed");

			await expect(firstRequest).rejects.toThrow("Request failed");
			await expect(isPending(secondRequest)).resolves.toBe(true);
		});

		describe("when no request with the given id is pending", () => {
			it("does nothing", () => {
				const { rejectById } = usePendingRequestTracker();

				expect(() => rejectById("unknown", "Request failed")).not.toThrow();
			});
		});
	});

	describe("rejectAll", () => {
		it("rejects all pending requests", async () => {
			const { register, rejectAll } = usePendingRequestTracker();
			const firstRequest = register("first", "Request was replaced");
			const secondRequest = register("second", "Request was replaced");

			rejectAll("Socket disconnected");

			await expect(firstRequest).rejects.toThrow("Socket disconnected");
			await expect(secondRequest).rejects.toThrow("Socket disconnected");
		});

		describe("when a request has already been settled", () => {
			it("leaves the settled request untouched", async () => {
				const { register, resolveById, rejectAll } = usePendingRequestTracker();
				const request = register("some-id", "Request was replaced");
				resolveById("some-id");

				rejectAll("Socket disconnected");

				await expect(request).resolves.toBeUndefined();
			});
		});

		describe("when no request is pending", () => {
			it("does nothing", () => {
				const { rejectAll } = usePendingRequestTracker();

				expect(() => rejectAll("Socket disconnected")).not.toThrow();
			});
		});
	});
});
