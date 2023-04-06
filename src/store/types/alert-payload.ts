export interface AlertMessage {
	title?: string;
	text: string;
}

export interface AlertPayload {
	text?: string;
	messages?: Array<AlertMessage>;
	status: "success" | "error" | "warning" | "info";
	autoClose?: boolean;
	timeout?: number;
}
