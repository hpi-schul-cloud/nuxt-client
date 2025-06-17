import { roomPermissionGuard } from "@/router/guards/permission-room-access.guard";
import {
	NavigationGuard,
	RouteLocationNormalized,
	NavigationGuardNext,
} from "vue-router";

import Mock = jest.Mock;
import { authModule, envConfigModule } from "@/store";

const mockError = jest.fn();

jest.mock("@/store", () => ({
	authModule: {
		getUserPermissions: [],
	},
	applicationErrorModule: {
		setError: () => mockError(),
	},
	envConfigModule: {
		getEnv: {},
	},
}));

describe("roomPermissionGuard", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const setup = (
		options: { featureFlag?: boolean; permissions?: string[] } = {
			featureFlag: true,
			permissions: ["validPermission_1", "validPermission_2"],
		}
	) => {
		const route: RouteLocationNormalized = {} as RouteLocationNormalized;
		const next: Mock<NavigationGuardNext> = jest.fn();

		envConfigModule.getEnv.FEATURE_ROOM_ADD_STUDENTS_ENABLED =
			options.featureFlag ?? true;
		if (authModule.me) {
			authModule.me.permissions = [...(options.permissions ?? [])];
		}
		return { to: route, from: route, next };
	};

	describe("createPermissionGuard", () => {
		it("should check permissions from the authModule and allow access", () => {
			const { to, from, next } = setup();
			const permissionGuard: NavigationGuard = roomPermissionGuard([
				"validPermission_1",
			]);

			permissionGuard(to, from, next);

			expect(next).toHaveBeenCalledWith();
		});

		it("should check permissions from the authModule and deny access", () => {
			const { to, from, next } = setup({ featureFlag: false });
			const permissionGuard: NavigationGuard = roomPermissionGuard([
				"invalidPermission",
			]);

			permissionGuard(to, from, next);

			expect(next).not.toHaveBeenCalled();
		});

		it("should check feature flag and allow access", () => {
			const { to, from, next } = setup();
			const permissionGuard: NavigationGuard = roomPermissionGuard([
				"validPermission_1",
			]);

			permissionGuard(to, from, next);
			expect(next).toHaveBeenCalledWith();
		});

		it("should check feature flag and deny access", () => {
			const { to, from, next } = setup({ featureFlag: false });
			const permissionGuard: NavigationGuard = roomPermissionGuard([
				"invalidPermission",
			]);

			permissionGuard(to, from, next);
			expect(next).not.toHaveBeenCalledWith();
		});

		it("should create a '401' error with invalid permission", () => {
			const { to, from, next } = setup({ featureFlag: false });
			const permissionGuard: NavigationGuard = roomPermissionGuard([
				"invalidPermission",
			]);

			permissionGuard(to, from, next);

			expect(mockError).toHaveBeenCalled();
		});
	});
});
