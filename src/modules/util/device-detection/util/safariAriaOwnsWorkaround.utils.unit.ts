describe("safariAriaOwnsWorkaround", () => {
	const originalUserAgent = globalThis.window.navigator.userAgent;

	beforeEach(() => {
		Object.defineProperty(globalThis.window.navigator, "userAgent", {
			value: originalUserAgent,
			configurable: true,
		});
	});

	afterEach(() => {
		vi.resetModules();
	});

	it("returns workaround object for Safari", async () => {
		Object.defineProperty(globalThis.window.navigator, "userAgent", {
			value: "Mozilla/5.0 ... Safari/605.1.15",
			configurable: true,
		});
		const module = await import("./safariAriaOwnsWorkaround.utils");
		expect(module.safariAriaOwnsWorkaround).toStrictEqual({ "aria-owns": undefined });
	});

	it("returns empty object for Chrome", async () => {
		Object.defineProperty(globalThis.window.navigator, "userAgent", {
			value: "Mozilla/5.0 ... Chrome/95.0.4638.69 Safari/537.36",
			configurable: true,
		});
		const module = await import("./safariAriaOwnsWorkaround.utils");
		expect(module.safariAriaOwnsWorkaround).toStrictEqual({});
	});

	it("returns empty object for Firefox", async () => {
		Object.defineProperty(globalThis.window.navigator, "userAgent", {
			value: "Mozilla/5.0 ... Firefox/94.0",
			configurable: true,
		});
		const module = await import("./safariAriaOwnsWorkaround.utils");
		expect(module.safariAriaOwnsWorkaround).toStrictEqual({});
	});
});
