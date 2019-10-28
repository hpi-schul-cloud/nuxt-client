import authenticate from "./authenticate";

describe("@plugins/authenticate", () => {
	it("dispatches logout action if jwt is undefined", () => {
		window.location.pathname = "/";
		let calls = 0;
		const mockContext = {
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

	it("skip on proxy error page", () => {
		window.location.pathname = "/error/proxy";
		let calls = 0;
		const mockContext = {
			app: {
				$cookie: {
					get: () => {
						calls += 1;
						("abc");
					},
				},
			},
			store: {
				dispatch: () => {
					calls += 1;
				},
				commit: () => {
					calls += 1;
				},
			},
		};
		authenticate(mockContext);
		expect(calls).toBe(0);
	});
});
