export type BusinessError = {
	statusCode: string;
	message: string;
};

export type Status = "pending" | "completed" | "error" | "";

export type Pagination = {
	limit: number;
	skip: number;
	total: number;
};
