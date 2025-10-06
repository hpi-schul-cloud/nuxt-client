import { createPermissionGuard } from "@/router/guards/permission.guard";
import { Permission } from "@/serverApi/v3";
import { createTestAppStoreWithPermissions } from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { NavigationGuard, NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const mockError = vi.fn();

vi.mock("@/store", () => ({
	applicationErrorModule: {
		setError: () => mockError(),
	},
}));

describe("PermissionGuard", () => {
	const validPermissionA = "validPermissionA" as Permission;
	const validPermissionB = "validPermissionB" as Permission;
	const invalidPermission = "invalidPermission" as Permission;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStoreWithPermissions([validPermissionA, validPermissionB]);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	function setup() {
		const route: RouteLocationNormalized = {} as RouteLocationNormalized;
		const next: NavigationGuardNext = vi.fn();
		return { to: route, from: route, next };
	}

	describe("createPermissionGuard", () => {
		it("should check permissions from the application store and allow access", () => {
			const { to, from, next } = setup();
			const permissionGuard: NavigationGuard = createPermissionGuard([validPermissionA], "/dashboard");

			permissionGuard(to, from, next);

			expect(next).toHaveBeenCalledWith();
		});

		it("should check with one valid and one invalid permissions from the application store and deny access", () => {
			const { to, from, next } = setup();
			const fallbackRoute = "/dashboard";
			const permissionGuard: NavigationGuard = createPermissionGuard(
				[validPermissionA, invalidPermission],
				fallbackRoute
			);

			permissionGuard(to, from, next);

			expect(next).toHaveBeenCalledWith(fallbackRoute);
		});

		it("should check permissions from the application store and deny access", () => {
			const { to, from, next } = setup();
			const fallbackRoute = "/dashboard";
			const permissionGuard: NavigationGuard = createPermissionGuard([invalidPermission], fallbackRoute);

			permissionGuard(to, from, next);

			expect(next).toHaveBeenCalledWith(fallbackRoute);
		});

		it("should create a '403' error if fallbackRoute is not provided and with invalid permission", () => {
			const { to, from, next } = setup();
			const permissionGuard: NavigationGuard = createPermissionGuard([invalidPermission]);

			permissionGuard(to, from, next);

			expect(mockError).toHaveBeenCalled();
		});

		it("should create a '403' error if fallbackRoute is not provided and with one invalid permission", () => {
			const { to, from, next } = setup();
			const permissionGuard: NavigationGuard = createPermissionGuard([validPermissionA, invalidPermission]);

			permissionGuard(to, from, next);

			expect(mockError).toHaveBeenCalled();
		});
	});
});
