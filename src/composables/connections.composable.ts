import { useBoardNotifier } from "@util-board";
let lossSocketConnection = false;
let lossInternetConnection = false;
let timeOutId: null | ReturnType<typeof setTimeout> = null;
let timeOut = false;

export const useConnectionStatus = () => {
	const { showFailure, showInfo } = useBoardNotifier();

	const notifySocketConnectionLost = () => {
		lossSocketConnection = true;
		showFailure("Socket disconnected please try again later");
	};

	const notifyReconnectSocket = () => {
		if (lossSocketConnection) {
			showInfo("Socket reconnected");
			lossSocketConnection = false;
		}
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

	document.addEventListener("visibilitychange", () => {
		if (document.hidden) {
			clearTimeout(timeOutId as ReturnType<typeof setTimeout>);

			timeOutId = setTimeout(() => {
				timeOut = true;
			}, 3000);
		} else {
			if (timeOut) {
				showInfo("You should refresh the page to get the latest data");
				timeOut = false;
				return;
			}

			clearTimeout(timeOutId as ReturnType<typeof setTimeout>);
		}
	});

	return {
		notifySocketConnectionLost,
		notifyReconnectSocket,
	};
};
