import authenticate from "./authenticate";

describe("@plugins/authenticate", () => {
	it("should log an error if jwt is undefined and page is not public", () => {
		const consoleError = jest.spyOn(console, "error").mockImplementation();

		window.location.pathname = "/";
		const mockContext = {
			route: { meta: [] },
			app: {
				$cookies: {
					get: () => undefined,
				},
			},
			store: {
				dispatch: () => {
					// simulate store throwing error
					throw new Error("Can not read jwt from cookies.");
				},
				commit: () => {},
			},
		};
		authenticate(mockContext);
		const errors = consoleError.mock.calls.map((e) => e.toString());
		expect(errors).toContain(`Error: Can not read jwt from cookies.`);
	});

	it("dispatches logout action if jwt is undefined and page is not public", () => {
		window.location.pathname = "/";
		let calls = 0;
		const mockContext = {
			route: { meta: [] },
			app: {
				$cookies: {
					get: () => undefined,
				},
			},
			store: {
				dispatch: (service) => {
					if (service === "auth/logout") {
						calls += 1;
					}
				},
				commit: () => {},
			},
		};
		authenticate(mockContext);
		expect(calls).toBe(1);
	});

	it("skip logout action on public pages", () => {
		let calls = 0;
		const mockContext = {
			route: {
				meta: [{ isPublic: true }],
			},
			app: {
				$cookie: {
					get: () => {
						calls += 1;
						("some valid JWT");
					},
				},
			},
			store: {
				dispatch: () => {
					calls += action === "auth/logout" ? 1 : 0;
				},
			},
		};
		authenticate(mockContext);
		expect(calls).toBe(0);
	});
});
