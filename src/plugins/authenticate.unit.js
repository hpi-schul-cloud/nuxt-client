import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import authenticate, { composeUrl } from "./authenticate";

describe("@plugins/authenticate", () => {
	beforeEach(() => {
		setupStores({ auth: AuthModule, "env-config": EnvConfigModule });
	});

	it.skip("should log an error if jwt is undefined and page is not public", () => {
		const consoleError = jest.spyOn(console, "error").mockImplementation();

		window.location.pathname = "/";
		const mockContext = {
			route: { meta: [] },
			app: {
				$cookies: {
					get: () => undefined,
				},
			},
		};
		authenticate(mockContext);
		// const errors = consoleError.mock.calls.map((e) => e.toString());
		expect(consoleError).toHaveBeenCalled();
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
					if (eventName === "env-config/get") return;
					calls += action === "auth/logout" ? 1 : 0;
				},
			},
		};
		authenticate(mockContext);
		expect(calls).toBe(0);
	});

	describe("composeUrl", () => {
		it("should work if no path or params are given", () => {
			const url = composeUrl("https://example.com");
			expect(url).toBe("https://example.com/");
		});

		it("should use given path", () => {
			const url = composeUrl("https://example.com", "login");
			expect(url).toBe("https://example.com/login");
		});

		it("should add given parameters", () => {
			const url = composeUrl("https://example.com", "login", {
				foo: "bar",
				route: 66,
			});
			expect(url).toBe("https://example.com/login?foo=bar&route=66");
		});

		it("should ignore parameters in path", () => {
			const url = composeUrl("https://example.com", "login?baz=ra", {
				foo: "bar",
				route: 66,
			});
			expect(url).toBe("https://example.com/login?foo=bar&route=66");
		});

		it("should ignore path in baseUrl", () => {
			const url = composeUrl("https://example.com/some-other-path", "login", {
				foo: "bar",
				route: 66,
			});
			expect(url).toBe("https://example.com/login?foo=bar&route=66");
		});
	});
});
