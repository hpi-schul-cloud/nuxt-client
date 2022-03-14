import authenticate from "./authenticate";
import AuthModule from "@/store/auth";

describe("@plugins/authenticate", () => {
	it("should log an error if jwt is undefined and page is not public", () => {
		const authModule = new AuthModule({});
		authModule.populateUser = () => {
			throw new Error("Can not read jwt from cookies.");
		};
		authModule.logout = () => {
			throw new Error("Can not read jwt from cookies.");
		};
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

	it("dispatches logout action if jwt is undefined and page is not public", () => {
		const logoutSpy = jest.fn();
		window.location.pathname = "/";
		// let calls = 0;
		const mockContext = {
			route: { meta: [] },
			app: {
				$cookies: {
					get: () => undefined,
					remove: logoutSpy,
				},
			},
		};
		authenticate(mockContext);
		expect(logoutSpy).toHaveBeenCalled();
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
