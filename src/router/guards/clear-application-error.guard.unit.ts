import { clearApplicationErrorGuard } from "@/router/guards/clear-application-error.guard";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
describe("clearApplicationErrorGuard", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});
	afterEach(() => {
		vi.clearAllMocks();
	});
	function setup() {
		const route: RouteLocationNormalized = {} as RouteLocationNormalized;
		const next: NavigationGuardNext = vi.fn();
		return { to: route, from: route, next };
	}
	describe("when an application error exists", () => {
		it("should clear the application error", () => {
			const { to, from, next } = setup();
			const appStore = useAppStore();
			appStore.handleApplicationError(HttpStatusCode.NotFound);
			clearApplicationErrorGuard(to, from, next);
			expect(appStore.clearApplicationError).toHaveBeenCalled();
			expect(next).toHaveBeenCalled();
		});
	});
	describe("when no application error exists", () => {
		it("should call next without clearing", () => {
			const { to, from, next } = setup();
			const appStore = useAppStore();
			clearApplicationErrorGuard(to, from, next);
			expect(appStore.clearApplicationError).not.toHaveBeenCalled();
			expect(next).toHaveBeenCalled();
		});
	});
});
