/**
 * Composable for cross-tab session communication using BroadcastChannel API.
 * Enables syncing session state, remaining time, and logout events across browser tabs.
 *
 * @param options.setState - Callback to update session state when received from another tab
 * @param options.setTime - Callback to update remaining time when received from another tab
 * @param options.onLogoutReceived - Custom handler for logout events (prevents default redirect)
 *
 * @returns onLogoutEvent - Register additional logout event handlers
 * @returns sendLogout - Broadcast logout message to other tabs
 * @returns sendStateAndTime - Broadcast current state and time to other tabs
 * @returns close - Close the broadcast channel
 *
 * @example Minimal usage (send-only, e.g. in application store):
 * ```ts
 * const { sendLogout, close } = useSessionBroadcast();
 * sendLogout(); // notify other tabs about logout
 * ```
 *
 * @example Full state sync (e.g. in auto-logout feature):
 * ```ts
 * const { sendStateAndTime } = useSessionBroadcast({
 *   setState: (state) => { sessionState.value = state; },
 *   setTime: (seconds) => { remainingTime.value = seconds; },
 * });
 * sendStateAndTime(SessionState.Extended, 7200);
 * ```
 *
 * @example Register logout event handler:
 * ```ts
 * const { onLogoutEvent } = useSessionBroadcast();
 * onLogoutEvent(() => {
 *   isJwtExpired.value = true;
 * });
 * ```
 */

import { SessionState } from "./types";
import { logger } from "@util-logger";
import { useBroadcastChannel } from "@vueuse/core";
import { onUnmounted, watch } from "vue";

const BROADCAST_CHANNEL_NAME = "user-session-channel";
const BROADCAST_MESSAGE_LOGOUT = "logout";

type LogoutHandler = () => void;

type SessionBroadcastOptions = {
	setState?: (state: SessionState) => Promise<void> | void;
	setTime?: (seconds: number) => void;
	onLogoutReceived?: () => void;
};

export const useSessionBroadcast = (options?: SessionBroadcastOptions) => {
	const sessionBroadcast = useBroadcastChannel({ name: BROADCAST_CHANNEL_NAME });
	const { setState, setTime, onLogoutReceived } = options ?? {};
	const logoutHandlers: LogoutHandler[] = [];

	// share current state and timing
	const sendStateAndTime = (state: SessionState | null, time: number | null) => {
		sessionBroadcast.post(`${state ?? ""}:${time ?? "0"}`);
	};

	const sendLogout = () => {
		sessionBroadcast.post(BROADCAST_MESSAGE_LOGOUT);
	};

	const close = () => {
		if (sessionBroadcast.isClosed.value === false) {
			sessionBroadcast.close();
		}
	};

	const onLogoutEvent = (handler: LogoutHandler) => {
		logoutHandlers.push(handler);
	};

	// handle incoming broadcast messages to sync session state across tabs
	watch(sessionBroadcast.data, (message) => {
		logger.log("Received broadcast message:", message);

		if (message === BROADCAST_MESSAGE_LOGOUT) {
			logoutHandlers.forEach((handler) => handler());

			if (onLogoutReceived) {
				onLogoutReceived();
			} else if (setState) {
				setState(SessionState.Expired);
				globalThis.location.assign("/logout");
			}
			return;
		}

		if (typeof message === "string" && message.includes(":")) {
			const [state, time] = message.split(":");
			const timeInSeconds = Number.parseInt(time, 10);
			if (!Number.isNaN(timeInSeconds) && setTime) {
				setTime(timeInSeconds);
			}
			if (setState && Object.values(SessionState).includes(state as SessionState)) {
				setState(state as SessionState);
			}
		}
	});

	onUnmounted(() => {
		close();
	});

	return {
		onLogoutEvent,
		sendLogout,
		sendStateAndTime,
		close,
	};
};
