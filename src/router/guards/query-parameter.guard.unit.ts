import { applicationErrorModule } from "@/store";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { NavigationGuardNext, Route } from "vue-router/types/router";
import { createQueryParameterGuard } from "@/router/guards/query-parameter.guard";
import { isMongoId } from "@/utils/validationUtil";
import Mock = jest.Mock;

jest.mock("@/store", () => ({
	applicationErrorModule: {
		setError: jest.fn(),
	},
}));

jest.mock("@/composables/application-error.composable", () => ({
	useApplicationError: () => ({
		createApplicationError: jest.fn(() => ({
			status: 400,
			message: "Bad Request",
		})),
	}),
}));

describe("createQueryParameterGuard", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	function setup() {
		const route: Route = {} as Route;
		const next: Mock<NavigationGuardNext> = jest.fn();
		return { to: route, from: route, next };
	}

	it("should call next() when all parameters are valid", () => {
		const { to, from, next } = setup();
		to.query = {
			sourceSystem: "60b5c5b33f50c52fd0fd9d5c",
			targetSystem: "60b5c5b33f50c52fd0fd9d5d",
		};
		const guard = createQueryParameterGuard({
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
		const guard = createQueryParameterGuard({
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
