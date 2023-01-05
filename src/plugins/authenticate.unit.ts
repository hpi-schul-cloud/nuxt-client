import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import authenticate from "./authenticate";
import { authModule, envConfigModule } from "@/store";

function mockWindowLocation(location: any) {
	const assignMock = jest.fn();
	Object.defineProperty(global, "window", {
		value: {
			location: {
				...location,
				assign: assignMock,
			},
		},
		writable: true,
	});
	return assignMock;
}

function mockContext(
	isPublic: boolean,
	hasValidJwt: boolean,
	hasInvalidJwt: boolean
) {
	const cookies: Record<string, string> = {};
	if (hasValidJwt) {
		cookies.jwt = "valid-jwt";
	}
	if (hasInvalidJwt) {
		cookies.jwt = "invalid-jwt";
	}

	const contextMock = {
		route: {
			meta: [{ isPublic }],
		},
		app: {
			$cookies: {
				get: (name: string) => cookies[name],
			},
		},
	};
	return contextMock;
}

function mockAuthModule(hasValidJwt: boolean, hasInvalidJwt: boolean) {
	if (hasValidJwt === true) {
		jest.spyOn(authModule, "populateUser").mockImplementation();
	}

	if (hasInvalidJwt === false) {
		jest.spyOn(authModule, "populateUser").mockRejectedValue("not allowed...");
	}

	const authModuleLogout = jest.spyOn(authModule, "logout").mockReturnValue();
	return authModuleLogout;
}

function setup({
	isPublic = false,
	hasValidJwt = false,
	hasInvalidJwt = false,
}) {
	const URL = `https://schulcloud.de/my-url-to-authenticate`;

	const windowLocationAssign = mockWindowLocation({ href: URL });

	const contextMock = mockContext(isPublic, hasValidJwt, hasInvalidJwt);

	const authModuleLogout = mockAuthModule(hasValidJwt, hasInvalidJwt);

	return {
		contextMock,
		windowLocationAssign,
		authModuleLogout,
		URL,
	};
}

function setupThuringia({
	isPublic = false,
	hasValidJwt = false,
	hasInvalidJwt = false,
}) {
	const vars = setup({ isPublic, hasValidJwt, hasInvalidJwt });

	const URL = `https://schulcloud.de/my-url-to-authenticate`;
	const windowLocationAssign = mockWindowLocation({ href: URL });
	const NOT_AUTHENTICATED_REDIRECT_URL =
		"https://test.schulportal-thueringen.de/cas/login?service=https%3A%2F%2Fschulcloud.de%2Ftsp-login";

	// @ts-ignore
	envConfigModule.setEnvs({
		NOT_AUTHENTICATED_REDIRECT_URL,
	});

	return {
		...vars,
		windowLocationAssign,
		URL,
		NOT_AUTHENTICATED_REDIRECT_URL,
	};
}

describe("@plugins/authenticate", () => {
	beforeEach(() => {
		setupStores({ auth: AuthModule, "env-config": EnvConfigModule });
	});

	describe("authenticate public url", () => {
		it("should do nothing if url is public", async () => {
			const { contextMock, windowLocationAssign } = setup({
				isPublic: true,
			});

			await authenticate(contextMock);

			expect(windowLocationAssign).toHaveBeenCalledTimes(0);
		});

		it("should do nothing if url is public - also if jwt is set", async () => {
			const { contextMock, windowLocationAssign } = setup({
				isPublic: true,
				hasValidJwt: true,
			});

			await authenticate(contextMock);

			expect(windowLocationAssign).toHaveBeenCalledTimes(0);
		});
	});

	describe("authenticate private url", () => {
		describe("without JWT", () => {
			it("should redirect to login page", async () => {
				const { contextMock, windowLocationAssign, URL } = setup({
					isPublic: false,
				});

				await authenticate(contextMock);

				const redirect = encodeURIComponent(URL);
				expect(windowLocationAssign).toHaveBeenCalledWith(
					`/login?redirect=${redirect}`
				);
			});

			it("should redirect to configured external auth-system", async () => {
				const {
					contextMock,
					windowLocationAssign,
					NOT_AUTHENTICATED_REDIRECT_URL,
					URL,
				} = setupThuringia({ isPublic: false });

				await authenticate(contextMock);

				const redirect = encodeURIComponent(encodeURIComponent(URL));
				expect(windowLocationAssign).toHaveBeenCalledWith(
					expect.stringContaining(NOT_AUTHENTICATED_REDIRECT_URL)
				);
				expect(windowLocationAssign).toHaveBeenCalledWith(
					expect.stringContaining(redirect)
				);
			});
		});

		describe("with valid JWT", () => {
			it("should not redirect", async () => {
				const { contextMock, windowLocationAssign } = setup({
					isPublic: false,
					hasValidJwt: true,
				});

				await authenticate(contextMock);

				expect(windowLocationAssign).toHaveBeenCalledTimes(0);
			});
		});

		describe("with invalid JWT", () => {
			it("should check jwt and redirect to login if it fails", async () => {
				const { contextMock, authModuleLogout, URL } = setup({
					isPublic: false,
					hasInvalidJwt: true,
				});

				await authenticate(contextMock);

				const expectedRedirectUrl = `/login?redirect=${encodeURIComponent(
					URL
				)}`;
				expect(authModuleLogout).toHaveBeenCalledWith(expectedRedirectUrl);
			});
		});
	});
});
