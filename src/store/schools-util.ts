import { AxiosError } from "axios";
import { ValidationError } from "@/serverApi/v3";

export const isGracePeriodError = (
	error: AxiosError<ValidationError>
): boolean => {
	console.log(error.response?.data.message.startsWith("grace_period_expired"));
	return !!error.response?.data.message.startsWith("grace_period_expired");
};
