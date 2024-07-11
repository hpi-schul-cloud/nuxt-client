import { io, type Socket } from "socket.io-client";
import { Action } from "@/types/board/ActionFactory";
import { envConfigModule } from "@/store";
import { useBoardStore } from "../Board.store";
import { useCardStore } from "../Card.store";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";

let instance: Socket | null = null;

const connectionOptions = {
	socketConnectionLost: false,
};

export const useSocketConnection = (dispatch: (action: Action) => void) => {
	const boardStore = useBoardStore();
	const cardStore = useCardStore();
	const { showFailure, showInfo } = useBoardNotifier();
	const { t } = useI18n();

	if (instance === null) {
		instance = io(envConfigModule.getEnv.BOARD_COLLABORATION_URI, {
			path: "/board-collaboration",
			withCredentials: true,
		});

		instance.on("connect", async function () {
			console.log("connected");
			if (connectionOptions.socketConnectionLost) {
				showInfo(t("common.notification.connection.restored"));
				connectionOptions.socketConnectionLost = false;

				if (!(boardStore.board && cardStore.cards)) return;

				await boardStore.reloadBoard();
				await cardStore.fetchCardRequest({
					cardIds: Object.keys(cardStore.cards),
				});
			}
		});

		instance.on("disconnect", () => {
			console.log("disconnected");
			connectionOptions.socketConnectionLost = true;
			showFailure(t("error.4500"));
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
		if (connectionOptions.socketConnectionLost)
			connectionOptions.socketConnectionLost = false;
	};

	return {
		emitOnSocket,
		emitWithAck,
		disconnectSocket,
	};
};
