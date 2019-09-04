import isAuthenticated from "@middleware/is-authenticated";

describe("@middleware/is-authenticated", () => {
	it("exports a function", () => {
		expect(typeof isAuthenticated).toBe("function");
	});
});
