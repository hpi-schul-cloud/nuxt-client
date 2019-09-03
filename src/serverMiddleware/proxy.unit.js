// import must be after mock
jest.mock("./routes.js", () => [`^/news`]);
jest.mock("http-proxy-middleware", () => () => (req, res, next) => ({
	type: "proxy",
	req,
	res,
	next,
}));
const next = jest.fn(() => ({ type: "next" }));
import proxy from "./proxy";

describe("@serverMiddleware/proxy", () => {
	it("use legacy proxy for non GET requests", async () => {
		const req = { method: "POST" };
		const result = await proxy(req, undefined, next);
		expect(next.mock.calls.length).toBe(0);
		expect(result.type).toBe("proxy");
	});
	it("use vue route for whitelisted regex", async () => {
		const req = { method: "GET", url: "/news/add" };
		const result = await proxy(req, undefined, next);
		expect(next.mock.calls.length).toBe(1);
		expect(result.type).toBe("next");
	});
	it("use legacy proxy for non matching routes", async () => {
		const req = { method: "GET", url: "/homework" };
		const result = await proxy(req, undefined, next);
		expect(next.mock.calls.length).toBe(1);
		expect(result.type).toBe("proxy");
	});
});
