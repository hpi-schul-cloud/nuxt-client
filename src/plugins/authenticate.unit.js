import authenticate from "./authenticate";

describe("@plugins/authenticate", () => {
	it("dispatches logout action if jwt is undefined and page not public", () => {
		window.location.pathname = "/";
		let calls = 0;
		const mockContext = {
			route: { meta: [] },
			app: {
				$cookie: {
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
