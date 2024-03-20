export interface AlertMessage {
	title?: string;
	text: string;
}

export type AlertStatus = "success" | "error" | "warning" | "info";

export interface AlertPayload {
	text?: string;
	messages?: Array<AlertMessage>;
	status: AlertStatus;
	autoClose?: boolean;
	timeout?: number;
}
