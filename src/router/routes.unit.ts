import { routes } from "@/router/routes";
import { HttpStatusCode } from "@/types/enum/http-status-code.enum";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { NavigationGuard, RouteLocationNormalized, RouteRecordRaw } from "vue-router";

const toIncorrectRouteName = (path: string) => `${path.slice(1).replaceAll("/", "-")}-error`;

const INCORRECT_ROUTES = ["/boards", "/h5p/player", "/collabora", "/folder", "/rooms/invitation-link"].map((path) => ({
	path,
	name: toIncorrectRouteName(path),
}));

describe("routes", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	describe("incorrectRoutes", () => {
		const getRouteByName = (name: string) => routes.find((route) => route.name === name) as RouteRecordRaw;

		it("should include all incorrect routes", () => {
			expect(routes.map((route) => route.name)).toEqual(
				expect.arrayContaining(INCORRECT_ROUTES.map((route) => route.name))
			);
		});

		it.each(INCORRECT_ROUTES)(
			"should register '$path' with the error page and a NotFound beforeEnter guard",
			async ({ path, name }) => {
				const route = getRouteByName(name);
				const beforeEnter = route.beforeEnter as NavigationGuard;
				const location = {} as RouteLocationNormalized;

				expect(route.path).toBe(path);
				expect(route.name).toBe(name);
				expect(route.component).toBeDefined();
				expect(route.beforeEnter).toBeDefined();

				const result = await beforeEnter(location, location, vi.fn());

				expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.NotFound);
				expect(result).toBe(true);
			}
		);
	});
});
