import { z } from "zod";

export type BusinessError = {
	statusCode: string | number;
	message: string;
	error?: object | ApiValidationError;
};

export type ApiResponseError = {
	code: number;
	type: string;
	title: string;
	message: string;
};

export const ApiResponseErrorSchema = z.object({
	code: z.number(),
	type: z.string(),
	title: z.string(),
	message: z.string(),
});

export type ApiValidationError = {
	code: number;
	type: string;
	title: string;
	message: string;
	validationErrors: Array<ErrorDetails>;
};

export type ErrorDetails = {
	field: Array<string>;
	errors: Array<string>;
};

export type Status = "pending" | "completed" | "error" | "";

export type Pagination = {
	limit: number;
	skip: number;
	total: number;
};
