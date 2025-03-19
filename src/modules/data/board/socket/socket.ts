import { io, type Socket } from "socket.io-client";
import { Action } from "@/types/board/ActionFactory";
import { envConfigModule } from "@/store";
import { useBoardStore, useCardStore } from "@data-board";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";
import { useTimeoutFn } from "@vueuse/shared";
import { ref } from "vue";
import { logger } from "@util-logger";

const isInitialConnection = ref(true);
let instance: Socket | null = null;
let timeoutFn: ReturnType<typeof useTimeoutFn>;

export const useSocketConnection = (
	dispatch: (action: Action) => void,
	options?: { isInitialConnection: boolean }
) => {
	const boardStore = useBoardStore();
	const cardStore = useCardStore();
	const { showFailure, showSuccess } = useBoardNotifier();
	const { t } = useI18n();

	isInitialConnection.value =
		options?.isInitialConnection !== undefined
			? options.isInitialConnection
			: true;

	if (instance === null) {
		instance = io(envConfigModule.getEnv.BOARD_COLLABORATION_URI, {
			path: "/board-collaboration",
			withCredentials: true,
		});

		instance.on("connect", async function () {
			logger.log("connected");
			if (isInitialConnection.value) return;
			if (timeoutFn.isPending?.value) {
				timeoutFn.stop();
				return;
			}
			showSuccess(t("common.notification.connection.restored"));

			if (!(boardStore.board && cardStore.cards)) return;
			await boardStore.reloadBoard();
			await cardStore.fetchCardRequest({
				cardIds: Object.keys(cardStore.cards),
			});
		});

		instance.on("disconnect", () => {
			logger.log("disconnected");
			isInitialConnection.value = false;
			timeoutFn = useTimeoutFn(() => {
				showFailure(t("error.4500"));
			}, 1000);
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
		isInitialConnection.value = true;
		if (timeoutFn.isPending.value) timeoutFn.stop();
	};

	return {
		emitOnSocket,
		emitWithAck,
		disconnectSocket,
	};
};
