import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { axiosErrorFactory } from "@@/tests/test-utils/factory/axiosErrorFactory";
import { isAxiosError } from "axios";
import { handleError } from "./handleError";

jest.mock("axios");
const mockedIsAxiosError = jest.mocked(isAxiosError);

describe(handleError.name, () => {
	describe("handleError", () => {
		describe("when response payload is an object", () => {
			const setup = () => {
				const expectedPayload = apiResponseErrorFactory.build({
					message: "NOT_FOUND",
					code: 404,
				});
				const responseError = axiosErrorFactory.build({
					response: { data: expectedPayload },
				});

				return {
					responseError,
					expectedPayload,
				};
			};

			it("should call the custom error handler for code 404", () => {
				mockedIsAxiosError.mockReturnValueOnce(true);
				const { responseError } = setup();

				const handle404Mock = jest.fn();

				handleError(responseError, { 404: handle404Mock });

				expect(handle404Mock).toHaveBeenCalledTimes(1);
			});
		});
	});
});
