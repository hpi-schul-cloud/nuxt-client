import { io, Socket } from "socket.io-client";
import { Action } from "@/types/board/ActionFactory";
import { envConfigModule } from "@/store";
import { useConnectionStatus } from "../boardActions/connections.composable";

let instance: Socket | null = null;

export const useSocketConnection = (dispatch: (action: Action) => void) => {
	const { notifySocketConnectionLost, reloadBoardAndNotify } =
		useConnectionStatus();

	if (instance === null) {
		instance = io(envConfigModule.getEnv.BOARD_COLLABORATION_URI, {
			path: "/board-collaboration",
			withCredentials: true,
		});

		instance.on("connect", function () {
			console.log("connected");
			reloadBoardAndNotify();
		});

		instance.on("disconnect", () => {
			notifySocketConnectionLost();
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
	};

	return {
		emitOnSocket,
		emitWithAck,
		disconnectSocket,
	};
};
