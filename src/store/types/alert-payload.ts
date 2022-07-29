export interface AlertPayload {
	text: string;
	status: "success" | "error" | "warning" | "info";
	autoClose?: boolean;
	timeout?: number;
}
