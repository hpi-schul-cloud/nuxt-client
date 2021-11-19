export type BusinessError = {
	statusCode: string;
	message: string;
};

export type Status = "pending" | "completed" | "error" | "";
