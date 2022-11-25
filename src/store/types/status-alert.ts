export type StatusAlert = {
	title: string,
	text: string,
	status: "info" | "done" | "danger",
	origin: {
		page: string,
		message_id: number,
	},
	timestamp: string,
	url: string,
}