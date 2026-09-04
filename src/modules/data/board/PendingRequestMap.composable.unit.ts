import { usePendingRequestMap } from "./PendingRequestMap.composable";

describe("usePendingRequestMap", () => {
	it("resolves a pending request", async () => {
		const { create, resolve } = usePendingRequestMap();
		const pendingRequest = create("id", "Request was replaced");

		resolve("id");

		await expect(pendingRequest).resolves.toBeUndefined();
	});

	it("rejects a pending request", async () => {
		const { create, reject } = usePendingRequestMap();
		const pendingRequest = create("id", "Request was replaced");

		reject("id", "Request failed");

		await expect(pendingRequest).rejects.toThrow("Request failed");
	});

	it("rejects the replaced request and resolves the newer request", async () => {
		const { create, resolve } = usePendingRequestMap();
		const replacedRequest = create("id", "Request was replaced");
		const newerRequest = create("id", "Request was replaced");

		resolve("id");

		await expect(replacedRequest).rejects.toThrow("Request was replaced");
		await expect(newerRequest).resolves.toBeUndefined();
	});

	it("rejects all pending requests", async () => {
		const { create, rejectAll } = usePendingRequestMap();
		const firstRequest = create("first", "Request was replaced");
		const secondRequest = create("second", "Request was replaced");

		rejectAll("Socket disconnected");

		await expect(firstRequest).rejects.toThrow("Socket disconnected");
		await expect(secondRequest).rejects.toThrow("Socket disconnected");
	});
});
