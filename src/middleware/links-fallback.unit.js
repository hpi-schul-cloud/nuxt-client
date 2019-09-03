// import must be after mock
jest.mock("../serverMiddleware/routes.js", () => [`^/news`]);
import linksFallback from "./links-fallback";

jest.useFakeTimers();

describe("@middleware/linksFallback", () => {
	it("use nuxt when a loop is detected", async () => {
		window.location.pathname = "/homework";
		const promise = linksFallback({ route: { path: "/homework" } });
		jest.runAllTimers();
		const result = await promise;
		expect(result).toBe(true);
		expect(window.location.pathname).toBe("/homework");
	});
	it("use vue route for whitelisted regex", async () => {
		window.location.pathname = "/news";
		const promise = linksFallback({ route: { path: "/news/add" } });
		jest.runAllTimers();
		const result = await promise;
		expect(result).toBe(true);
		expect(window.location.pathname).toBe("/news");
	});
	it("use legacy proxy for non matching routes", async () => {
		window.location.pathname = "/news";
		const promise = linksFallback({ route: { path: "/homework" } });
		jest.runAllTimers();
		const result = await promise;
		expect(result).not.toBe(true);
		expect(window.location.pathname).toBe("/homework");
	});
});
