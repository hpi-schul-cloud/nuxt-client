export type BusinessError = {
	statusCode: string;
	message: string;
	error?: object;
};

export type Status = "pending" | "completed" | "error" | "";

export type Pagination = {
	limit: number;
	skip: number;
	total: number;
};
