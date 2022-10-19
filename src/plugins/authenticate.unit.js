import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import authenticate from "./authenticate";

describe("@/plugins/authenticate", () => {
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
});
