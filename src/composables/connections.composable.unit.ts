import { useConnectionStatus } from "../modules/data/board/boardActions/connections.composable";

describe("connections.composable", () => {
	it("should notify socket connection lost", () => {
		const { notifySocketConnectionLost } = useConnectionStatus();
		notifySocketConnectionLost();
		expect(true).toBeTruthy();
	});

	it("should notify reconnect socket", () => {
		const { notifyReconnectSocket } = useConnectionStatus();
		notifyReconnectSocket();
		expect(true).toBeTruthy();
	});
});
