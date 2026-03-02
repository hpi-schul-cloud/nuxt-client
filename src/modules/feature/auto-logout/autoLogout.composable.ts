import { SessionStatus } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { AlertPayload, useAppStore, useNotificationStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { computed, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export const useAutoLogout = () => {
	const { t } = useI18n();
	const { execute } = useSafeAxiosTask();
	const showDialog = ref(false);
	const errorOnExtend = ref(false);
	const sessionStatus: Ref<SessionStatus | null> = ref(null);

	let remainingTimeInterval: ReturnType<typeof setInterval> | null = null;

	const { JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS } = useEnvConfig().value;

	const defaultRemainingTime = JWT_TIMEOUT_SECONDS || 2 * 60 * 60;
	const DEFAULT_SHOW_WARNING_TIME = JWT_SHOW_TIMEOUT_WARNING_SECONDS || 1 * 60 * 60;

	const remainingTimeInSeconds = ref(defaultRemainingTime);

	const remainingTimeInMinutes = computed(() => Math.max(Math.floor(remainingTimeInSeconds.value / 60), 0));

	const stopInterval = () => {
		if (remainingTimeInterval) {
			clearInterval(remainingTimeInterval);
			remainingTimeInterval = null;
		}
	};

	const updateRemainingTime = async (maxRetries = 3, retryCount = 0) => {
		const { result, error } = await execute(() => $axios.get("/v1/accounts/jwtTimer"));
		if (error) {
			if (retryCount < maxRetries) {
				await new Promise((resolve) => setTimeout(resolve, 2 ** retryCount * 1000));
				return updateRemainingTime(maxRetries, retryCount + 1);
			} else {
				sessionStatus.value = SessionStatus.Error;
				return;
			}
		}
		if (result.data.ttl === undefined) {
			useNotificationStore().notify({ text: "no ttl was transmited", status: "error" });
		}
		remainingTimeInSeconds.value = result?.data?.ttl;
	};

	const handleState = async () => {
		await handleExpiration();
		await handleWarning();
		await handleDefault();
	};

	const handleExpiration = async () => {
		if (remainingTimeInSeconds.value <= 0) {
			showDialog.value = true;
			sessionStatus.value = SessionStatus.Ended;
			stopInterval();
		}
	};

	const handleWarning = async () => {
		if (remainingTimeInSeconds.value > 0 && remainingTimeInSeconds.value <= DEFAULT_SHOW_WARNING_TIME) {
			showDialog.value = true;
			sessionStatus.value = SessionStatus.Continued;
			await updateRemainingTime();
		}
	};

	const handleDefault = async () => {
		if (remainingTimeInSeconds.value > DEFAULT_SHOW_WARNING_TIME) {
			showDialog.value = false;
		}
	};

	const createSession = () => {
		stopInterval();

		remainingTimeInSeconds.value = defaultRemainingTime;
		if (showDialog.value) showDialog.value = false;
		sessionStatus.value = null;
		errorOnExtend.value = false;

		remainingTimeInterval = setInterval(async () => {
			remainingTimeInSeconds.value -= 1;
			handleState();
		}, 1000);
	};

	const extendSession = async () => {
		stopInterval();

		if (sessionStatus.value === SessionStatus.Ended) {
			useAppStore().logout();
			return;
		}

		try {
			await $axios.post("/v1/accounts/jwtTimer");
			await updateRemainingTime();
			showDialog.value = false;
			errorOnExtend.value = false;

			createSession();
			sessionStatus.value = SessionStatus.Continued;
		} catch {
			errorOnExtend.value = true;
			sessionStatus.value = SessionStatus.Error;
		}
	};

	const notificationMap: Record<SessionStatus, AlertPayload> = {
		[SessionStatus.Continued]: {
			text: t("feature-autoLogout.message.success"),
			status: "success",
		},
		[SessionStatus.Error]: {
			text: t("feature-autoLogout.message.error"),
			status: "error",
		},
		[SessionStatus.Ended]: {
			text: t("feature-autoLogout.message.error.401"),
			status: "error",
			autoClose: false,
		},
	};

	watch(
		() => sessionStatus.value,
		(newValue) => {
			if (newValue === null) return;
			useNotificationStore().notify(notificationMap[newValue]);
		}
	);

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
