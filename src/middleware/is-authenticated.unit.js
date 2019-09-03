import isAuthenticated from "./is-authenticated";

describe("@middleware/is-authenticated", () => {
	it("exports a function", () => {
		expect(typeof isAuthenticated).toBe("function");
	});
});
