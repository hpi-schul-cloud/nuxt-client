import { validateQueryParameters } from "@/router/guards/validate-query-parameters.guard";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { isMongoId } from "@/utils/validation";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { RouteLocationNormalized } from "vue-router";

describe("validateQueryParameters", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	function setup() {
		const route: RouteLocationNormalized = {} as RouteLocationNormalized;
		return { to: route, from: route };
	}

	it("should return true when all parameters are valid", () => {
		const { to, from } = setup();
		to.query = {
			sourceSystem: "60b5c5b33f50c52fd0fd9d5c",
			targetSystem: "60b5c5b33f50c52fd0fd9d5d",
		};
		const guard = validateQueryParameters({
			sourceSystem: isMongoId,
			targetSystem: isMongoId,
		});

		const result = guard(to, from, vi.fn);

		expect(useAppStore().handleApplicationError).not.toHaveBeenCalled();
		expect(result).toBe(true);
	});

	it("should call handleApplicationError and return false when a parameter is invalid", () => {
		const { to, from } = setup();
		to.query = {
			sourceSystem: "invalid",
			targetSystem: "60b5c5b33f50c52fd0fd9d5d",
		};
		const guard = validateQueryParameters({
			sourceSystem: isMongoId,
			targetSystem: isMongoId,
		});

		const result = guard(to, from, vi.fn);

		expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.BadRequest);
		expect(result).toBe(false);
	});
});
