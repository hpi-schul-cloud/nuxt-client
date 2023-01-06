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

function mockContext(isPublic: boolean, cookies: Record<string, string> = {}) {
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

function setup({
	isPublic = false,
	cookies = {},
}: {
	isPublic: boolean;
	cookies?: Record<string, string>;
}) {
	const URL = `https://schulcloud.de/my-url-to-authenticate`;
	const windowLocationAssign = mockWindowLocation({ href: URL });

	const contextMock = mockContext(isPublic, cookies);
	const authModuleLogout = jest.spyOn(authModule, "logout").mockReturnValue();

	return {
		contextMock,
		windowLocationAssign,
		authModuleLogout,
		URL,
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
			});
			jest.spyOn(authModule, "populateUser").mockImplementation();

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
					expect.stringContaining(`/login?redirect=${redirect}`)
				);
			});

			it("should redirect to configured internal auth-url", async () => {
				const {
					contextMock,
					windowLocationAssign,
					URL: urlString,
				} = setup({
					isPublic: false,
				});

				const urlObject = new URL(urlString);
				const NOT_AUTHENTICATED_REDIRECT_URL = `${urlObject.origin}/login?service=https%3A%2F%2Fschulcloud.de%2Ftsp-login`;
				// @ts-ignore
				envConfigModule.setEnvs({
					NOT_AUTHENTICATED_REDIRECT_URL,
				});

				await authenticate(contextMock);

				const redirect = encodeURIComponent(urlString);
				expect(windowLocationAssign).toHaveBeenCalledWith(
					expect.stringContaining(NOT_AUTHENTICATED_REDIRECT_URL)
				);
				expect(windowLocationAssign).toHaveBeenCalledWith(
					expect.stringContaining(redirect)
				);
			});

			it("should redirect to configured external auth-system", async () => {
				const { contextMock, windowLocationAssign, URL } = setup({
					isPublic: false,
				});

				const NOT_AUTHENTICATED_REDIRECT_URL =
					"https://test.schulportal-thueringen.de/cas/login?service=https%3A%2F%2Fschulcloud.de%2Ftsp-login";
				// @ts-ignore
				envConfigModule.setEnvs({
					NOT_AUTHENTICATED_REDIRECT_URL,
				});

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
					cookies: { jwt: "some-jwt" },
				});
				jest.spyOn(authModule, "populateUser").mockImplementation();

				await authenticate(contextMock);

				expect(windowLocationAssign).toHaveBeenCalledTimes(0);
			});
		});

		describe("with invalid JWT", () => {
			it("should check jwt and redirect to login if it fails", async () => {
				const { contextMock, authModuleLogout, URL } = setup({
					isPublic: false,
					cookies: { jwt: "some-jwt" },
				});
				jest.spyOn(authModule, "populateUser").mockRejectedValue(false);

				await authenticate(contextMock);

				const expectedRedirectUrl = `https://schulcloud.de/login?redirect=${encodeURIComponent(
					URL
				)}`;
				expect(authModuleLogout).toHaveBeenCalledWith(expectedRedirectUrl);
			});
		});
	});
});
