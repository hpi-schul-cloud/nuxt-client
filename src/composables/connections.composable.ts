import { useBoardNotifier } from "@util-board";
let lossSocketConnection = false;
let lossInternetConnection = false;

export const useConnectionStatus = () => {
	const { showFailure, showInfo } = useBoardNotifier();

	const notifySocketConnectionLost = () => {
		lossSocketConnection = true;
		showFailure("Socket disconnected please try again later");
	};

	window.addEventListener("offline", () => {
		if (!lossInternetConnection) {
			showFailure("internet connection lost in composable");
			lossInternetConnection = true;
		}
	});

	window.addEventListener("online", () => {
		if (lossInternetConnection) {
			showInfo("internet connection back", false);
			lossInternetConnection = false;
		}
	});

	const notifyReconnectSocket = () => {
		if (lossSocketConnection) {
			showInfo("Socket reconnected");
			lossSocketConnection = false;
		}
	};

	return {
		notifySocketConnectionLost,
		notifyReconnectSocket,
	};
};
