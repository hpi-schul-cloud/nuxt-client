import { legacyCompatibilityGuard } from "@/router/guards/legacy-route-compatibility.guard";
import { useEnvConfig } from "@data-env";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RouteLocationNormalized } from "vue-router";

vi.mock("@/router/legacy-client-route", () => ({
	isLegacyClient: vi.fn(),
}));

vi.mock("@data-env", () => ({
	useEnvConfig: vi.fn(),
}));

import { isLegacyClient } from "@/router/legacy-client-route";

const mockedIsLegacyClient = vi.mocked(isLegacyClient);
const mockedUseEnvConfig = vi.mocked(useEnvConfig);

const buildLocation = (path: string, fullPath = path): RouteLocationNormalized =>
	({
		path,
		fullPath,
	}) as RouteLocationNormalized;

describe("legacyCompatibilityGuard", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockedUseEnvConfig.mockReturnValue({ value: { FEATURE_TASKS_V3_ENABLED: true } } as ReturnType<
			typeof useEnvConfig
		>);
		vi.stubGlobal("location", { origin: "http://localhost", pathname: "/", assign: vi.fn() });
	});

	const dashboardLocation = buildLocation("/dashboard");
	const homeLocation = buildLocation("/");
	const homeworkLocation = buildLocation("/homework");

	describe("when V3 tasks are disabled", () => {
		it("should keep the task overview in Nuxt", () => {
			mockedUseEnvConfig.mockReturnValue({ value: { FEATURE_TASKS_V3_ENABLED: false } } as ReturnType<
				typeof useEnvConfig
			>);

			const result = legacyCompatibilityGuard(buildLocation("/tasks"), homeLocation, vi.fn());

			expect(result).toBe(true);
			expect(window.location.assign).not.toHaveBeenCalled();
		});

		it("should forward task detail routes to the equivalent legacy route", () => {
			mockedUseEnvConfig.mockReturnValue({ value: { FEATURE_TASKS_V3_ENABLED: false } } as ReturnType<
				typeof useEnvConfig
			>);

			const result = legacyCompatibilityGuard(
				buildLocation(
					"/tasks/0000dcfbfb5c7a3f00bf21ba/edit",
					"/tasks/0000dcfbfb5c7a3f00bf21ba/edit?returnUrl=%2Ftasks#details"
				),
				homeLocation,
				vi.fn()
			);

			expect(result).toBe(false);
			expect(window.location.assign).toHaveBeenCalledWith(
				"/homework/0000dcfbfb5c7a3f00bf21ba/edit?returnUrl=%2Ftasks#details"
			);
		});

		it("should forward task creation to legacy with the tasks return URL", () => {
			mockedUseEnvConfig.mockReturnValue({ value: { FEATURE_TASKS_V3_ENABLED: false } } as ReturnType<
				typeof useEnvConfig
			>);

			legacyCompatibilityGuard(buildLocation("/tasks/new"), homeLocation, vi.fn());

			expect(window.location.assign).toHaveBeenCalledWith("/homework/new?returnUrl=tasks");
		});
	});

	describe("when the path belongs to the Vue client", () => {
		it("should allow navigation", () => {
			mockedIsLegacyClient.mockReturnValue(false);

			const result = legacyCompatibilityGuard(dashboardLocation, homeLocation, vi.fn());

			expect(result).toBe(true);
			expect(window.location.assign).not.toHaveBeenCalled();
		});
	});

	describe("when the path belongs to the legacy client", () => {
		it("should leave the Vue client", () => {
			mockedIsLegacyClient.mockReturnValue(true);
			vi.stubGlobal("location", { pathname: "/dashboard", assign: vi.fn() });

			const result = legacyCompatibilityGuard(homeworkLocation, dashboardLocation, vi.fn());

			expect(result).toBe(false);
			expect(window.location.assign).toHaveBeenCalledWith("/homework");
		});

		describe("when leaving the Vue client", () => {
			it("should forward query parameters", () => {
				mockedIsLegacyClient.mockReturnValue(true);
				vi.stubGlobal("location", { pathname: "/dashboard", assign: vi.fn() });

				legacyCompatibilityGuard(buildLocation("/homework", "/homework?tab=open"), dashboardLocation, vi.fn());

				expect(window.location.assign).toHaveBeenCalledWith("/homework?tab=open");
			});
		});

		describe("when the browser is already on the legacy path", () => {
			it("should not redirect", () => {
				mockedIsLegacyClient.mockReturnValue(true);
				vi.stubGlobal("location", { pathname: "/boards/1", assign: vi.fn() });

				const result = legacyCompatibilityGuard(buildLocation("/boards/1"), homeLocation, vi.fn());

				expect(result).toBe(true);
				expect(window.location.assign).not.toHaveBeenCalled();
			});
		});
	});
});
