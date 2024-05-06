import { io } from "socket.io-client";
import { Action } from "@/types/board/ActionFactory";

export const useBoardSocketApi = (dispatch: (action: Action) => void) => {
	// implement socket.io here
	const socket = io(
		// "https://bc-6683-poc-board-collaboration-server.dbc.dbildungscloud.dev",
		"ws://localhost:4450",
		{
			path: "/board-collaboration",
			withCredentials: true,
		}
		// { path: "/collaboration", transports: ["polling"] }
	);
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
