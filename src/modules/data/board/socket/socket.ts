import { useBoardStore } from "../Board.store";
import { useCardStore } from "../Card.store";
import { useConnectionErrorHandling } from "./socket-error-handler";
import { Action } from "@/types/board/ActionFactory";
import { notifyError, notifySuccess } from "@data-app";
import { useEnvConfig } from "@data-env";
import { logger } from "@util-logger";
import { useTimeoutFn } from "@vueuse/shared";
import { io, type Socket } from "socket.io-client";
import { ref } from "vue";
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
	// TODO: move dispatch-function from initial call to method in order to allow status checks without dispatch
	dispatchHandlers.push(dispatch);
	const boardStore = useBoardStore();
	const cardStore = useCardStore();
	const { t } = useI18n();

	const getConnectedSocket = () => {
		if (instance === null) {
			instance = io(useEnvConfig().value.BOARD_COLLABORATION_URI, {
				path: "/board-collaboration",
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
		if (!instance.connected) {
			instance.connect();
		}

		return instance;
	};

	const emitOnSocket = (action: string, data: unknown) => {
		const socket = getConnectedSocket();
		socket.emit(action, data);
	};

	const emitWithAck = (action: string, data: unknown) => {
		const socket = getConnectedSocket();
		return socket.timeout(30000).emitWithAck(action, data);
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
