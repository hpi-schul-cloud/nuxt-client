import { applicationErrorModule } from "@/store";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { validateQueryParameters } from "@/router/guards/validate-query-parameters.guard";
import { isMongoId } from "@/utils/validation";

vi.mock("@/store", () => ({
	applicationErrorModule: {
		setError: vi.fn(),
	},
}));

vi.mock("@/composables/application-error.composable", () => ({
	useApplicationError: () => ({
		createApplicationError: vi.fn(() => ({
			status: 400,
			message: "Bad Request",
		})),
	}),
}));

describe("validateQueryParameters", () => {
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

		expect(applicationErrorModule.setError).not.toHaveBeenCalled();
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

		expect(applicationErrorModule.setError).toHaveBeenCalledWith({
			status: HttpStatusCode.BadRequest,
			message: "Bad Request",
		});
		expect(next).not.toHaveBeenCalled();
	});
});
