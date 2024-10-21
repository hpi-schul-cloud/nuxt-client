import { useApplicationError } from "@/composables/application-error.composable";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { HttpStatusCode } from "../store/types/http-status-code.enum";

vi.mock("./loadingState");

describe("application-error composable", () => {
	const setup = () => {
		return mountComposable(() => useApplicationError(), {});
	};

	it("should return createApplicationError", async () => {
		const { createApplicationError } = setup();

		expect(createApplicationError).toBeTruthy();
		expect(typeof createApplicationError).toBe("function");
	});

	it("createApplicationError should create an ApplicationError", async () => {
		const { createApplicationError } = setup();
		const result = createApplicationError(HttpStatusCode.InternalServerError);
		expect(result).toBeInstanceOf(Error);
		expect(result.name).toBe("ApplicationError");
	});
});
