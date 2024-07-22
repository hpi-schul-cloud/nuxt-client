export type AlertStatus = "success" | "error" | "warning" | "info";

export interface AlertPayload {
	text?: string;
	status: AlertStatus;
	autoClose?: boolean;
	timeout?: number;
}
