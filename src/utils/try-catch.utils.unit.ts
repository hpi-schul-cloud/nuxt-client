import { useTryCatch } from "./try-catch.utils";
import { describe, expect, it } from "vitest";

describe("useTryCatch", () => {
	it("should return [null, result] on success", async () => {
		const [error, result] = await useTryCatch(() => Promise.resolve("success"));

		expect(error).toBeNull();
		expect(result).toBe("success");
	});

	it("should return [Error, null] on error", async () => {
		const [error, result] = await useTryCatch(() => Promise.reject(new Error("Failed")));

		expect(error).toBeInstanceOf(Error);
		expect(error?.message).toBe("Failed");
		expect(result).toBeNull();
	});

	it("should convert non-Error throws to Error", async () => {
		const [error, result] = await useTryCatch(() => Promise.reject("string error"));

		expect(error).toBeInstanceOf(Error);
		expect(error?.message).toBe("string error");
		expect(result).toBeNull();
	});
});
