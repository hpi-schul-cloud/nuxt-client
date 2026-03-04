import { useCountdownTimer } from "./countdownTimer.composable";
import { SessionState } from "./types";
import { logger } from "@util-logger";
import { useBroadcastChannel } from "@vueuse/core";
import { onUnmounted, Ref, watch } from "vue";

const BROADCAST_CHANNEL_NAME = "user-session-channel";
const BROADCAST_MESSAGE_LOGOUT = "logout";

export const useSessionBroadcast = (
	sessionState: Ref<SessionState | null>,
	setState: (state: SessionState) => Promise<void> | void,
	countdownTimer: ReturnType<typeof useCountdownTimer>
) => {
	const sessionBroadcast = useBroadcastChannel({ name: BROADCAST_CHANNEL_NAME });
	const { remainingTimeInSeconds, setTime } = countdownTimer;

	// share current state and timing
	const sendState = () => {
		sessionBroadcast.post(`${sessionState.value ?? ""}:${remainingTimeInSeconds.value ?? "0"}`);
	};

	// handle incoming broadcast messages to sync session state across tabs
	watch(sessionBroadcast.data, (message) => {
		logger.log("Received broadcast message:", message);
		if (message === BROADCAST_MESSAGE_LOGOUT) {
			setState(SessionState.Expired);
			globalThis.location.assign("/logout");
		}

		if (typeof message === "string" && message.includes(":")) {
			const [state, time] = message.split(":");
			const timeInSeconds = Number.parseInt(time, 10);
			if (!Number.isNaN(timeInSeconds)) {
				setTime(timeInSeconds);
			}
			if (Object.values(SessionState).includes(state as SessionState)) {
				setState(state as SessionState);
			}
		}
	});

	onUnmounted(() => {
		if (sessionBroadcast.isClosed.value === false) {
			sessionBroadcast.close();
		}
	});

	return {
		sendState,
	};
};
