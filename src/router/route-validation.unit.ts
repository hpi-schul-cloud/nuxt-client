import { isRouteValid, isRouteValidGuard } from "@/router/route-validation";
import { HttpStatusCode } from "@/types/enum/http-status-code.enum";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { RouteLocationNormalized } from "vue-router";

describe("route-validation", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("marks incomplete board routes as invalid", () => {
		expect(isRouteValid("/boards")).toBe(true);
		expect(isRouteValid("/boards/507f1f77bcf86cd799439011/cards")).toBe(true);
	});

	it("does not mark complete board routes as invalid", () => {
		expect(isRouteValid("/boards/507f1f77bcf86cd799439011")).toBe(false);
		expect(isRouteValid("/boards/507f1f77bcf86cd799439011/cards/507f1f77bcf86cd799439012")).toBe(false);
	});

	it("blocks unmatched incomplete board routes and raises a not found error", () => {
		const to = {
			matched: [],
			path: "/boards",
		} as RouteLocationNormalized;

		const result = isRouteValidGuard(to, to, vi.fn);

		expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.NotFound);
		expect(result).toEqual({ path: "/error" });
	});

	it("allows matched routes through the guard", () => {
		const to = {
			matched: [{}],
			path: "/boards/507f1f77bcf86cd799439011",
		} as RouteLocationNormalized;

		const result = isRouteValidGuard(to, to, vi.fn);

		expect(useAppStore().handleApplicationError).not.toHaveBeenCalled();
		expect(result).toBe(true);
	});
});
