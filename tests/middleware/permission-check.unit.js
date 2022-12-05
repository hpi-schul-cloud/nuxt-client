import permissionCheck from "@middleware/permission-check";
import { authModule, applicationErrorModule } from "@/store";
import setupStores from "../test-utils/setupStores";
import AuthModule from "@/store/auth";
import ApplicationErrorModule from "@/store/application-error";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

const mockApp = {
	i18n: {
		t: (a) => a,
	},
};

const getMockStore = ({ permissions = [], user } = {}) => {
	const mockUser = user !== undefined ? user : { permissions };
	return {
		getters: {
			"auth/getUser": mockUser,
		},
	};
};

const getMockRoute = (requiredPermissions) => ({
	meta: [{ requiredPermissions }],
});

const getMockContext = ({
	app = mockApp,
	store = getMockStore(),
	route = getMockRoute(),
} = {}) => ({
	app,
	store,
	route,
});

describe("@middleware/permission-check", () => {
	beforeEach(() => {
		setupStores({
			auth: AuthModule,
			"application-error": ApplicationErrorModule,
		});
	});

	it("exports a function", () => {
		expect(typeof permissionCheck).toBe("function");
	});

	it("grants access using simple syntax", async () => {
		authModule.setUser({ permissions: ["PERMISSION_A", "PERMISSION_B"] });
		const mockContext = getMockContext({
			store: getMockStore({ permissions: ["PERMISSION_A", "PERMISSION_B"] }),
			route: getMockRoute(["PERMISSION_A"]),
		});
		expect(await permissionCheck(mockContext)).toBe(true);
	});

	it(`grants access using advanced "AND" syntax`, async () => {
		authModule.setUser({ permissions: ["PERMISSION_A", "PERMISSION_B"] });
		const mockContext = getMockContext({
			store: getMockStore({ permissions: ["PERMISSION_A", "PERMISSION_B"] }),
			route: getMockRoute({
				operator: "AND",
				permissions: ["PERMISSION_A", "PERMISSION_B"],
			}),
		});
		expect(await permissionCheck(mockContext)).toBe(true);
	});

	it(`grants access using advanced "OR" syntax`, async () => {
		authModule.setUser({ permissions: ["PERMISSION_A", "PERMISSION_B"] });
		const mockContext = getMockContext({
			store: getMockStore({ permissions: ["PERMISSION_A", "PERMISSION_B"] }),
			route: getMockRoute({
				operator: "OR",
				permissions: ["PERMISSION_B"],
			}),
		});
		expect(await permissionCheck(mockContext)).toBe(true);
	});

	it("grants Access if no permissions are required AND user exists", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ permissions: ["PERMISSION_A"] }),
		});
		expect(await permissionCheck(mockContext)).toBe(true);
	});

	it("grants Access if no permissions are required AND user is missing", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ user: null }),
		});
		expect(await permissionCheck(mockContext)).toBe(true);
	});

	it("throws error.401 on missing permission using simple syntax", async () => {
		const mockContext = getMockContext({
			route: getMockRoute(["MISSING_PERMISSION"]),
		});
		jest.spyOn(applicationErrorModule, "setError").mockImplementation();

		await expect(permissionCheck(mockContext)).rejects.toThrow(
			createApplicationError(HttpStatusCode.Unauthorized)
		);
	});

	it("throws error.401 on missing permission using advanced AND syntax", async () => {
		authModule.setUser({ permissions: ["PERMISSION_A"] });
		jest.spyOn(applicationErrorModule, "setError").mockImplementation();

		const mockContext = getMockContext({
			store: getMockStore({
				permissions: ["PERMISSION_A"],
			}),
			route: getMockRoute({
				operator: "OR",
				permissions: ["PERMISSION_B", "MISSING_PERMISSION"],
			}),
		});
		await expect(permissionCheck(mockContext)).rejects.toThrow(
			createApplicationError(HttpStatusCode.Unauthorized)
		);
	});

	it("throws error.401 on missing permission using advanced OR syntax", async () => {
		authModule.setUser({ permissions: [] });
		jest.spyOn(applicationErrorModule, "setError").mockImplementation();

		const mockContext = getMockContext({
			route: getMockRoute({
				operator: "OR",
				permissions: ["MISSING_PERMISSION"],
			}),
		});
		await expect(permissionCheck(mockContext)).rejects.toThrow(
			createApplicationError(HttpStatusCode.Unauthorized)
		);
	});

	it("throws error.401 on missing user", async () => {
		authModule.setUser(null);
		jest.spyOn(applicationErrorModule, "setError").mockImplementation();

		const mockContext = getMockContext({
			store: getMockStore({ user: null }),
			route: getMockRoute(["MISSING_PERMISSION"]),
		});
		await expect(permissionCheck(mockContext)).rejects.toThrow(
			createApplicationError(HttpStatusCode.Unauthorized)
		);
	});
});
