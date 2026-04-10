import { validateQueryParameters } from "@/router/guards/validate-query-parameters.guard";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { isMongoId } from "@/utils/validation";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

describe("validateQueryParameters", () => {
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

	it("should call next() when all parameters are valid", () => {
		const { to, from, next } = setup();
		to.query = {
			sourceSystem: "60b5c5b33f50c52fd0fd9d5c",
			targetSystem: "60b5c5b33f50c52fd0fd9d5d",
		};
		const guard = validateQueryParameters({
			sourceSystem: isMongoId,
			targetSystem: isMongoId,
		});

		guard(to, from, next);

		expect(useAppStore().handleApplicationError).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalled();
	});

	it("should call setError and not call next() when a parameter is invalid", () => {
		const { to, from, next } = setup();
		to.query = {
			sourceSystem: "invalid",
			targetSystem: "60b5c5b33f50c52fd0fd9d5d",
		};
		const guard = validateQueryParameters({
			sourceSystem: isMongoId,
			targetSystem: isMongoId,
		});

		guard(to, from, next);

		expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.BadRequest);
		expect(next).not.toHaveBeenCalled();
	});
});
