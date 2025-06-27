import { ApplicationError } from "@/store/types/application-error";

export function isApplicationError(error: unknown): error is ApplicationError {
	return (
		typeof error === "object" &&
		error !== null &&
		"statusCode" in error &&
		"translationKey" in error &&
		"message" in error
	);
}
