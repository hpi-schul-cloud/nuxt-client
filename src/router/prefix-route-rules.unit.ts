import { isCompletePrefixedRoute, isIncompletePrefixedRoute } from "@/router/prefix-route-rules";

describe("prefix-route-rules", () => {
	it("treats complete prefixed routes as complete", () => {
		expect(isCompletePrefixedRoute("/boards/507f1f77bcf86cd799439011")).toBe(true);
		expect(isCompletePrefixedRoute("/boards/507f1f77bcf86cd799439011/cards/507f1f77bcf86cd799439012")).toBe(true);
	});

	it("does not treat incomplete prefixed routes as complete", () => {
		expect(isCompletePrefixedRoute("/boards")).toBe(false);
		expect(isCompletePrefixedRoute("/boards/507f1f77bcf86cd799439011/cards")).toBe(false);
	});

	it("treats incomplete prefixed routes as incomplete", () => {
		expect(isIncompletePrefixedRoute("/boards")).toBe(true);
		expect(isIncompletePrefixedRoute("/boards/507f1f77bcf86cd799439011/cards")).toBe(true);
	});

	it("does not treat complete prefixed routes as incomplete", () => {
		expect(isIncompletePrefixedRoute("/boards/507f1f77bcf86cd799439011")).toBe(false);
		expect(isIncompletePrefixedRoute("/boards/507f1f77bcf86cd799439011/cards/507f1f77bcf86cd799439012")).toBe(false);
	});

	it("ignores unrelated routes", () => {
		expect(isCompletePrefixedRoute("/dashboard")).toBe(false);
		expect(isIncompletePrefixedRoute("/dashboard")).toBe(false);
	});
});
