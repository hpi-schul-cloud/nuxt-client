// import must be after mock
jest.mock("./routes.js", () => [`^/news`]);
jest.mock("http-proxy-middleware", () => () => (req, res, next) => ({
	type: "proxy",
	req,
	res,
	next,
}));
const getNextMock = () => jest.fn(() => ({ type: "next" }));
import proxy from "./proxy";

describe("@serverMiddleware/proxy", () => {
	it("use legacy proxy for non GET requests", async () => {
		const req = { method: "POST" };
		const next = getNextMock();
		const result = await proxy(req, undefined, next);
		expect(next.mock.calls.length).toBe(0);
		expect(result.type).toBe("proxy");
	});
	it("use vue route for whitelisted regex", async () => {
		const req = { method: "GET", url: "/news/add" };
		const next = getNextMock();
		const result = await proxy(req, undefined, next);
		expect(next.mock.calls.length).toBe(1);
		expect(result.type).toBe("next");
	});
	it("use vue when fallback disabled flag is set", async () => {
		process.env.FALLBACK_DISABLED = "true";
		const req = { method: "GET", url: "/homework" };
		const next = getNextMock();
		const result = await proxy(req, undefined, next);
		expect(next.mock.calls.length).toBe(1);
		expect(result.type).toBe("next");
		process.env.FALLBACK_DISABLED = undefined;
	});
	it("use legacy proxy for non matching routes", async () => {
		const req = { method: "GET", url: "/homework" };
		const next = getNextMock();
		const result = await proxy(req, undefined, next);
		expect(next.mock.calls.length).toBe(0);
		expect(result.type).toBe("proxy");
	});
});
