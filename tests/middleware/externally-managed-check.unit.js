import { authModule } from "@/store";
import externallyManagedCheck from "@middleware/externally-managed-check";

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

		const mockContext = getMockContext({
			route: getMockRoute({ userNotExternallyManaged: true }),
		});
		await expect(externallyManagedCheck(mockContext)).rejects.toThrow(
			new Error("error.401")
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
		const mockContext = getMockContext({
			route: getMockRoute({ userNotExternallyManaged: true }),
		});
		await expect(externallyManagedCheck(mockContext)).rejects.toThrow(
			new Error("error.401")
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
