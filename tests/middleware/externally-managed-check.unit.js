import externallyManagedCheck from "@middleware/externally-managed-check";

const mockApp = {
	i18n: {
		t: (a) => a,
	},
};

const getMockStore = ({ permissions = [], user } = {}) => {
	const mockUser = user !== undefined ? user : { permissions };
	return {
		state: {
			auth: {
				user: mockUser,
			},
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

describe("@middleware/externally-managed-check", () => {
	it("exports a function", () => {
		expect(typeof externallyManagedCheck).toBe("function");
	});

	it("grants access using simple syntax", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ permissions: ["PERMISSION_A", "PERMISSION_B"] }),
			route: getMockRoute(["PERMISSION_A"]),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it(`grants access using advanced "AND" syntax`, async () => {
		const mockContext = getMockContext({
			store: getMockStore({ permissions: ["PERMISSION_A", "PERMISSION_B"] }),
			route: getMockRoute({
				operator: "AND",
				permissions: ["PERMISSION_A", "PERMISSION_B"],
			}),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it(`grants access using advanced "OR" syntax`, async () => {
		const mockContext = getMockContext({
			store: getMockStore({ permissions: ["PERMISSION_A", "PERMISSION_B"] }),
			route: getMockRoute({
				operator: "OR",
				permissions: ["PERMISSION_B"],
			}),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it("grants Access if no permissions are required AND user exists", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ permissions: ["PERMISSION_A"] }),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it("grants Access if no permissions are required AND user is missing", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ user: null }),
		});
		expect(await externallyManagedCheck(mockContext)).toBe(true);
	});

	it("throws error.401 on missing permission using simple syntax", async () => {
		const mockContext = getMockContext({
			route: getMockRoute(["MISSING_PERMISSION"]),
		});
		await expect(externallyManagedCheck(mockContext)).rejects.toThrow(
			new Error("error.401")
		);
	});

	it("throws error.401 on missing permission using advanced AND syntax", async () => {
		const mockContext = getMockContext({
			store: getMockStore({
				permissions: ["PERMISSION_A"],
			}),
			route: getMockRoute({
				operator: "OR",
				permissions: ["PERMISSION_B", "MISSING_PERMISSION"],
			}),
		});
		await expect(externallyManagedCheck(mockContext)).rejects.toThrow(
			new Error("error.401")
		);
	});

	it("throws error.401 on missing permission using advanced OR syntax", async () => {
		const mockContext = getMockContext({
			route: getMockRoute({
				operator: "OR",
				permissions: ["MISSING_PERMISSION"],
			}),
		});
		await expect(externallyManagedCheck(mockContext)).rejects.toThrow(
			new Error("error.401")
		);
	});

	it("throws error.401 on missing user", async () => {
		const mockContext = getMockContext({
			store: getMockStore({ user: null }),
			route: getMockRoute(["MISSING_PERMISSION"]),
		});
		await expect(externallyManagedCheck(mockContext)).rejects.toThrow(
			new Error("error.401")
		);
	});
});
