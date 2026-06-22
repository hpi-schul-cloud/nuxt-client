import { clearApplicationErrorGuard } from "@/router/guards/clear-application-error.guard";
import { HttpStatusCode } from "@/types/enum/http-status-code.enum";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

describe("clearApplicationErrorGuard", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	describe("when an application error exists", () => {
		it("should clear the application error", async () => {
			const appStore = useAppStore();
			appStore.handleApplicationError(HttpStatusCode.NotFound);
			clearApplicationErrorGuard();
			expect(appStore.clearApplicationError).toHaveBeenCalled();
		});
	});

	describe("when no application error exists", () => {
		it("should call next without clearing", () => {
			const appStore = useAppStore();
			clearApplicationErrorGuard();
			expect(appStore.clearApplicationError).not.toHaveBeenCalled();
		});
	});
});
