export interface AlertPayload {
	text: string;
	status: "success" | "danger" | "warning" | "info";
	/**
	 * Timeout in ms before the Alert is closed.
	 *
	 * Use 0 to not close the Alert automatically.
	 */
	timeout?: number;
}
