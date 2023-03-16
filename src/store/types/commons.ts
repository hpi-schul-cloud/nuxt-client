export type BusinessError = {
	statusCode: string | number;
	message: string;
	error?: object | any; // TODO - adjust this properly
};

export type Status = "pending" | "completed" | "error" | "";

export type Pagination = {
	limit: number;
	skip: number;
	total: number;
};
