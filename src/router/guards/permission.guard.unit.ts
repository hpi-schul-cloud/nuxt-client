import { createPermissionGuard } from "@/router/guards/permission.guard";
import { NavigationGuard } from "vue-router";
import { NavigationGuardNext, RouteLocation } from "vue-router";
import Mock = jest.Mock;

const mockError = jest.fn();

jest.mock("@/store", () => ({
	authModule: {
		getPermissions: ["validPermission_1", "validPermission_2"],
	},
	applicationErrorModule: {
		setError: () => mockError(),
	},
}));

describe("PermissionGuard", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	function setup() {
		const route: RouteLocation = {} as RouteLocation;
		const next: Mock<NavigationGuardNext> = jest.fn();
		return { to: route, from: route, next };
	}

	describe("createPermissionGuard", () => {
		it("should check permissions from the authModule and allow access", () => {
			const { to, from, next } = setup();
			const permissionGuard: NavigationGuard = createPermissionGuard(
				["validPermission_1"],
				"/dashboard"
			);

			permissionGuard(to, from, next);

			expect(next).toHaveBeenCalledWith();
		});

		it("should check with one valid and one invalid permissions from the authModule and deny access", () => {
			const { to, from, next } = setup();
			const fallbackRoute = "/dashboard";
			const permissionGuard: NavigationGuard = createPermissionGuard(
				["validPermission_1", "invalidPermission"],
				fallbackRoute
			);

			permissionGuard(to, from, next);

			expect(next).toHaveBeenCalledWith(fallbackRoute);
		});

		it("should check permissions from the authModule and deny access", () => {
			const { to, from, next } = setup();
			const fallbackRoute = "/dashboard";
			const permissionGuard: NavigationGuard = createPermissionGuard(
				["invalidPermission"],
				fallbackRoute
			);

			permissionGuard(to, from, next);

			expect(next).toHaveBeenCalledWith(fallbackRoute);
		});

		it("should create a '403' error if fallbackRoute is not provided and with invalid permission", () => {
			const { to, from, next } = setup();
			const permissionGuard: NavigationGuard = createPermissionGuard([
				"invalidPermission",
			]);

			permissionGuard(to, from, next);

			expect(mockError).toHaveBeenCalled();
		});

		it("should create a '403' error if fallbackRoute is not provided and with one invalid permission", () => {
			const { to, from, next } = setup();
			const permissionGuard: NavigationGuard = createPermissionGuard([
				"validPermission_1",
				"invalidPermission",
			]);

			permissionGuard(to, from, next);

			expect(mockError).toHaveBeenCalled();
		});
	});
});
