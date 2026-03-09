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
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { tryOnScopeDispose } from "@vueuse/core";
import axios, { isAxiosError } from "axios";
import { readonly, ref } from "vue";

const JWT_TIMER_ENDPOINT = "/v1/accounts/jwtTimer";

// these constants are also used inside of the schulcloud-client to communicate logouts between both application parts
const BROADCAST_CHANNEL_NAME = "user-session-channel";
const BROADCAST_MESSAGE_LOGOUT = "logout";

const isJwtExpired = ref(false);

const setJwtExpired = (value = true) => {
	isJwtExpired.value = value;
};

type LogoutHandler = () => void;

type SessionBroadcastOptions = {
	setState?: (state: SessionState) => Promise<void> | void;
	setTime?: (seconds: number) => void;
	onLogoutReceived?: () => void;
};

export const useSessionBroadcast = (options?: SessionBroadcastOptions) => {
	const { setState, setTime, onLogoutReceived } = options ?? {};
	const logoutHandlers: LogoutHandler[] = [];

	let broadcastChannel: BroadcastChannel | null = null;

	const getBroadcastChannel = () => {
		if (!broadcastChannel && typeof BroadcastChannel !== "undefined") {
			broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);

			// handle incoming broadcast messages to sync session state across tabs
			broadcastChannel.addEventListener("message", (event) => {
				const message = event.data;

				if (message === BROADCAST_MESSAGE_LOGOUT) {
					setJwtExpired(true);
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
		}
		return broadcastChannel;
	};

	// share current state and timing
	const sendStateAndTime = (state: SessionState | null, time: number | null) => {
		const channel = getBroadcastChannel();
		if (channel) {
			channel.postMessage(`${state ?? ""}:${time ?? "0"}`);
		}
	};

	const sendLogout = () => {
		const channel = getBroadcastChannel();
		if (channel) {
			channel.postMessage(BROADCAST_MESSAGE_LOGOUT);
		}
	};

	const onLogoutEvent = (handler: LogoutHandler) => {
		logoutHandlers.push(handler);
	};

	const close = () => {
		if (broadcastChannel) {
			broadcastChannel.close();
			broadcastChannel = null;
		}
	};

	const handleUnauthorizedError = async (error: unknown) => {
		if (isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized) {
			try {
				const pristineAxios = axios.create();
				pristineAxios.defaults.baseURL = axios.defaults.baseURL;
				const response = await pristineAxios.get(JWT_TIMER_ENDPOINT);
				const ttl = response?.data?.ttl ?? 0;
				if (ttl <= 0) {
					setJwtExpired();
				}
			} catch {
				setJwtExpired();
			}
		}
	};

	tryOnScopeDispose(() => {
		close();
	});

	return {
		isJwtExpired: readonly(isJwtExpired),
		setJwtExpired,
		onLogoutEvent,
		sendLogout,
		sendStateAndTime,
		close,
		handleUnauthorizedError,
	};
};
