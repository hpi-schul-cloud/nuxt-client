import middleware from "./nuxtversion";

describe("@serverMiddleware/nuxtversion", () => {
	describe("/nuxtversion", () => {
		const req = { url: `/nuxtversion` };

		it("intercepts all requests matching /nuxtversion", async () => {
			const res = {
				setHeader: jest.fn(),
				write: jest.fn(),
				end: jest.fn(),
			};
			const next = jest.fn();
			middleware(req, res, next);
			expect(next.mock.calls).toHaveLength(0);
			expect(res.end.mock.calls).toHaveLength(1);
		});

		it("set's Content-Type header to json", async () => {
			const res = {
				setHeader: jest.fn(),
				write: jest.fn(),
				end: jest.fn(),
			};
			const next = jest.fn();
			middleware(req, res, next);
			expect(res.setHeader.mock.calls).toContainEqual([
				"Content-Type",
				expect.stringContaining("application/json"),
			]);
		});
	});

	describe("everything else", () => {
		const req = { url: `/` };
		it("calls next if route does not match /nuxtversion", async () => {
			const next = jest.fn();
			middleware(req, undefined, next);
			expect(next.mock.calls).toHaveLength(1);
		});

		it("does not modify the response if route does not match /nuxtversion", async () => {
			const res = {
				setHeader: jest.fn(),
				write: jest.fn(),
				end: jest.fn(),
			};
			const next = jest.fn();
			middleware(req, res, next);
			expect(res.setHeader.mock.calls).toHaveLength(0);
			expect(res.write.mock.calls).toHaveLength(0);
			expect(res.end.mock.calls).toHaveLength(0);
		});
	});
});
