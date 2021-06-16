import externallyManagedCheck from "@middleware/externally-managed-check";

const mockApp = {
	i18n: {
		t: (a) => a,
	},
};

const getMockStore = ({ user } = {}) => {
	return {
		getters: {
			"auth/getUser": user,
		},
	};
};

const getMockRoute = (meta) => ({
	meta: [{ ...meta }],
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

describe("@middleware/externally-managed-check", () => {
	it("exports a function", () => {
		expect(typeof externallyManagedCheck).toBe("function");
	});

	it("grants Access if userNotExternallyManaged is not required AND user is not externally managed", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ user: { externallyManaged: false } }),
			route: getMockRoute({ userNotExternallyManaged: false }),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it("grants Access if userNotExternallyManaged is not required AND user is externally managed", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ user: { externallyManaged: true } }),
			route: getMockRoute({ userNotExternallyManaged: false }),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it("grants Access if userNotExternallyManaged is required AND user is not externally managed", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ user: { externallyManaged: false } }),
			route: getMockRoute({ userNotExternallyManaged: true }),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it("throws error.401 if userNotExternallyManaged is required AND user is externally managed", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ user: { externallyManaged: true } }),
			route: getMockRoute({ userNotExternallyManaged: true }),
		});
		await expect(externallyManagedCheck(mockContext)).rejects.toThrow(
			new Error("error.401")
		);
	});

	it("grants Access if userNotExternallyManaged is not defined AND user is externally managed", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ user: { externallyManaged: true } }),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it("grants Access if userNotExternallyManaged is not defined AND user is not externally managed", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ user: { externallyManaged: false } }),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it("throws error.401 on missing user", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ user: null }),
			route: getMockRoute({ userNotExternallyManaged: true }),
		});
		await expect(externallyManagedCheck(mockContext)).rejects.toThrow(
			new Error("error.401")
		);
	});

	it("grants Access if userNotExternallyManaged is not defined AND user is missing", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ user: null }),
			route: getMockRoute({ userNotExternallyManaged: false }),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});
});
