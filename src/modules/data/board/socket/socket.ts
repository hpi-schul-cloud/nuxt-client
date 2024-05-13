import { io } from "socket.io-client";
import { Action } from "@/types/board/ActionFactory";
import { envConfigModule } from "@/store";

export const useBoardSocketApi = (dispatch: (action: Action) => void) => {
	const socket = io(envConfigModule.getEnv.BOARD_COLLABORATION_URI, {
		path: "/board-collaboration",
		withCredentials: true,
	});

	socket.on("connect", function () {
		console.log("connected");
	});

	socket.onAny((event, ...args) => {
		dispatch({ type: event, payload: args[0] });
	});

	socket.on("disconnect", () => {
		// TODO reconnect?
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
