import { useBoardNotifier } from "./BoardNotifications.composable";

describe("BoardNotifications.composable", () => {
	describe("@isErrorCode", () => {
		describe("when statusCode above 300", () => {
			it("should return true", () => {
				const { isErrorCode } = useBoardNotifier();
				const errorCodeStatus = isErrorCode(300);

				expect(errorCodeStatus).toBe(true);
			});
		});
		describe("when statusCode below 300", () => {
			it("should return true", () => {
				const { isErrorCode } = useBoardNotifier();
				const errorCodeStatus = isErrorCode(204);

				expect(errorCodeStatus).toBe(false);
			});
		});
	});
});
