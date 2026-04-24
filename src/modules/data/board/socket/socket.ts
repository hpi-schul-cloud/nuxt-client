import { useBoardStore } from "../Board.store";
import { useCardStore } from "../Card.store";
import { useConnectionErrorHandling } from "./socket-error-handler";
import { Action } from "@/types/board/ActionFactory";
import { notifyError, notifySuccess } from "@data-app";
import { useEnvConfig } from "@data-env";
import { useSessionBroadcast } from "@util-broadcast-channel";
import { logger } from "@util-logger";
import { useTimeoutFn } from "@vueuse/shared";
import { io, type Socket } from "socket.io-client";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const dispatchHandlers: Array<(action: Action) => void> = [];
let isInitialConnection = true;
let instance: Socket | null = null;
let timeoutFn: ReturnType<typeof useTimeoutFn>;
const connected = ref(false);

export const resetSocketStateForTesting = () => {
	instance = null;
	dispatchHandlers.length = 0;
	isInitialConnection = true;
	connected.value = false;
};

export const useSocketConnection = (dispatch: (action: Action) => void) => {
	dispatchHandlers.push(dispatch);
	const boardStore = useBoardStore();
	const cardStore = useCardStore();
	const { t } = useI18n();

	const { isJwtExpired } = useSessionBroadcast();

	watch(isJwtExpired, (newValue) => {
		if (newValue) {
			logger.log("JWT expired - disconnecting socket");
			disconnectSocket();
		} else {
			logger.log("JWT valid - connecting socket");
			getConnectedSocket();
		}
	});

	const getConnectedSocket = () => {
		if (instance === null && isJwtExpired.value === false) {
			instance = io(useEnvConfig().value.BOARD_COLLABORATION_URI, {
				path: "/board-collaboration",
				reconnection: true,
				reconnectionAttempts: 10,
				withCredentials: true,
				closeOnBeforeunload: true,
			});

			instance.onAny((event, payload) => {
				dispatchHandlers.forEach((handler) => handler({ type: event, payload }));
			});

			instance.on("connect", async function () {
				connected.value = true;
				logger.log("connected");
				if (isInitialConnection) return;
				if (timeoutFn.isPending?.value) {
					timeoutFn.stop();
					return;
				}
				notifySuccess(t("common.notification.connection.restored"));
				if (!(boardStore.board && cardStore.cards)) return;
				await boardStore.reloadBoard();
				await cardStore.fetchCardRequest({
					cardIds: Object.keys(cardStore.cards),
				});
			});

			instance.on("disconnect", (reason, details) => {
				connected.value = false;
				logger.log("disconnected");
				logger.log(reason, details);
				isInitialConnection = false;
				timeoutFn = useTimeoutFn(() => {
					notifyError(t("error.4500"));
				}, 1000);
			});

			const { getState } = useConnectionErrorHandling(instance);
			logger.log("Connection state:", getState.value);
		}

		connected.value = instance?.connected ?? false;
		if (instance?.connected === false) {
			instance.connect();
		}

		return instance;
	};

	document.addEventListener("visibilitychange", async () => {
		if (document.visibilityState === "visible") {
			// tab got visible again, ensure socket is connected and up to date
			getConnectedSocket();
		}
	});

	const emitOnSocket = (action: string, data: unknown) => {
		const socket = getConnectedSocket();
		socket?.emit(action, data);
	};

	const emitWithAck = (action: string, data: unknown) => {
		const socket = getConnectedSocket();
		return socket?.timeout(30000).emitWithAck(action, data);
	};

	const disconnectSocket = () => {
		if (instance?.connected) {
			instance.disconnect();
		}
		instance = null;
		isInitialConnection = true;
		if (timeoutFn?.isPending.value) timeoutFn.stop();
	};

	return {
		getConnectedSocket,
		emitOnSocket,
		emitWithAck,
		disconnectSocket,
		connected,
	};
};
