import { createPermissionGuard } from "@/router/guards/permission.guard";
import { createTestAppStoreWithPermissions } from "@@/tests/test-utils";
import { Permission } from "@api-server";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { NavigationGuard, RouteLocationNormalized } from "vue-router";

describe("PermissionGuard", () => {
	const validPermissionA = "validPermissionA" as Permission;
	const validPermissionB = "validPermissionB" as Permission;
	const invalidPermission = "invalidPermission" as Permission;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStoreWithPermissions([validPermissionA, validPermissionB]);
	});

	function setup() {
		const route: RouteLocationNormalized = {} as RouteLocationNormalized;
		return { to: route, from: route };
	}

	describe("createPermissionGuard", () => {
		it("should check permissions from the application store and allow access", () => {
			const { to, from } = setup();
			const permissionGuard = createPermissionGuard([validPermissionA], "/dashboard");

			const result = permissionGuard(to, from, vi.fn);

			expect(result).toBe(true);
		});

		it("should check with one valid and one invalid permissions from the application store and deny access", () => {
			const { to, from } = setup();
			const fallbackRoute = "/dashboard";
			const permissionGuard: NavigationGuard = createPermissionGuard(
				[validPermissionA, invalidPermission],
				fallbackRoute
			);

			const result = permissionGuard(to, from, vi.fn);

			expect(result).toBe(fallbackRoute);
		});

		it("should check permissions from the application store and deny access", () => {
			const { to, from } = setup();
			const fallbackRoute = "/dashboard";
			const permissionGuard: NavigationGuard = createPermissionGuard([invalidPermission], fallbackRoute);

			const result = permissionGuard(to, from, vi.fn);

			expect(result).toBe(fallbackRoute);
		});

		it("should create a '403' error if fallbackRoute is not provided and with invalid permission", () => {
			const { to, from } = setup();
			const permissionGuard: NavigationGuard = createPermissionGuard([invalidPermission]);

			const result = permissionGuard(to, from, vi.fn);

			expect(useAppStore().handleApplicationError).toHaveBeenCalled();
			expect(result).toBe(false);
		});

		it("should create a '403' error if fallbackRoute is not provided and with one invalid permission", () => {
			const { to, from } = setup();
			const permissionGuard: NavigationGuard = createPermissionGuard([validPermissionA, invalidPermission]);

			const result = permissionGuard(to, from, vi.fn);

			expect(useAppStore().handleApplicationError).toHaveBeenCalled();
			expect(result).toBe(false);
		});
	});
});
