import { io, type Socket } from "socket.io-client";
import { Action } from "@/types/board/ActionFactory";
import { envConfigModule } from "@/store";
import { useBoardStore, useCardStore } from "@data-board";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";
import { nextTick } from "vue";

let instance: Socket | null = null;

let shouldShowFailure = false;
let isInitialConnection = true;

export const useSocketConnection = (dispatch: (action: Action) => void) => {
	const boardStore = useBoardStore();
	const cardStore = useCardStore();
	const { showFailure, showSuccess } = useBoardNotifier();
	const { t } = useI18n();

	if (instance === null) {
		instance = io(envConfigModule.getEnv.BOARD_COLLABORATION_URI, {
			path: "/board-collaboration",
			withCredentials: true,
		});

		instance.on("connect", async function () {
			console.log("connected");
			if (isInitialConnection === false) {
				if (shouldShowFailure === false) {
					showSuccess(t("common.notification.connection.restored"));
				}

				if (!(boardStore.board && cardStore.cards)) return;

				await boardStore.reloadBoard();
				await cardStore.fetchCardRequest({
					cardIds: Object.keys(cardStore.cards),
				});
				await nextTick();
				shouldShowFailure = false;
			}
		});

		instance.on("disconnect", () => {
			console.log("disconnected");
			isInitialConnection = false;
			shouldShowFailure = true;
			setTimeout(() => {
				if (shouldShowFailure === true) {
					showFailure(t("error.4500"));
					shouldShowFailure = false;
				}
			}, 500);
		});
	}

	const socket = instance;

	socket.onAny((event, ...args) => {
		dispatch({ type: event, payload: args[0] });
	});

	const emitOnSocket = (action: string, data: unknown) => {
		if (!socket.connected) {
			socket.connect();
		}
		socket.emit(action, data);
	};

	const emitWithAck = (action: string, data: unknown) => {
		if (!socket.connected) {
			socket.connect();
		}
		return socket.timeout(30000).emitWithAck(action, data);
	};

	const disconnectSocket = () => {
		socket.disconnect();
		isInitialConnection = true;
	};

	return {
		emitOnSocket,
		emitWithAck,
		disconnectSocket,
	};
};
