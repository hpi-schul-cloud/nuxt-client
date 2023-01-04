import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import authenticate from "./authenticate";
import { authModule, envConfigModule } from "@/store";

function mockWindowLocation(location) {
	const assignMock = jest.fn()
	Object.defineProperty(global, "window", {
		value: {
		  location: {
			...location,
			assign: assignMock,
		  }
		},
		writable: true
	  });
	return assignMock;
}

function mockContext(isPublic, hasValidJwt, hasInvalidJwt) {
	let jwt;
	if (hasValidJwt) {
		jwt = 'valid-jwt';
	}
	if (hasInvalidJwt) {
		jwt = 'invalid-jwt';
	}

	const cookies = {
		jwt
	};

	const contextMock = {
		route: {
			meta: [{ isPublic }],
		},
		app: {
			$cookies: {
				get: (name) =>  cookies[name],
			},
		},
		store: {
			dispatch: () => {
				if (eventName === "env-config/get") return;
			},
		},
	};
	return contextMock;
}

function mockAuthModule(hasValidJwt, hasInvalidJwt) {
	if (hasValidJwt === true) {
		jest.spyOn(authModule, "populateUser").mockImplementation();
	}

	if (hasInvalidJwt === false) {
		jest.spyOn(authModule, "populateUser").mockRejectedValue("not allowed...");
	}

	const authModuleLogout = jest.spyOn(authModule, "logout").mockResolvedValue();
	return authModuleLogout;
}

function setup({ isPublic = false, isThuringia = false, hasValidJwt = false, hasInvalidJwt = false }) {
	let SCHULPORTAL_URL;
	let SCHULCLOUD_URL;

	if (isThuringia) {
		SCHULPORTAL_URL = 'https://unit-test.schulportal-thueringen.de';
		SCHULCLOUD_URL = 'unit-test.schulcloud-thueringen.de';
	} else {
		SCHULCLOUD_URL = 'unit-test.one-schulcloud.de';
	}

	const URL = `https://${SCHULCLOUD_URL}/my-url-to-authenticate`;

	const windowLocationAssign = mockWindowLocation({ href: URL })

	envConfigModule.setEnvs({
		SC_THEME: isThuringia ? 'thr' : undefined,
		FEATURE_TSP_ENABLED: isThuringia,
		TSP_API_BASE_URL: SCHULPORTAL_URL,
		DOMAIN: SCHULCLOUD_URL,
	});

 	const contextMock = mockContext(isPublic, hasValidJwt, hasInvalidJwt);

	const authModuleLogout = mockAuthModule(hasValidJwt, hasInvalidJwt);

	return { contextMock, windowLocationAssign, authModuleLogout, SCHULPORTAL_URL, SCHULCLOUD_URL, URL };
};

describe("@plugins/authenticate", () => {
	beforeEach(() => {
		setupStores({ auth: AuthModule, "env-config": EnvConfigModule });
	});

	describe("authenticate public url", () => {
		it("should do nothing if url is public", async () => {
			const {
				contextMock,
				windowLocationAssign,
			} = setup({ isPublic: true, isThuringia: false });

			await authenticate(contextMock);

			expect(windowLocationAssign).toHaveBeenCalledTimes(0);
		});

		it("should do nothing if url is public - also if jwt is set", async () => {
			const {
				contextMock,
				windowLocationAssign,
			} = setup({ isPublic: true, isThuringia: false, hasValidJwt: true });

			await authenticate(contextMock);

			expect(windowLocationAssign).toHaveBeenCalledTimes(0);
		});
	});

	describe("authenticate private url", () => {
		describe("without JWT", () => {
			it("should redirect to login page ", async () => {
				const {
					contextMock,
					windowLocationAssign,
					SCHULCLOUD_URL,
					URL,
				} = setup({ isPublic: false, isThuringia: false });

				await authenticate(contextMock);

				const expectedRedirectUrl = `https://${SCHULCLOUD_URL}/login?redirect=${encodeURIComponent(URL)}`;
				expect(windowLocationAssign).toHaveBeenCalledWith(expectedRedirectUrl);
			});

			it("should redirect to thuringia schulportal - if instance is thuringia", async () => {
				const {
					contextMock,
					windowLocationAssign,
					SCHULPORTAL_URL,
					SCHULCLOUD_URL,
					URL,
				} = setup({ isPublic: false, isThuringia: true });

				await authenticate(contextMock);

				const serviceUrl = `https://${SCHULCLOUD_URL}/tsp-login?redirect=${encodeURIComponent(URL)}`;
				const expectedRedirectUrl = `${SCHULPORTAL_URL}/cas/login?service=${encodeURIComponent(serviceUrl)}`;
				expect(windowLocationAssign).toHaveBeenCalledWith(expectedRedirectUrl);
			});
		});

		describe("with valid JWT", () => {
			it("should check jwt and not redirect", async () => {
				const {
					contextMock,
					windowLocationAssign,
				} = setup({ isPublic: false, isThuringia: false, hasValidJwt: true });

				await authenticate(contextMock);

				expect(windowLocationAssign).toHaveBeenCalledTimes(0);
			});
		});

		describe("with invalid JWT", () => {
			it("should check jwt and redirect to login if it fails", async () =>  {
				const {
					contextMock,
					authModuleLogout,
					SCHULCLOUD_URL,
					URL,
				} = setup({ isPublic: false, isThuringia: false, hasInvalidJwt: true });

				await authenticate(contextMock);

				const expectedRedirectUrl = `https://${SCHULCLOUD_URL}/login?redirect=${encodeURIComponent(URL)}`;
				expect(authModuleLogout).toHaveBeenCalledWith(expectedRedirectUrl);
			});
		});
	});
});
