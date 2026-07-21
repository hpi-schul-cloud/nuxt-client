import { clearApplicationErrorGuard } from "@/router/guards/clear-application-error.guard";
import { HttpStatusCode } from "@/types/enum/http-status-code.enum";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { RouteLocationNormalized } from "vue-router";

describe("clearApplicationErrorGuard", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	describe("when an application error exists", () => {
		it("should clear the application error", async () => {
			const appStore = useAppStore();
			appStore.handleApplicationError(HttpStatusCode.NotFound);
			clearApplicationErrorGuard({ path: "/dashboard" } as RouteLocationNormalized, {} as RouteLocationNormalized, vi.fn());
			expect(appStore.clearApplicationError).toHaveBeenCalled();
		});

		it("should preserve the application error when navigating to the error page", async () => {
			const appStore = useAppStore();
			appStore.handleApplicationError(HttpStatusCode.NotFound);

			clearApplicationErrorGuard({ path: "/error" } as RouteLocationNormalized, {} as RouteLocationNormalized, vi.fn());

			expect(appStore.clearApplicationError).not.toHaveBeenCalled();
		});
	});

	describe("when no application error exists", () => {
		it("should call next without clearing", () => {
			const appStore = useAppStore();
			clearApplicationErrorGuard({ path: "/dashboard" } as RouteLocationNormalized, {} as RouteLocationNormalized, vi.fn());
			expect(appStore.clearApplicationError).not.toHaveBeenCalled();
		});
	});
});
