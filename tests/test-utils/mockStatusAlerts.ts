import { StatusAlert } from '@store/types/status-alert';

export const mockStatusAlerts : StatusAlert[] = [
	{
		title: "Important info",
		text: "Description of the alert",
		status: "info",
		origin: {
			page: "status",
			message_id: 1
		},
		timestamp: "2022-08-25 10:33:38",
		url :"https://status.test.cloud"
	},
	{
		title: "Problem resolved",
		text: "Description of the alert 2",
		status: "done",
		origin: {
			page: "status",
			message_id: 2
		},
		timestamp: "2022-08-25 10:33:38",
		url :"https://status.test.cloud"
	},
	{
		title: "Critical problem in progress info2",
		text: "Description of the alert 3",
		status: "danger",
		origin: {
			page: "status",
			message_id: 3
		},
		timestamp: "2022-08-25 10:33:38",
		url :"https://status.test.cloud"
	}
];
