import { SessionStatus } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { AlertStatus, useAppStore, useNotificationStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const JWT_TIMER_ENDPOINT = "/v1/accounts/jwtTimer";
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT_SECONDS = 2 * 60 * 60;
const DEFAULT_WARNING_SECONDS = 1 * 60 * 60;

export const useAutoLogout = () => {
	const { t } = useI18n();
	const { execute } = useSafeAxiosTask();

	const showDialog = ref(false);
	const errorOnExtend = ref(false);
	const sessionStatus = ref<SessionStatus | null>(null);
	const remainingTimeInSeconds = ref(0);

	const { JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS } = useEnvConfig().value;
	const SESSION_TIMEOUT = JWT_TIMEOUT_SECONDS || DEFAULT_TIMEOUT_SECONDS;
	const WARNING_THRESHOLD = JWT_SHOW_TIMEOUT_WARNING_SECONDS || DEFAULT_WARNING_SECONDS;

	const remainingTimeInMinutes = computed(() => Math.max(Math.ceil(remainingTimeInSeconds.value / 60), 0));

	// --- Session Management ---

	const createSession = () => {
		stopInterval();

		remainingTimeInSeconds.value = SESSION_TIMEOUT;
		showDialog.value = false;
		sessionStatus.value = SessionStatus.Started;
		errorOnExtend.value = false;

		startInterval();
	};

	const extendSession = async () => {
		stopInterval();

		if (sessionStatus.value === SessionStatus.Expired) {
			return;
		}

		try {
			await $axios.post(JWT_TIMER_ENDPOINT);
			await updateRemainingTime();
			goExtendedState();
		} catch {
			goErrorState();
		}
	};

	// --- Interval Management ---

	let remainingTimeInterval: ReturnType<typeof setInterval> | null = null;

	const startInterval = () => {
		remainingTimeInterval = setInterval(() => {
			remainingTimeInSeconds.value -= 1;
			handleTimerTick();
		}, 1000);
	};

	const stopInterval = () => {
		if (remainingTimeInterval) {
			clearInterval(remainingTimeInterval);
			remainingTimeInterval = null;
		}
	};

	// --- State Handling ---

	const handleTimerTick = async () => {
		if (remainingTimeInSeconds.value <= 0) {
			sessionStatus.value = SessionStatus.Expired;
		} else if (remainingTimeInSeconds.value <= WARNING_THRESHOLD) {
			sessionStatus.value = SessionStatus.AboutToExpire;
		}
	};

	const goStartedState = () => {
		sessionStatus.value = SessionStatus.Started;
		showDialog.value = false;
		errorOnExtend.value = false;
	};

	const goWarningState = async () => {
		showDialog.value = true;
		await updateRemainingTime();
	};

	const goExtendedState = () => {
		sessionStatus.value = SessionStatus.Extended;
		showDialog.value = false;
		errorOnExtend.value = false;
		notify("success", t("feature-autoLogout.message.extending-session-success"));
	};

	const goExpiredState = () => {
		showDialog.value = true;
		useAppStore().logout();
		notify("error", t("feature-autoLogout.message.error.401"), false);
		stopInterval();
	};

	const goErrorState = () => {
		sessionStatus.value = SessionStatus.Error;
		errorOnExtend.value = true;
		notify("error", t("feature-autoLogout.message.extending-session-failure"));
	};

	const map: Record<SessionStatus, () => void | Promise<void>> = {
		[SessionStatus.Started]: goStartedState,
		[SessionStatus.AboutToExpire]: goWarningState,
		[SessionStatus.Extended]: goExtendedState,
		[SessionStatus.Expired]: goExpiredState,
		[SessionStatus.Error]: goErrorState,
	};

	watch(sessionStatus, async (newStatus, oldStatus) => {
		if (newStatus !== oldStatus && newStatus !== null) {
			await map[newStatus]();
		}
	});

	const updateRemainingTime = async (retryCount = 0): Promise<void> => {
		const { result, error } = await execute(() => $axios.get(JWT_TIMER_ENDPOINT));

		if (error) {
			if (retryCount < MAX_RETRIES) {
				const delayMs = 2 ** retryCount * 1000;
				await new Promise((resolve) => setTimeout(resolve, delayMs));
				return updateRemainingTime(retryCount + 1);
			}
			sessionStatus.value = SessionStatus.Error;
			return;
		}

		if (result.data.ttl === undefined) {
			// No TTL was transmitted
			return;
		}

		remainingTimeInSeconds.value = result.data.ttl;
	};

	// --- Helpers ---

	const notify = (status: AlertStatus, text: string, autoClose = true) => {
		useNotificationStore().notify({
			text,
			status,
			autoClose,
		});
	};

	return {
		errorOnExtend,
		remainingTimeInMinutes,
		remainingTimeInSeconds,
		sessionStatus,
		showDialog,
		createSession,
		extendSession,
	};
};
