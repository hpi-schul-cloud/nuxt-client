import { roomPermissionGuard } from "@/router/guards/permission-room-access.guard";
import {
	NavigationGuard,
	RouteLocationNormalized,
	NavigationGuardNext,
} from "vue-router";
import { authModule, envConfigModule } from "@/store";

const mockError = vi.fn();

vi.mock("@/store", () => ({
	authModule: {
		getUserPermissions: [],
	},
	applicationErrorModule: {
		setError: () => mockError(),
	},
}));

describe("roomPermissionGuard", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (
		options: { permissions?: string[] } = {
			permissions: ["validPermission_1", "validPermission_2"],
		}
	) => {
		const route: RouteLocationNormalized = {} as RouteLocationNormalized;
		const next: NavigationGuardNext = vi.fn();

		Object.defineProperty(authModule, "getUserPermissions", {
			get: () => [...(options.permissions ?? [])],
		});
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
			const { to, from, next } = setup();
			const permissionGuard: NavigationGuard = roomPermissionGuard([
				"invalidPermission",
			]);

			permissionGuard(to, from, next);

			expect(next).not.toHaveBeenCalled();
		});

		it("should create a '401' error with invalid permission", () => {
			const { to, from, next } = setup();
			const permissionGuard: NavigationGuard = roomPermissionGuard([
				"invalidPermission",
			]);

			permissionGuard(to, from, next);

			expect(mockError).toHaveBeenCalled();
		});
	});
});
