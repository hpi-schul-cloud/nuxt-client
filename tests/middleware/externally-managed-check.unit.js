import { authModule, applicationErrorModule } from "@/store";
import ApplicationErrorModule from "@/store/application-error";
import AuthModule from "@/store/auth";
import externallyManagedCheck from "@middleware/externally-managed-check";
import setupStores from "../test-utils/setupStores";
import { createApplicationError } from "@utils/create-application-error.factory";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

const mockApp = {
	i18n: {
		t: (a) => a,
	},
};

const getMockRoute = (meta) => ({
	meta: [{ ...meta }],
});

const getMockContext = ({ app = mockApp, route = getMockRoute() } = {}) => ({
	app,
	route,
});

describe("@middleware/externally-managed-check", () => {
	beforeEach(() => {
		setupStores({
			auth: AuthModule,
			"application-error": ApplicationErrorModule,
		});
	});

	it("exports a function", () => {
		expect(typeof externallyManagedCheck).toBe("function");
	});

	it("grants Access if userNotExternallyManaged is not required AND user is not externally managed", async () => {
		authModule.setUser({ externallyManaged: false });
		const mockContext = getMockContext({
			route: getMockRoute({ userNotExternallyManaged: false }),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it("grants Access if userNotExternallyManaged is not required AND user is externally managed", async () => {
		authModule.setUser({ externallyManaged: true });

		const mockContext = getMockContext({
			route: getMockRoute({ userNotExternallyManaged: false }),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it("grants Access if userNotExternallyManaged is required AND user is not externally managed", async () => {
		authModule.setUser({ externallyManaged: false });
		const mockContext = getMockContext({
			route: getMockRoute({ userNotExternallyManaged: true }),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it("throws error.401 if userNotExternallyManaged is required AND user is externally managed", async () => {
		authModule.setUser({ externallyManaged: true });
		jest.spyOn(applicationErrorModule, "setError").mockImplementation();

		const mockContext = getMockContext({
			route: getMockRoute({ userNotExternallyManaged: true }),
		});

		await expect(externallyManagedCheck(mockContext)).rejects.toThrow(
			createApplicationError(HttpStatusCode.Unauthorized)
		);
	});

	it("grants Access if userNotExternallyManaged is not defined AND user is externally managed", async () => {
		authModule.setUser({ externallyManaged: true });

		const mockContext = getMockContext();
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it("grants Access if userNotExternallyManaged is not defined AND user is not externally managed", async () => {
		authModule.setUser({ externallyManaged: false });
		const mockContext = getMockContext();
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it("throws error.401 on missing user", async () => {
		authModule.setUser(null);
		jest.spyOn(applicationErrorModule, "setError").mockImplementation();

		const mockContext = getMockContext({
			route: getMockRoute({ userNotExternallyManaged: true }),
		});
		await expect(externallyManagedCheck(mockContext)).rejects.toThrow(
			createApplicationError(HttpStatusCode.Unauthorized)
		);
	});

	it("grants Access if userNotExternallyManaged is not defined AND user is missing", async () => {
		authModule.setUser(null);

		const mockContext = getMockContext({
			route: getMockRoute({ userNotExternallyManaged: false }),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});
});
