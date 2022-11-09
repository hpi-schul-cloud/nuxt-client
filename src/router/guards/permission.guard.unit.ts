import { createPermissionGuard } from "@/router/guards/permission.guard";
import { NavigationGuard } from "vue-router";
import { NavigationGuardNext, Route } from "vue-router/types/router";
import Mock = jest.Mock;

jest.mock("@utils/store-accessor", () => ({
	authModule: {
		getUserPermissions: ["validPermission"],
	},
}));

describe("PermissionGuard", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	function setup() {
		const route: Route = {} as Route;
		const next: Mock<NavigationGuardNext> = jest.fn();
		return { to: route, from: route, next };
	}

	describe("createPermissionGuard", () => {
		it("should check permissions from the authModule and allow access", () => {
			const { to, from, next } = setup();
			const permissionGuard: NavigationGuard =
				createPermissionGuard("validPermission");

			permissionGuard(to, from, next);

			expect(next).toHaveBeenCalledWith();
		});

		it("should check permissions from the authModule and deny access", () => {
			const { to, from, next } = setup();
			const permissionGuard: NavigationGuard =
				createPermissionGuard("invalidPermission");

			permissionGuard(to, from, next);

			expect(next).toHaveBeenCalledWith("/dashboard");
		});
	});
});
