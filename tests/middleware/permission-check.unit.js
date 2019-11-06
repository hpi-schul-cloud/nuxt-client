import permissionCheck from "@middleware/permission-check";

const mockApp = {
	i18n: {
		t: (a) => a,
	},
};

const getMockStore = ({ permissions = [], user } = {}) => {
	const mockUser = user ? user : { permissions };
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

describe("@middleware/permission-check", () => {
	it("exports a function", () => {
		expect(typeof permissionCheck).toBe("function");
	});

	it("grants access using simple syntax", () => {
		const mockContext = {
			app: mockApp,
			store: getMockStore({ permissions: ["PERMISSION_A", "PERMISSION_B"] }),
			route: getMockRoute(["PERMISSION_A"]),
		};
		expect(permissionCheck(mockContext)).resolves.toBe(true);
	});

	it("grants access using advanced AND syntax", () => {
		const mockContext = {
			app: mockApp,
			store: getMockStore({ permissions: ["PERMISSION_A", "PERMISSION_B"] }),
			route: getMockRoute({
				operator: "AND",
				permissions: ["PERMISSION_A", "PERMISSION_B"],
			}),
		};
		expect(permissionCheck(mockContext)).resolves.toBe(true);
	});

	it("grants access using advanced OR syntax", () => {
		const mockContext = {
			app: mockApp,
			store: getMockStore({ permissions: ["PERMISSION_A", "PERMISSION_B"] }),
			route: getMockRoute({
				operator: "OR",
				permissions: ["PERMISSION_B"],
			}),
		};
		expect(permissionCheck(mockContext)).resolves.toBe(true);
	});

	it("grants Access if no permissions are required AND user exists", () => {
		const mockContext = {
			app: mockApp,
			store: getMockStore({ permissions: ["PERMISSION_A"] }),
			route: getMockRoute(),
		};
		expect(permissionCheck(mockContext)).resolves.toBe(true);
	});

	it("grants Access if no permissions are required AND user is missing", () => {
		const mockContext = {
			app: mockApp,
			store: getMockStore({ user: null }),
			route: getMockRoute(),
		};
		expect(permissionCheck(mockContext)).resolves.toBe(true);
	});

	it("throws error.401 on missing permission using simple syntax", () => {
		const mockContext = {
			app: mockApp,
			store: getMockStore({}),
			route: getMockRoute(["MISSING_PERMISSION"]),
		};
		expect(permissionCheck(mockContext)).rejects.toThrow(
			new Error("error.401")
		);
	});

	it("throws error.401 on missing permission using advanced AND syntax", () => {
		const mockContext = {
			app: mockApp,
			store: getMockStore({
				permissions: ["PERMISSION_A"],
			}),
			route: getMockRoute({
				operator: "OR",
				permissions: ["PERMISSION_A", "MISSING_PERMISSION"],
			}),
		};
		expect(permissionCheck(mockContext)).rejects.toThrow(
			new Error("error.401")
		);
	});

	it("throws error.401 on missing permission using advanced OR syntax", () => {
		const mockContext = {
			app: mockApp,
			store: getMockStore({}),
			route: getMockRoute({
				operator: "OR",
				permissions: ["MISSING_PERMISSION"],
			}),
		};
		expect(permissionCheck(mockContext)).rejects.toThrow(
			new Error("error.401")
		);
	});

	it("throws error.401 on missing user", () => {
		const mockContext = {
			app: mockApp,
			store: getMockStore({ user: null }),
			route: getMockRoute(["MISSING_PERMISSION"]),
		};
		expect(permissionCheck(mockContext)).rejects.toThrow(
			new Error("error.401")
		);
	});
});
